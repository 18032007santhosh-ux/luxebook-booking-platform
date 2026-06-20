import { useState, useEffect, useMemo } from 'react';
import { MOCK_CUSTOMERS } from '../data/mockCustomers';

/**
 * Custom hook to read and aggregate live booking data from localStorage.
 * Falls back to MOCK_CUSTOMERS if no live data is found.
 */
export function useLocalStorageCustomers() {
  const [liveCustomers, setLiveCustomers] = useState([]);
  const [isLiveData, setIsLiveData] = useState(false);

  useEffect(() => {
    try {
      // 1. Scan localStorage for all reservation and membership keys
      const reservationKeys = [];
      const membershipMap = new Map(); // key: userId -> membershipTier

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("luxebook_reservations")) {
          reservationKeys.push(key);
        } else if (key.startsWith("luxebook_active_membership")) {
          try {
            const membership = JSON.parse(localStorage.getItem(key));
            if (membership && membership.name) {
              // Extract user ID from the key, e.g., luxebook_active_membership_usr_123
              const parts = key.split('_');
              // Could be "usr" followed by ID. Let's just store by the whole suffix
              const suffix = key.replace("luxebook_active_membership", ""); // might be "_usr_123"
              membershipMap.set(suffix, membership.name); // Using membership.name as tier (e.g. "Platinum")
            }
          } catch (e) {
            console.error("Failed to parse membership", e);
          }
        }
      }

      // 2. Parse all bookings
      const allBookings = [];
      reservationKeys.forEach(key => {
        try {
          const bookings = JSON.parse(localStorage.getItem(key) || "[]");
          const userIdSuffix = key.replace("luxebook_reservations", ""); // e.g. "_usr_123" or ""
          
          if (Array.isArray(bookings)) {
            bookings.forEach(b => {
              allBookings.push({ ...b, _userIdSuffix: userIdSuffix });
            });
          }
        } catch (e) {
          console.error("Failed to parse reservations for key:", key, e);
        }
      });

      if (allBookings.length === 0) {
        setLiveCustomers([]);
        setIsLiveData(false);
        return;
      }

      // 3. Group by customerEmail
      const customersMap = new Map();
      allBookings.forEach(b => {
        const email = b.customerEmail;
        if (!email) return;

        if (!customersMap.has(email)) {
          customersMap.set(email, {
            id: `usr_${Math.random().toString(36).substr(2, 9)}`,
            customerName: b.customerName || "Unknown Guest",
            customerEmail: email,
            customerPhone: b.customerPhone || "—",
            membershipTier: membershipMap.get(b._userIdSuffix) || "Standard",
            joinedDate: b.timestamp || b.createdAt || new Date().toISOString(),
            avatarInitials: getInitials(b.customerName || "Unknown Guest"),
            avatarColor: getAvatarColor(email),
            bookings: []
          });
        }

        const customer = customersMap.get(email);

        // Normalize booking shape
        customer.bookings.push({
          bookingId: b.bookingId || `LB-${Math.floor(Math.random() * 90000) + 10000}`,
          serviceName: b.serviceName || "Wellness Experience",
          therapist: b.therapist || "LuxeBook Specialist",
          date: b.date || "—",
          time: b.time || "—",
          duration: b.duration || "—",
          price: Number(b.price) || 0,
          status: (b.status || "confirmed").toLowerCase(),
          paymentStatus: (b.paymentStatus || "paid").toLowerCase(),
          transactionId: b.transactionId || "—",
          createdAt: b.timestamp || b.createdAt || new Date().toISOString(),
          specialNotes: b.specialNotes || ""
        });
      });

      // 4. Sort bookings descending by date/createdAt inside each customer, and set joinedDate to earliest
      const customersArray = Array.from(customersMap.values()).map(customer => {
        customer.bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        if (customer.bookings.length > 0) {
          // Earliest booking is the joinedDate
          const earliest = customer.bookings[customer.bookings.length - 1];
          customer.joinedDate = earliest.createdAt;
        }
        return customer;
      });

      // 5. Sort customers by most recent booking overall
      customersArray.sort((a, b) => {
        const aLatest = a.bookings.length > 0 ? new Date(a.bookings[0].createdAt).getTime() : 0;
        const bLatest = b.bookings.length > 0 ? new Date(b.bookings[0].createdAt).getTime() : 0;
        return bLatest - aLatest;
      });

      setLiveCustomers(customersArray);
      setIsLiveData(true);
    } catch (err) {
      console.error("Error reading localStorage customers:", err);
      setIsLiveData(false);
    }
  }, []);

  const customers = isLiveData && liveCustomers.length > 0 ? liveCustomers : MOCK_CUSTOMERS;

  // Compute stats on the fly
  const getCustomerStats = (customer) => {
    const totalBookings = customer.bookings.length;
    const totalSpent = customer.bookings
      .filter((b) => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + b.price, 0);
    const activeBookings = customer.bookings.filter((b) =>
      ["confirmed", "pending"].includes(b.status)
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
