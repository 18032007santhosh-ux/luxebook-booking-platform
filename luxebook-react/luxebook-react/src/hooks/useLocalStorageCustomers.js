import { useState, useEffect, useMemo } from 'react';
import { MOCK_CUSTOMERS } from '../data/mockCustomers';
import { supabase } from '../services/supabaseClient';
import { formatTime24to12, formatYMDToHumanDate } from '../services/bookingService';

/**
 * Custom hook to read and aggregate live booking data from Supabase.
 * Falls back to MOCK_CUSTOMERS if no live data is found.
 */
export function useLocalStorageCustomers() {
  const [liveCustomers, setLiveCustomers] = useState([]);
  const [isLiveData, setIsLiveData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Fetch active memberships
        const { data: activeMemberships, error: memErr } = await supabase
          .from('memberships')
          .select('*, membership_tiers(name)')
          .eq('status', 'active');

        if (memErr) throw memErr;

        const membershipMap = new Map();
        (activeMemberships || []).forEach(m => {
          if (m.user_id && m.membership_tiers) {
            membershipMap.set(m.user_id, m.membership_tiers.name);
          }
        });

        // 2. Fetch all bookings
        const { data: bookings, error: bookingsErr } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (bookingsErr) throw bookingsErr;

        if (!bookings || bookings.length === 0) {
          setLiveCustomers([]);
          setIsLiveData(false);
          return;
        }

        // 3. Group by customerEmail
        const customersMap = new Map();
        bookings.forEach(b => {
          const email = b.guest_email;
          if (!email) return;

          if (!customersMap.has(email)) {
            customersMap.set(email, {
              id: b.user_id || `usr_${Math.random().toString(36).substr(2, 9)}`,
              customerName: b.guest_name || "Unknown Guest",
              customerEmail: email,
              customerPhone: b.guest_phone || "—",
              membershipTier: (b.user_id && membershipMap.get(b.user_id)) || "Standard",
              joinedDate: b.created_at || new Date().toISOString(),
              avatarInitials: getInitials(b.guest_name || "Unknown Guest"),
              avatarColor: getAvatarColor(email),
              bookings: []
            });
          }

          const customer = customersMap.get(email);

          // Normalize booking shape
          customer.bookings.push({
            bookingId: b.booking_ref || `LB-${Math.floor(Math.random() * 90000) + 10000}`,
            serviceName: b.service_name || "Wellness Experience",
            therapist: "LuxeBook Specialist",
            date: formatYMDToHumanDate(b.booking_date),
            time: formatTime24to12(b.booking_time),
            duration: b.service_duration || "—",
            price: Number(b.base_price) || 0,
            status: (b.status || "confirmed").toLowerCase(),
            paymentStatus: "paid",
            transactionId: b.booking_ref || "—",
            createdAt: b.created_at || new Date().toISOString(),
            specialNotes: b.cancellation_reason || ""
          });
        });

        // 4. Sort bookings descending and set joinedDate
        const customersArray = Array.from(customersMap.values()).map(customer => {
          customer.bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          if (customer.bookings.length > 0) {
            const earliest = customer.bookings[customer.bookings.length - 1];
            customer.joinedDate = earliest.createdAt;
          }
          return customer;
        });

        // 5. Sort customers by most recent booking
        customersArray.sort((a, b) => {
          const aLatest = a.bookings.length > 0 ? new Date(a.bookings[0].createdAt).getTime() : 0;
          const bLatest = b.bookings.length > 0 ? new Date(b.bookings[0].createdAt).getTime() : 0;
          return bLatest - aLatest;
        });

        setLiveCustomers(customersArray);
        setIsLiveData(true);
      } catch (err) {
        console.error("Error reading Supabase customers:", err);
        setIsLiveData(false);
      }
    }

    fetchData();
  }, []);

  const customers = isLiveData && liveCustomers.length > 0 ? liveCustomers : MOCK_CUSTOMERS;

  // Compute stats on the fly
  const getCustomerStats = (customer) => {
    const totalBookings = customer.bookings.length;
    const totalSpent = customer.bookings
      .filter((b) => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + b.price, 0);
    const activeBookings = customer.bookings.filter((b) =>
      ["confirmed", "pending", "upcoming"].includes(b.status)
    ).length;
    const lastStatus = customer.bookings.length > 0 ? customer.bookings[0].status : "unknown";

    return { totalBookings, totalSpent, activeBookings, lastStatus };
  };

  const globalStats = useMemo(() => {
    let totalCustomers = customers.length;
    let totalActiveBookings = 0;
    let totalRevenue = 0;
    let totalPaidBookings = 0;

    customers.forEach((c) => {
      const stats = getCustomerStats(c);
      totalActiveBookings += stats.activeBookings;
      totalRevenue += stats.totalSpent;
      totalPaidBookings += c.bookings.filter((b) => b.paymentStatus === "paid").length;
    });

    const avgBookingValue = totalPaidBookings > 0 ? Math.round(totalRevenue / totalPaidBookings) : 0;

    return {
      totalCustomers,
      totalActiveBookings,
      totalRevenue,
      avgBookingValue,
    };
  }, [customers]);

  return {
    customers,
    isLiveData,
    globalStats,
    getCustomerStats
  };
}

// Helpers for deterministic avatars
function getInitials(name) {
  if (!name) return "?";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function getAvatarColor(email) {
  const colors = [
    "bg-indigo-100 text-indigo-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-teal-100 text-teal-700"
  ];
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}
