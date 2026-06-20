import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_CUSTOMERS } from "../data/mockCustomers";
import { useLocalStorageCustomers } from "../hooks/useLocalStorageCustomers";

/* ─────────────────────────────────────────────
   BADGE HELPERS
───────────────────────────────────────────── */
function MembershipBadge({ tier }) {
  const config = {
    Platinum: {
      bg: "bg-gradient-to-r from-purple-600 to-indigo-600",
      text: "text-white",
      icon: "diamond",
    },
    Gold: {
      bg: "bg-gradient-to-r from-amber-500 to-yellow-400",
      text: "text-amber-950",
      icon: "workspace_premium",
    },
    Silver: {
      bg: "bg-gradient-to-r from-slate-400 to-gray-300",
      text: "text-slate-800",
      icon: "stars",
    },
    Standard: {
      bg: "bg-surface-container-high",
      text: "text-on-surface-variant",
      icon: "person",
    },
  };
  const c = config[tier] || config["Standard"];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${c.bg} ${c.text}`}
    >
      <span
        className="material-symbols-outlined text-[11px]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {c.icon}
      </span>
      {tier}
    </span>
  );
}

function StatusBadge({ status }) {
  const config = {
    confirmed: "bg-emerald-100 text-emerald-800",
    completed: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
        config[status] || config["completed"]
      }`}
    >
      {status}
    </span>
  );
}

function PaymentBadge({ status }) {
  const config = {
    paid: "bg-emerald-100 text-emerald-800",
    pending: "bg-amber-100 text-amber-800",
    refunded: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
        config[status] || config["pending"]
      }`}
    >
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────
   CUSTOMER DETAIL MODAL
───────────────────────────────────────────── */
function CustomerDetailModal({ customer, onClose, getCustomerStats }) {
  const stats = getCustomerStats(customer);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-md"
      onClick={onClose}
    >
      <div
        className="glass-card w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col shadow-2xl border border-outline-variant/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-lg py-md border-b border-outline-variant/20 bg-surface/80 backdrop-blur shrink-0">
          <div className="flex items-center gap-md">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${customer.avatarColor}`}
            >
              {customer.avatarInitials}
            </div>
            <div>
              <h2 className="font-headline-md text-xl text-primary font-bold leading-tight">
                {customer.customerName}
              </h2>
              <p className="text-sm text-on-surface-variant">
                {customer.customerEmail}
              </p>
            </div>
            <div className="ml-sm hidden sm:block">
              <MembershipBadge tier={customer.membershipTier} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-red-50 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Customer Summary Strip */}
        <div className="flex flex-wrap gap-md px-lg py-sm bg-surface-container-low/50 border-b border-outline-variant/10 shrink-0">
          <div className="flex items-center gap-xs text-sm">
            <span className="material-symbols-outlined text-primary text-base">phone</span>
            <span className="text-on-surface-variant">{customer.customerPhone}</span>
          </div>
          <div className="w-px bg-outline-variant/30 hidden sm:block" />
          <div className="flex items-center gap-xs text-sm">
            <span className="material-symbols-outlined text-primary text-base">calendar_today</span>
            <span className="text-on-surface-variant">
              Member since{" "}
              {new Date(customer.joinedDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="w-px bg-outline-variant/30 hidden sm:block" />
          <div className="flex items-center gap-xs text-sm">
            <span className="material-symbols-outlined text-primary text-base">receipt_long</span>
            <span className="text-on-surface-variant">
              {stats.totalBookings} bookings
            </span>
          </div>
          <div className="w-px bg-outline-variant/30 hidden sm:block" />
          <div className="flex items-center gap-xs text-sm">
            <span className="material-symbols-outlined text-primary text-base">payments</span>
            <span className="text-on-surface font-bold text-gold">
              ${stats.totalSpent.toLocaleString()}
            </span>
            <span className="text-on-surface-variant">total spent</span>
          </div>
        </div>

        {/* Booking History */}
        <div className="overflow-y-auto custom-scrollbar flex-1 p-lg">
          <h3 className="font-headline-md text-lg text-primary font-bold mb-md flex items-center gap-2">
            <span className="material-symbols-outlined text-gold">history</span>
            Booking History
          </h3>

          <div className="space-y-sm">
            {customer.bookings.map((booking, idx) => (
              <div
                key={booking.bookingId}
                className="rounded-xl border border-outline-variant/20 bg-surface/50 overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-md"
              >
                {/* Booking row header */}
                <div className="flex flex-wrap items-center justify-between gap-sm px-md py-sm bg-surface-container-low/60 border-b border-outline-variant/10">
                  <div className="flex items-center gap-sm">
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
                      #{booking.bookingId}
                    </span>
                    <StatusBadge status={booking.status} />
                    <PaymentBadge status={booking.paymentStatus} />
                  </div>
                  <span className="font-bold text-primary text-sm">
                    ${booking.price.toLocaleString()}
                  </span>
                </div>

                {/* Booking details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-sm px-md py-sm">
                  <DetailField icon="spa" label="Service" value={booking.serviceName} />
                  <DetailField icon="person_pin" label="Therapist" value={booking.therapist} />
                  <DetailField icon="calendar_month" label="Date" value={booking.date} />
                  <DetailField icon="schedule" label="Time" value={`${booking.time} (${booking.duration})`} />
                  <DetailField
                    icon="receipt"
                    label="Transaction ID"
                    value={booking.transactionId || "—"}
                    mono
                  />
                  <DetailField
                    icon="add_circle"
                    label="Created"
                    value={new Date(booking.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  />
                  {booking.specialNotes && (
                    <div className="sm:col-span-2 lg:col-span-3">
                      <DetailField
                        icon="sticky_note_2"
                        label="Special Notes"
                        value={booking.specialNotes}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailField({ icon, label, value, mono = false }) {
  return (
    <div className="flex items-start gap-xs py-xs">
      <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">
        {icon}
      </span>
      <div>
        <p className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p
          className={`text-sm text-on-surface leading-tight ${
            mono ? "font-mono text-xs" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   KPI SUMMARY CARD
───────────────────────────────────────────── */
function KpiCard({ icon, title, value, sub, iconClass, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="glass-card p-md rounded-xl animate-float transition-all duration-300 cursor-default"
      style={{
        animationDelay: `${delay}s`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        borderColor: hovered
          ? "rgba(212, 175, 55, 0.5)"
          : "rgba(212, 175, 55, 0.2)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`material-symbols-outlined p-2 rounded-lg text-lg ${iconClass}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>
      <p className="font-label-caps text-[10px] text-on-surface-variant opacity-70 mb-1 uppercase tracking-wider">
        {title}
      </p>
      <h3 className="font-headline-md text-primary text-2xl font-bold">
        {value}
      </h3>
      {sub && (
        <p className="text-[10px] text-on-surface-variant mt-1">{sub}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function AdminCustomers() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterMembership, setFilterMembership] = useState("All");
  const [filterBookingStatus, setFilterBookingStatus] = useState("All");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const { customers, isLiveData, globalStats, getCustomerStats } = useLocalStorageCustomers();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  /* ── Client-side filtering ── */
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        c.customerName.toLowerCase().includes(q) ||
        c.customerEmail.toLowerCase().includes(q);

      const matchesMembership =
        filterMembership === "All" || c.membershipTier === filterMembership;

      const stats = getCustomerStats(c);
      const matchesBookingStatus =
        filterBookingStatus === "All" ||
        c.bookings.some(
          (b) => b.status === filterBookingStatus.toLowerCase()
        );

      const matchesPaymentStatus =
        filterPaymentStatus === "All" ||
        c.bookings.some(
          (b) => b.paymentStatus === filterPaymentStatus.toLowerCase()
        );

      return (
        matchesSearch &&
        matchesMembership &&
        matchesBookingStatus &&
        matchesPaymentStatus
      );
    });
  }, [customers, searchQuery, filterMembership, filterBookingStatus, filterPaymentStatus, getCustomerStats]);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* ── Sidebar ── */}
      <aside className="h-screen w-72 fixed left-0 top-0 overflow-y-auto flex flex-col py-md px-sm border-r border-outline-variant/20 bg-surface/80 backdrop-blur-xl shadow-sm z-50">
        <div className="mb-lg px-md">
          <Link
            to="/home"
            className="font-headline-md text-headline-md text-primary tracking-tight block"
          >
            Aethelgard
          </Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70">
            Concierge Portal
          </p>
        </div>

        <nav className="flex-grow space-y-1">
          <Link
            className="flex items-center px-md py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all duration-300"
            to="/admin/dashboard"
          >
            <span className="material-symbols-outlined mr-3">dashboard</span>
            <span className="font-body-sm">Overview</span>
          </Link>
          <Link
            className="flex items-center px-md py-3 text-primary font-bold border-r-2 border-primary bg-surface-container-low transition-all duration-300 translate-x-1"
            to="/admin/customers"
          >
            <span
              className="material-symbols-outlined mr-3"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              group
            </span>
            <span className="font-body-sm">Customers</span>
          </Link>
          <Link
            className="flex items-center px-md py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all duration-300"
            to="/appointments"
          >
            <span className="material-symbols-outlined mr-3">calendar_today</span>
            <span className="font-body-sm">Appointments</span>
          </Link>
          <Link
            className="flex items-center px-md py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all duration-300"
            to="/admin/portfolio"
          >
            <span className="material-symbols-outlined mr-3">collections</span>
            <span className="font-body-sm">Portfolio</span>
          </Link>
          <Link
            className="flex items-center px-md py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all duration-300"
            to="/explore"
          >
            <span className="material-symbols-outlined mr-3">explore</span>
            <span className="font-body-sm">Services</span>
          </Link>
          <a
            className="flex items-center px-md py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all duration-300 cursor-pointer"
            onClick={handleLogout}
          >
            <span className="material-symbols-outlined mr-3">logout</span>
            <span className="font-body-sm">Logout</span>
          </a>
        </nav>

        <div className="mt-auto px-md py-md border-t border-outline-variant/10">
          <div className="space-y-1">
            <a
              className="flex items-center py-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                toast("Settings feature coming soon.");
              }}
            >
              <span className="material-symbols-outlined mr-3">settings</span>
              <span className="font-body-sm">Settings</span>
            </a>
            <a
              className="flex items-center py-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                toast("Support portal coming soon.");
              }}
            >
              <span className="material-symbols-outlined mr-3">help_outline</span>
              <span className="font-body-sm">Support</span>
            </a>
          </div>
        </div>
      </aside>

      {/* ── Top Header ── */}
      <header className="fixed top-0 right-0 left-72 h-20 z-40 flex justify-between items-center px-lg backdrop-blur-xl border-b border-outline-variant/20 bg-surface/80 shadow-sm">
        <div className="flex items-center gap-sm">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            group
          </span>
          <h1 className="font-headline-md text-xl text-primary font-bold">
            Customer Management
          </h1>
          <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-bold">
            {filteredCustomers.length} shown
          </span>
        </div>
        <div className="flex items-center space-x-md">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
              search
            </span>
            <input
              id="customer-search"
              className="w-full bg-surface-container-low border-none rounded-full pl-10 text-body-sm py-2 focus:ring-1 focus:ring-primary/20 outline-none"
              placeholder="Search name or email..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-sm border-l border-outline-variant/20 pl-md">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-10 w-10 rounded-full overflow-hidden border border-outline-variant/20 bg-primary-fixed flex items-center justify-center">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                manage_accounts
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="ml-72 pt-20 min-h-screen px-lg pb-xl">
        <div className="max-w-[1300px] mx-auto py-lg">

          {/* Hero Banner */}
          <div
            className="relative overflow-hidden rounded-2xl mb-lg"
            style={{
              background: "#111827",
              minHeight: "200px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 15% 50%, rgba(124,58,237,0.55), transparent 40%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.5), transparent 40%), radial-gradient(circle at 55% 85%, rgba(6,182,212,0.45), transparent 40%)",
                filter: "blur(70px)",
              }}
            />
            <div className="relative z-10 p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-md">
              <div>
                <div className="flex gap-2 mb-4">
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm inline-block">
                    LuxeBook CRM
                  </span>
                  {isLiveData ? (
                    <span className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-sm inline-block font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">sensors</span> Live Data
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-sm inline-block font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">science</span> Demo Data
                    </span>
                  )}
                </div>
                <h2 className="text-4xl font-bold text-white mt-2 font-headline-xl">
                  Customer Directory
                </h2>
                <p className="text-white/70 text-base mt-2 max-w-xl">
                  A complete view of your clientele — booking histories, membership tiers, and spending profiles.
                </p>
              </div>
              <div className="glass-card px-lg py-md rounded-xl text-white/90 text-right border border-white/10 shrink-0">
                <p className="text-[10px] font-label-caps uppercase tracking-widest text-white/50 mb-1">
                  Read-Only Mode
                </p>
                <p className="text-sm font-semibold">View & Analyse Only</p>
              </div>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mb-lg">
            <KpiCard
              icon="group"
              title="Total Customers"
              value={globalStats.totalCustomers}
              sub="Registered clients"
              iconClass="text-primary bg-primary-fixed"
              delay={0.1}
            />
            <KpiCard
              icon="event_available"
              title="Active Bookings"
              value={globalStats.totalActiveBookings}
              sub="Confirmed appointments"
              iconClass="text-emerald-600 bg-emerald-50"
              delay={0.2}
            />
            <KpiCard
              icon="payments"
              title="Total Revenue"
              value={`$${globalStats.totalRevenue.toLocaleString()}`}
              sub="From paid bookings"
              iconClass="text-amber-600 bg-amber-50"
              delay={0.3}
            />
            <KpiCard
              icon="analytics"
              title="Avg Booking Value"
              value={`$${globalStats.avgBookingValue}`}
              sub="Per paid booking"
              iconClass="text-indigo-600 bg-indigo-50"
              delay={0.4}
            />
          </div>

          {/* Filter Bar */}
          <div className="glass-card rounded-xl px-lg py-md mb-md flex flex-wrap gap-md items-center">
            <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest shrink-0">
              Filters:
            </span>

            {/* Membership filter */}
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm text-primary">workspace_premium</span>
              <select
                id="filter-membership"
                value={filterMembership}
                onChange={(e) => setFilterMembership(e.target.value)}
                className="bg-surface-container-low rounded-full px-sm py-1 text-xs font-body-sm border-none focus:ring-1 focus:ring-primary/20 outline-none cursor-pointer"
              >
                {["All", "Platinum", "Gold", "Silver", "Standard"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="w-px h-5 bg-outline-variant/30" />

            {/* Booking status filter */}
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm text-primary">event_note</span>
              <select
                id="filter-booking-status"
                value={filterBookingStatus}
                onChange={(e) => setFilterBookingStatus(e.target.value)}
                className="bg-surface-container-low rounded-full px-sm py-1 text-xs font-body-sm border-none focus:ring-1 focus:ring-primary/20 outline-none cursor-pointer"
              >
                {["All", "Confirmed", "Completed", "Cancelled"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="w-px h-5 bg-outline-variant/30" />

            {/* Payment status filter */}
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm text-primary">credit_card</span>
              <select
                id="filter-payment-status"
                value={filterPaymentStatus}
                onChange={(e) => setFilterPaymentStatus(e.target.value)}
                className="bg-surface-container-low rounded-full px-sm py-1 text-xs font-body-sm border-none focus:ring-1 focus:ring-primary/20 outline-none cursor-pointer"
              >
                {["All", "Paid", "Pending", "Refunded"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Active filter count indicator */}
            {(filterMembership !== "All" ||
              filterBookingStatus !== "All" ||
              filterPaymentStatus !== "All" ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterMembership("All");
                  setFilterBookingStatus("All");
                  setFilterPaymentStatus("All");
                }}
                className="ml-auto flex items-center gap-1 px-sm py-1 rounded-full bg-error/10 text-error text-xs font-label-caps hover:bg-error/20 transition-colors"
              >
                <span className="material-symbols-outlined text-xs">close</span>
                Clear Filters
              </button>
            )}
          </div>

          {/* Customer Table */}
          <div className="glass-card rounded-xl overflow-hidden">
            {filteredCustomers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-2xl text-center">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-md">
                  search_off
                </span>
                <h3 className="font-headline-md text-lg text-primary mb-xs">
                  No customers found
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/20 bg-surface-container-low/80">
                      {[
                        "Customer",
                        "Contact",
                        "Membership",
                        "Bookings",
                        "Total Spent",
                        "Last Status",
                        "Action",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left px-md py-sm font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer, idx) => {
                      const stats = getCustomerStats(customer);
                      return (
                        <tr
                          key={customer.id}
                          className="border-b border-outline-variant/10 last:border-none hover:bg-surface-container-low/50 transition-colors duration-200 group"
                          style={{
                            animationDelay: `${idx * 0.04}s`,
                          }}
                        >
                          {/* Customer Name */}
                          <td className="px-md py-sm">
                            <div className="flex items-center gap-sm">
                              <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${customer.avatarColor}`}
                              >
                                {customer.avatarInitials}
                              </div>
                              <div>
                                <p className="font-medium text-sm text-on-surface leading-tight">
                                  {customer.customerName}
                                </p>
                                <p className="text-[10px] text-on-surface-variant">
                                  ID: {customer.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-md py-sm">
                            <p className="text-xs text-on-surface leading-tight">
                              {customer.customerEmail}
                            </p>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">
                              {customer.customerPhone}
                            </p>
                          </td>

                          {/* Membership */}
                          <td className="px-md py-sm">
                            <MembershipBadge tier={customer.membershipTier} />
                          </td>

                          {/* Bookings count */}
                          <td className="px-md py-sm">
                            <div className="flex flex-col">
                              <span className="font-bold text-primary text-sm">
                                {stats.totalBookings}
                              </span>
                              <span className="text-[10px] text-emerald-600">
                                {stats.activeBookings} active
                              </span>
                            </div>
                          </td>

                          {/* Total spent */}
                          <td className="px-md py-sm">
                            <span className="font-bold text-gold text-sm">
                              ${stats.totalSpent.toLocaleString()}
                            </span>
                          </td>

                          {/* Last booking status */}
                          <td className="px-md py-sm">
                            <StatusBadge status={stats.lastStatus} />
                          </td>

                          {/* Action */}
                          <td className="px-md py-sm">
                            <button
                              id={`view-details-${customer.id}`}
                              onClick={() => setSelectedCustomer(customer)}
                              className="flex items-center gap-1 px-sm py-1.5 rounded-full text-xs font-label-caps uppercase tracking-wide border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-200 group-hover:border-primary/60 whitespace-nowrap"
                            >
                              <span className="material-symbols-outlined text-xs">
                                open_in_new
                              </span>
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Table footer */}
            {filteredCustomers.length > 0 && (
              <div className="flex items-center justify-between px-lg py-sm border-t border-outline-variant/10 bg-surface-container-low/30">
                <p className="text-xs text-on-surface-variant">
                  Showing{" "}
                  <span className="font-bold text-on-surface">
                    {filteredCustomers.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-on-surface">
                    {customers.length}
                  </span>{" "}
                  customers
                </p>
                <p className="text-xs text-on-surface-variant italic">
                  Read-only view · No mutations active
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Customer Detail Modal ── */}
      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          getCustomerStats={getCustomerStats}
        />
      )}
    </div>
  );
}
