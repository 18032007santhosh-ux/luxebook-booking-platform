import { supabase } from './supabaseClient';

// Helper to format 24h TIME (e.g. 13:00:00) to 12h format (e.g. 01:00 PM)
export function formatTime24to12(timeStr) {
  if (!timeStr) return '';
  const [hourStr, minStr] = timeStr.split(':');
  const hour = parseInt(hourStr);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  // keep 12:00 PM / AM format clean
  return `${hour12.toString().padStart(2, '0')}:${minStr} ${ampm}`;
}

// Helper to convert 12h format (e.g. 01:00 PM) to 24h format (e.g. 13:00:00)
export function formatTime12to24(time12) {
  if (!time12) return '12:00:00';
  const parts = time12.split(' ');
  const timePart = parts[0];
  const ampm = parts[1] || 'AM';
  let [hourStr, minStr] = timePart.split(':');
  let hour = parseInt(hourStr);
  if (ampm === 'PM' && hour < 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return `${hour.toString().padStart(2, '0')}:${minStr || '00'}:00`;
}

// Helper to parse "Friday, October 04, 2024" or any date to YYYY-MM-DD
export function parseHumanDateToYMD(dateStr) {
  try {
    if (!dateStr) return new Date().toISOString().split('T')[0];
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
    const parts = dateStr.split(', ');
    if (parts.length >= 2) {
      const parsed = new Date(parts.slice(1).join(', '));
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split('T')[0];
      }
    }
    return new Date().toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

// Helper to format YYYY-MM-DD date to "Friday, October 04, 2024"
export function formatYMDToHumanDate(ymdStr) {
  if (!ymdStr) return '';
  // Add time to avoid timezone offset shifts during Date creation
  const d = new Date(`${ymdStr}T12:00:00`);
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export const bookingService = {
  /**
   * Fetches bookings from Supabase.
   * @param {string} userId - ID of the logged in customer.
   * @param {boolean} isAdmin - If true, fetches all bookings.
   */
  getBookings: async (userId, isAdmin) => {
    let query = supabase.from('bookings').select('*');
    
    if (!isAdmin && userId) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error("Failed to fetch bookings:", error);
      throw new Error(error.message);
    }

    return (data || []).map(b => ({
      id: b.id,
      bookingId: b.booking_ref,
      serviceName: b.service_name,
      price: Number(b.base_price),
      date: formatYMDToHumanDate(b.booking_date),
      time: formatTime24to12(b.booking_time),
      customerName: b.guest_name,
      customerEmail: b.guest_email,
      customerPhone: b.guest_phone || '—',
      status: b.status,
      paymentStatus: 'paid', // Default mapping
      transactionId: b.booking_ref, // Placeholder mapping to match receipt layout
      createdAt: b.created_at,
      specialNotes: b.cancellation_reason || ''
    }));
  },

  /**
   * Creates a booking in Supabase.
   */
  createBooking: async (booking) => {
    // 1. Resolve UUID of the service using its legacy_id integer
    const legacyServiceId = Number(booking.serviceId || booking.id);
    const { data: services, error: serviceErr } = await supabase
      .from('services')
      .select('id, title, price, duration')
      .eq('legacy_id', legacyServiceId);

    if (serviceErr || !services || services.length === 0) {
      throw new Error("Unable to resolve service from catalog.");
    }
    
    const service = services[0];
    const user = JSON.parse(localStorage.getItem("luxebook_session_user") || "null");

    const bookingRef = `LB-${Math.floor(Math.random() * 90000) + 10000}`;
    const formattedDate = parseHumanDateToYMD(booking.date);
    const formattedTime = formatTime12to24(booking.time);

    const insertData = {
      booking_ref: bookingRef,
      user_id: user?.id || null,
      service_id: service.id,
      service_name: service.title,
      service_duration: service.duration,
      base_price: Number(service.price),
      tax_amount: Number((service.price * 0.08).toFixed(2)),
      booking_date: formattedDate,
      booking_time: formattedTime,
      guest_name: booking.customerName || user?.name || "Guest User",
      guest_email: booking.customerEmail || user?.email || "guest@luxebook.com",
      guest_phone: booking.customerPhone || null,
      status: 'confirmed',
      terms_agreed: true
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Failed to create booking in Supabase:", error);
      throw new Error(error.message);
    }

    return {
      id: data.id,
      bookingId: data.booking_ref,
      serviceName: data.service_name,
      price: Number(data.base_price),
      date: formatYMDToHumanDate(data.booking_date),
      time: formatTime24to12(data.booking_time),
      customerName: data.guest_name,
      customerEmail: data.guest_email,
      customerPhone: data.guest_phone || '—',
      status: data.status,
      paymentStatus: 'paid',
      transactionId: data.booking_ref,
      createdAt: data.created_at
    };
  },

  /**
   * Cancels a booking in Supabase.
   */
  cancelBooking: async (bookingId) => {
    // Determine if bookingId is UUID (database id) or booking_ref (LB-XXXXX)
    const column = bookingId.startsWith('LB-') ? 'booking_ref' : 'id';
    
    const { data, error } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString()
      })
      .eq(column, bookingId)
      .select()
      .single();

    if (error) {
      console.error("Failed to cancel booking:", error);
      throw new Error(error.message);
    }
    return data;
  },

  /**
   * Fetches reviews for a user, mapping database booking UUID to the human-readable booking_ref.
   */
  getReviews: async (userId) => {
    if (!userId) return [];
    const { data, error } = await supabase
      .from('reviews')
      .select('*, bookings(booking_ref, id)')
      .eq('user_id', userId);

    if (error) {
      console.error("Failed to fetch reviews:", error);
      throw error;
    }

    return (data || []).map(r => ({
      bookingId: r.bookings?.booking_ref || r.booking_id,
      rating: r.rating,
      comment: r.comment
    }));
  },

  /**
   * Submits or updates a review in Supabase.
   */
  submitReview: async (bookingRefOrId, userId, rating, comment) => {
    const column = bookingRefOrId.startsWith('LB-') ? 'booking_ref' : 'id';
    const { data: booking, error: bErr } = await supabase
      .from('bookings')
      .select('id')
      .eq(column, bookingRefOrId)
      .maybeSingle();

    if (bErr || !booking) {
      throw new Error("Unable to locate booking record to review.");
    }

    const { data, error } = await supabase
      .from('reviews')
      .upsert({
        booking_id: booking.id,
        user_id: userId,
        rating: Number(rating),
        comment: comment,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'booking_id,user_id'
      })
      .select();

    if (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
    return data;
  }
};
