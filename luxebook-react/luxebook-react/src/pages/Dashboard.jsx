import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

const dashboardStyles = `
  .aurora-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(124,58,237,0.6), transparent 40%),
      radial-gradient(circle at 80% 30%, rgba(6,182,212,0.6), transparent 40%),
      radial-gradient(circle at 50% 80%, rgba(236,72,153,0.6), transparent 40%);
    filter: blur(80px);
    animation: auroraMove 8s ease-in-out infinite alternate;
  }

  @keyframes auroraMove {
    from {
      transform: translate(-30px, -20px);
    }
    to {
      transform: translate(30px, 20px);
    }
  }

  .hero-banner {
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    min-height: 260px;
    background: #111827;
  }
`;

export default function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [liveBookings, setLiveBookings] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const user = authService.getCurrentUser();
    const storageKey = user ? `luxebook_reservations_${user.id}` : "luxebook_reservations";
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (saved.length > 0) {
      setLiveBookings(saved);
    } else {
      // Fallback to demo data
      setLiveBookings([
        {
          customerName: "Julianna Thorne",
          serviceName: "Deep Tissue Spa Therapy",
          status: "Confirmed",
          avatarBg: "bg-primary-fixed text-primary"
        },
        {
          customerName: "Marcus Vane",
          serviceName: "Executive Grooming Session",
          status: "In-Session",
          avatarBg: "bg-secondary-fixed text-secondary"
        },
        {
          customerName: "Elena Rossi",
          serviceName: "Personal Concierge Consult",
          status: "Completed",
          avatarBg: "bg-surface-container text-outline",
          opacity: true
        },
        {
          customerName: "Sebastian Cole",
          serviceName: "Yacht Charter Briefing",
          status: "Confirmed",
          avatarBg: "bg-primary-fixed text-primary"
        }
      ]);
    }
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      <style>{dashboardStyles}</style>

      {/* SideNavBar Shell */}
      <aside className="h-screen w-72 fixed left-0 top-0 overflow-y-auto flex flex-col py-md px-sm border-r border-outline-variant/20 bg-surface/80 backdrop-blur-xl shadow-sm z-50">
        <div className="mb-lg px-md">
          <Link to="/home" className="font-headline-md text-headline-md text-primary tracking-tight block">
            Aethelgard
          </Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70">Concierge Portal</p>
        </div>
        <nav className="flex-grow space-y-1">
          {/* Active Tab: Overview */}
          <Link
            className="flex items-center px-md py-3 text-primary font-bold border-r-2 border-primary bg-surface-container-low transition-all duration-300 translate-x-1"
            to="/admin/dashboard"
          >
            <span className="material-symbols-outlined mr-3">dashboard</span>
            <span className="font-body-sm">Overview</span>
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
          <Link to="/appointments">
            <button className="w-full bg-primary text-on-primary py-3 rounded-full font-body-sm mb-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
              New Appointment
            </button>
          </Link>
          <div className="space-y-1">
            <a className="flex items-center py-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Settings feature coming soon."); }}>
              <span className="material-symbols-outlined mr-3">settings</span>
              <span className="font-body-sm">Settings</span>
            </a>
            <a className="flex items-center py-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Support portal coming soon."); }}>
              <span className="material-symbols-outlined mr-3">help_outline</span>
              <span className="font-body-sm">Support</span>
            </a>
          </div>
        </div>
      </aside>

      {/* TopNavBar Shell */}
      <header className="fixed top-0 right-0 left-72 h-20 z-40 flex justify-between items-center px-lg backdrop-blur-xl border-b border-outline-variant/20 bg-surface/80 shadow-sm">
        <div className="flex items-center space-x-lg">
          <div className="flex space-x-md text-body-sm">
            <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Direct Support coming soon."); }}>Direct Support</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Documentation coming soon."); }}>Documentation</a>
          </div>
        </div>
        <div className="flex items-center space-x-md">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input
              className="w-full bg-surface-container-low border-none rounded-full pl-10 text-body-sm py-2 focus:ring-1 focus:ring-primary/20"
              placeholder="Search accounts or data..."
              type="text"
            />
          </div>
          <div className="flex items-center space-x-sm border-l border-outline-variant/20 pl-md">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors scale-95 hover:scale-100">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="px-4 py-1.5 border border-primary text-primary rounded-full text-body-sm hover:bg-primary hover:text-on-primary transition-all">
              Go Live
            </button>
            <div className="h-10 w-10 rounded-full overflow-hidden border border-outline-variant/20">
              <img
                alt="Executive Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1MCINljCYWe333WeaxSgIV5u0aNuP10O-9Ttm4SC6LU__acQsLnI-XDPL-LoUv8vXmsRcqE0VTXtxdSZo8peSUG4lNJsqf5-TixkvZ_2SjL3llTBvg1RTUl29jfX6dIgqXLGE2fd12Pgxc0VnyDIDH6KSPVsg9aL0q26iXuVDEJc0ur7pKSO9U8XI-1P9VilAazwtjgg6gr8OgRe0Ci7zORQ4bNxt1wREz6N7GAUy_zzaZoyZIxEM3wlTGNaU6hEbquux0Ek0Np0"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-72 pt-20 min-h-screen px-lg pb-xl">
        <div className="max-w-[1200px] mx-auto py-lg">
          {/* Header Section */}
          <div className="hero-banner mb-lg">
            <div className="aurora-bg"></div>
            <div className="relative z-10 p-10">
              <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm">
                LuxeBook Analytics
              </span>
              <h2 className="text-5xl font-bold text-white mt-4 font-headline-xl">
                Business Intelligence
              </h2>
              <p className="text-white/80 text-lg mt-3 max-w-2xl font-body-lg">
                Welcome back, Director. Here is your enterprise performance summary and operational insights for today.
              </p>
              <button className="mt-6 px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition font-label-caps text-xs">
                View Analytics
              </button>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-lg">
            {[
              {
                id: 1,
                icon: "payments",
                title: "Monthly Revenue",
                value: "$142,500",
                change: "+12%",
                changeIcon: "trending_up",
                iconClass: "text-primary bg-primary-fixed",
                changeClass: "text-emerald-600",
              },
              {
                id: 2,
                icon: "calendar_month",
                title: "Total Appointments",
                value: "842",
                change: "This Month",
                iconClass: "text-tertiary bg-tertiary-fixed",
                changeClass: "text-on-surface-variant",
              },
              {
                id: 3,
                icon: "workspace_premium",
                title: "New Memberships",
                value: "48 Active",
                change: "Platinum",
                iconClass: "text-secondary bg-secondary-fixed",
                changeClass: "text-on-surface-variant",
              },
              {
                id: 4,
                icon: "analytics",
                title: "Booking Value",
                value: "$168.00",
                change: "Avg Value",
                iconClass: "text-primary bg-primary-fixed",
                changeClass: "text-on-surface-variant",
              },
            ].map((metric) => (
              <div
                key={metric.id}
                onMouseEnter={() => setHoveredCard(metric.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="glass-card p-md rounded-xl animate-float transition-all duration-300"
                style={{
                  animationDelay: `${metric.id * 0.1}s`,
                  transform: hoveredCard === metric.id ? "translateY(-4px)" : "translateY(0)",
                  borderColor: hoveredCard === metric.id ? "rgba(212, 175, 55, 0.5)" : "rgba(212, 175, 55, 0.2)",
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`material-symbols-outlined p-2 rounded-lg ${metric.iconClass}`}>
                    {metric.icon}
                  </span>
                  <span className={`${metric.changeClass} text-label-caps flex items-center`}>
                    {metric.changeIcon && (
                      <span className="material-symbols-outlined text-sm mr-1">{metric.changeIcon}</span>
                    )}
                    {metric.change}
                  </span>
                </div>
                <p className="text-label-caps text-on-surface-variant opacity-70 mb-1">{metric.title}</p>
                <h3 className="font-headline-md text-primary text-2xl font-bold">{metric.value}</h3>
              </div>
            ))}
          </div>

          {/* Main Section: Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-md mb-lg">
            {/* Left: Revenue Growth Chart */}
            <div
              className="lg:col-span-2 glass-card p-lg rounded-xl flex flex-col h-[400px] transition-all duration-300"
              onMouseEnter={() => setHoveredCard("chart")}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === "chart" ? "translateY(-4px)" : "translateY(0)",
                borderColor: hoveredCard === "chart" ? "rgba(212, 175, 55, 0.5)" : "rgba(212, 175, 55, 0.2)",
              }}
            >
              <div className="flex justify-between items-center mb-lg">
                <div>
                  <h4 className="font-headline-md text-primary text-xl font-bold">Revenue Growth</h4>
                  <p className="text-body-sm text-on-surface-variant">Annualized projected growth performance</p>
                </div>
                <div className="flex space-x-sm">
                  <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-label-caps text-xs">
                    Weekly
                  </span>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-label-caps text-xs cursor-pointer hover:bg-surface-container-high transition-colors">
                    Monthly
                  </span>
                </div>
              </div>
              <div className="flex-1 relative flex items-end justify-between px-4 pb-8 border-l border-b border-outline-variant/30">
                {/* Simulated Chart Content */}
                <div className="absolute inset-0 top-12 left-4 right-4 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path
                      d="M0 35 Q 25 30, 40 20 T 70 15 T 100 5"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M0 35 Q 25 30, 40 20 T 70 15 T 100 5 V 40 H 0 Z"
                      fill="url(#emerald-gradient)"
                      opacity="0.15"
                    ></path>
                    <defs>
                      <linearGradient id="emerald-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#0F5E4D", stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: "#0F5E4D", stopOpacity: 0 }}></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="text-label-caps text-on-surface-variant opacity-40 text-xs">Jan</div>
                <div className="text-label-caps text-on-surface-variant opacity-40 text-xs">Feb</div>
                <div className="text-label-caps text-on-surface-variant opacity-40 text-xs">Mar</div>
                <div className="text-label-caps text-on-surface-variant opacity-40 text-xs">Apr</div>
                <div className="text-label-caps text-on-surface-variant opacity-40 text-xs">May</div>
                <div className="text-label-caps text-on-surface-variant opacity-40 text-xs">Jun</div>
              </div>
            </div>

            {/* Right: Live Appointment Feed */}
            <div
              className="glass-card p-lg rounded-xl flex flex-col h-[400px] transition-all duration-300"
              onMouseEnter={() => setHoveredCard("feed")}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === "feed" ? "translateY(-4px)" : "translateY(0)",
                borderColor: hoveredCard === "feed" ? "rgba(212, 175, 55, 0.5)" : "rgba(212, 175, 55, 0.2)",
              }}
            >
              <div className="flex justify-between items-center mb-md">
                <h4 className="font-headline-md text-primary text-xl font-bold">Live Feed</h4>
                <span className="material-symbols-outlined text-primary text-sm animate-pulse">
                  circle
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {/* Feed Items */}
                {liveBookings.map((item, idx) => {
                  const statusClass = item.status === "Confirmed" ? "bg-emerald-100 text-emerald-800" :
                                      item.status === "Completed" ? "bg-gray-100 text-gray-800" :
                                      item.status === "In-Session" ? "bg-amber-100 text-amber-800" :
                                      "bg-emerald-100 text-emerald-800";
                  
                  const avatarBg = item.avatarBg || "bg-primary-fixed text-primary";
                  
                  return (
                    <div
                      key={idx}
                      className={`flex items-start space-x-3 pb-3 border-b border-outline-variant/10 last:border-b-0 ${
                        item.opacity ? "opacity-60" : ""
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${avatarBg}`}>
                        <span className="material-symbols-outlined text-sm">person</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-body-sm font-medium">{item.customerName}</p>
                        <p className="text-label-caps text-on-surface-variant opacity-70 text-[10px]">{item.serviceName}</p>
                        {item.date && item.time && (
                          <p className="text-label-caps text-primary/70 text-[9px] mt-1">{item.date} • {item.time}</p>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusClass}`}>
                        {item.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
            {/* Top Performing Services */}
            <div
              className="lg:col-span-2 glass-card p-lg rounded-xl transition-all duration-300"
              onMouseEnter={() => setHoveredCard("services")}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === "services" ? "translateY(-4px)" : "translateY(0)",
                borderColor: hoveredCard === "services" ? "rgba(212, 175, 55, 0.5)" : "rgba(212, 175, 55, 0.2)",
              }}
            >
              <h4 className="font-headline-md text-primary text-xl font-bold mb-lg">Top Performing Services</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-md">
                {[
                  {
                    title: "Spa Therapy",
                    bookings: "248 bookings",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfuqkjNHhRuBFeCKEUG9jxlQzrDP9d7rRjjVDQMDvCwaqeL-AE85hAlckwSjHiQh0JfVr4kjxmilKZif7OaQRxov6dJhbHimzTkFsUtIjHMINeQsMdi9Oq4FDQn3V_oPhta3wIwT_ZIl_YA5itrhRWQhxoem641lmKHEe9GPpcfCN2_4-QiEy2CKpXgWnP0U3XArw3bAQCoyW6_PB4PHVevy_XKupb6gcl2m2ZaZvIDWXrsRzMD_i0v1l5zB7RsTLIyYZIp6c666k",
                  },
                  {
                    title: "Elite Grooming",
                    bookings: "192 bookings",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVbUZndO6pxJjNgeNCG9nOQQkBqQ6H74d92zJA101bTg07mZqihLiirQHhUWviZnYH5JwNIfrcwEp250meVVVP_dwVoZ39JoW6OVNW8uwuzucrSHZ78ZnjwwfDBU1Mzyalc5yNh29Le_4sH2EH5JbzaHKr7QAr6-3-aEgoPLUtiPUNCb2YSa1uKVXNC1omXYvjKWdSVy8sNh-lYSjekp_Qi-segwSL6El1uDNNRfoMwl8qvZVyCaHyZk4PUo-6fo2UYL_amSs_lJY",
                  },
                  {
                    title: "Concierge VIP",
                    bookings: "156 bookings",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC__a68Z0rCnkhznPdRNDyDUooJcCfmT7kDmXtjc1Wnnc2QkzOFYwSMvVCAiDSjtT5cWjJYZ6fv4wHl67k8pSFrl1A30fLNUzomBBS8YKTrfcTietLQb9zgdnTnGQ-oizW77TBbmzegqXE4PbnPvyVyHV4erpvqRV_pcfjfQk5QXmWa4ReU4GjECcfkJrXiNrlFVj0c99pg9Oiux4ohWPsVEcSfzM8Rvh7Q4wjikGKDnB7zS4Rr4sO19_T-7ypzBdDmKi-a1hNH3iA",
                  },
                  {
                    title: "Charter Prep",
                    bookings: "124 bookings",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd-flzmho9xunYPN_x4HbWfGHhyI2I0s3YY7sDPuu50YUz6yjDaB3DxoIFok9FVOZF4uILanFl369IJdJPxzZCreWn44tPNkfzZmLe3nl8jDYSK5Uq4CNunUwpdReQpyWMt21e8oFbUbcGyaXqjvtLBC4o0kH6fGHee5VWzYsFye6LCFrxihnA-mhv0OWJIKu4A5C7AbwlDnxNYESXcqOtWguqF1s_TafmOmO-wyt9WuL_5raQAVijDl8H2oUwGncZbHcn5YyJqDA",
                  },
                ].map((service, idx) => (
                  <div key={idx} className="text-center group cursor-pointer">
                    <div className="aspect-square rounded-xl overflow-hidden mb-3 border border-outline-variant/20 group-hover:border-primary transition-all duration-300">
                      <img alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={service.img} />
                    </div>
                    <p className="text-body-sm font-medium">{service.title}</p>
                    <p className="text-label-caps text-gold text-[10px]">{service.bookings}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Sentiment */}
            <div
              className="glass-card p-lg rounded-xl relative overflow-hidden transition-all duration-300"
              onMouseEnter={() => setHoveredCard("sentiment")}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === "sentiment" ? "translateY(-4px)" : "translateY(0)",
                borderColor: hoveredCard === "sentiment" ? "rgba(212, 175, 55, 0.5)" : "rgba(212, 175, 55, 0.2)",
              }}
            >
              <h4 className="font-headline-md text-primary text-xl font-bold mb-md">Sentiment</h4>
              <div className="flex justify-center items-center h-48 relative">
                {/* Radar Chart Placeholder */}
                <div className="w-32 h-32 rounded-full border-2 border-outline-variant/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-2 border-primary/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-gold/40"></div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 100 100">
                    <polygon fill="rgba(15, 94, 77, 0.1)" points="50,10 90,40 75,90 25,90 10,40" stroke="#0F5E4D" strokeWidth="1"></polygon>
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-sm mt-4">
                <div className="text-center">
                  <p className="text-[10px] text-label-caps text-on-surface-variant">Quality</p>
                  <p className="text-body-sm font-bold text-primary">9.8/10</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-label-caps text-on-surface-variant">Punctuality</p>
                  <p className="text-body-sm font-bold text-primary">9.4/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
