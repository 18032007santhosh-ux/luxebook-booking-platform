import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LiquidShader from "../components/ui/LiquidShader";

const styles = `
  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }
  .platinum-card {
    background: linear-gradient(135deg, rgba(229, 228, 226, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(180, 180, 180, 0.1) 100%);
    backdrop-filter: blur(32px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .text-shadow-sm {
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  .ai-concierge-sphere {
    background: radial-gradient(circle at 30% 30%, rgba(15, 94, 77, 1) 0%, rgba(0, 32, 25, 1) 100%);
    border: 2px solid #D4AF37;
    box-shadow: 0 0 30px rgba(15, 94, 77, 0.5), inset 0 0 15px rgba(212, 175, 55, 0.3);
  }
  .nav-item-active {
    background: linear-gradient(90deg, rgba(212, 175, 55, 0.2) 0%, transparent 100%);
    border-left: 3px solid #D4AF37;
  }
`;

export default function CinematicEvolution() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="dark text-on-surface font-body-md min-h-screen relative overflow-x-hidden antialiased">
      <style>{styles}</style>
      
      {/* Background Liquid Shader */}
      <LiquidShader />

      {/* Top Navigation */}
      <header
        className="fixed top-0 w-full z-50 glass-card h-20 border-t-0 border-x-0 transition-colors duration-300"
        style={{
          backgroundColor: scrollY > 20 ? "rgba(0, 32, 25, 0.6)" : "transparent",
        }}
      >
        <div className="flex justify-between items-center px-lg py-md max-w-container-max mx-auto h-full">
          <Link to="/home" className="font-headline-lg text-headline-lg font-bold text-warm-ivory tracking-tight italic text-shadow-sm">
            LuxeBook
          </Link>
          <div className="flex items-center gap-md">
            <div className="relative hidden md:block">
              <input
                className="bg-white/5 border border-white/10 rounded-full px-md py-2 w-72 text-body-sm text-warm-ivory placeholder-warm-ivory/40 focus:ring-1 focus:ring-gold/50 focus:bg-white/10 transition-all outline-none"
                placeholder="Search bespoke services..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-sm">
              <button className="material-symbols-outlined text-warm-ivory/70 hover:text-gold transition-colors duration-300">
                notifications
              </button>
              <button className="material-symbols-outlined text-warm-ivory/70 hover:text-gold transition-colors duration-300">
                account_circle
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Side Navigation Bar */}
      <aside className="fixed left-0 top-0 h-full w-72 z-40 glass-card border-l-0 border-y-0 pt-20 hidden md:flex flex-col gap-sm py-lg">
        <div className="px-8 py-10 animate-fade-in-up">
          <h2 className="font-headline-md text-headline-md text-gold tracking-tight text-shadow-sm">Welcome, Excellence</h2>
          <p className="font-body-sm text-warm-ivory/60 mt-1 uppercase tracking-widest text-[10px]">Your private concierge awaits</p>
        </div>
        <nav className="flex-grow space-y-1">
          <Link
            className="flex items-center gap-4 nav-item-active text-gold mx-4 py-3 px-6 transition-all duration-500 hover:translate-x-2"
            to="/cinematic"
          >
            <span className="material-symbols-outlined">diamond</span>
            <span className="font-body-md tracking-wide">Concierge</span>
          </Link>
          <Link
            className="flex items-center gap-4 text-warm-ivory/70 hover:text-warm-ivory hover:bg-white/5 rounded-r-full mr-4 py-3 px-10 transition-all duration-500 hover:translate-x-2"
            to="/book"
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-body-md tracking-wide">Appointments</span>
          </Link>
          <Link
            className="flex items-center gap-4 text-warm-ivory/70 hover:text-warm-ivory hover:bg-white/5 rounded-r-full mr-4 py-3 px-10 transition-all duration-500 hover:translate-x-2"
            to="/explore"
          >
            <span className="material-symbols-outlined">explore</span>
            <span className="font-body-md tracking-wide">Discover</span>
          </Link>
          <Link
            className="flex items-center gap-4 text-warm-ivory/70 hover:text-warm-ivory hover:bg-white/5 rounded-r-full mr-4 py-3 px-10 transition-all duration-500 hover:translate-x-2"
            to="/admin/portfolio"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="font-body-md tracking-wide">Portfolio</span>
          </Link>
          <Link
            className="flex items-center gap-4 text-warm-ivory/70 hover:text-warm-ivory hover:bg-white/5 rounded-r-full mr-4 py-3 px-10 transition-all duration-500 hover:translate-x-2"
            to="/login"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-body-md tracking-wide">Logout</span>
          </Link>
        </nav>
        <div className="px-8 pb-12">
          <Link to="/book">
            <button className="w-full bg-gold text-[#002019] font-label-caps py-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
              BOOK NEW SERVICE
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="md:ml-72 pt-32 px-gutter md:px-lg pb-xl max-w-container-max">
        {/* Header Section */}
        <section className="mb-xl animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <span className="font-label-caps text-gold mb-2 block tracking-[0.3em] text-[10px]">DASHBOARD OVERVIEW</span>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-warm-ivory leading-none tracking-tight text-shadow-sm italic">
                Curating Your Time
              </h2>
            </div>
            <div className="flex gap-4">
              <div className="glass-card rounded-2xl p-6 min-w-[180px] hover:scale-[1.02] transition-all duration-500">
                <p className="font-label-caps text-gold/80 mb-1 text-[10px]">LOYALTY POINTS</p>
                <p className="font-headline-md text-warm-ivory text-xl">
                  12,450 <span class="text-body-sm font-normal text-gold/60">LX</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Row: Membership & Stats */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-xl">
          {/* Membership Card */}
          <div className="lg:col-span-8 platinum-card rounded-[40px] p-8 md:p-14 relative overflow-hidden group hover:scale-[1.01] transition-all duration-700">
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[320px]">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-gold animate-pulse">verified</span>
                  <span className="font-label-caps text-gold text-[11px] tracking-[0.2em]">EXCLUSIVITY STATUS</span>
                </div>
                <h3 className="font-headline-xl text-warm-ivory mb-4 tracking-tight text-shadow-sm text-3xl font-bold">
                  Platinum Member
                </h3>
                <p className="font-body-lg text-warm-ivory/80 max-w-lg leading-relaxed text-base">
                  Accessing 24/7 priority concierge, worldwide lounge entry, and bespoke treatment curation with unparalleled attention to detail.
                </p>
              </div>
              <div className="flex flex-wrap gap-12 mt-10">
                <div>
                  <p className="font-label-caps text-gold/60 mb-2 text-[10px]">NEXT REWARD</p>
                  <p className="font-body-md font-semibold text-warm-ivory tracking-wide">Private Spa Weekend</p>
                </div>
                <div>
                  <p className="font-label-caps text-gold/60 mb-2 text-[10px]">MEMBER SINCE</p>
                  <p className="font-body-md font-semibold text-warm-ivory tracking-wide">January 2021</p>
                </div>
              </div>
            </div>
            {/* Abstract Design Element */}
            <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-gold/10 blur-[100px] group-hover:bg-gold/15 transition-all duration-1000"></div>
            <div className="absolute right-12 bottom-12 opacity-10">
              <span className="material-symbols-outlined text-[160px] text-gold">diamond</span>
            </div>
          </div>

          {/* Profile Overview Image */}
          <div className="lg:col-span-4 rounded-[40px] overflow-hidden relative group hover:scale-[1.02] transition-all duration-700 shadow-2xl shadow-black/50 h-[400px] lg:h-auto">
            <img
              className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
              alt="Serene Spa Interior"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMPm30uM6Hu4eorahOQqhOqlLFm1Mx1jlUjfanMYn7z73lbJepBzy-yn5OSwt0uummFDnWVgLDGOMKy4UfYnnL83WJx1e4YQ1JBfQQSzu1_B2U16F9HK5qRVtlhf5o4lMoGxuDQxMgl6XvXtloFVtKsFmhy7FuUqr6dKrXa3kgtfGi1-pe1OPKSec8DH3deXPgDN4hSp5XD_k-_5MxPI_QQ-AeUE3X3fHrrx3p7ln4koHLuBkf4RZ8jlrRKK19yYJj4UnU7V7LyBc"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002019]/90 via-[#002019]/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10">
              <p className="font-label-caps text-gold/80 mb-2 text-[10px] tracking-[0.2em]">YOUR PREFERRED SUITE</p>
              <h4 className="font-headline-md text-warm-ivory italic tracking-tight text-lg">The Emerald Sanctuary</h4>
            </div>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="mb-xl">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-headline-lg text-warm-ivory tracking-tight text-shadow-sm text-2xl font-bold">
              Upcoming Appointments
            </h3>
            <Link to="/book" className="text-gold font-label-caps hover:text-warm-ivory transition-colors text-[11px] tracking-widest border-b border-gold/30 pb-1">
              VIEW ALL CALENDAR
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Appointment Card 1 */}
            <div className="glass-card rounded-[32px] p-10 group hover:scale-[1.02] hover:border-gold/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20">
                  <span className="material-symbols-outlined text-gold text-2xl">spa</span>
                </div>
                <span className="font-label-caps text-gold bg-gold/10 px-4 py-1.5 rounded-full text-[10px] border border-gold/20">
                  CONFIRMED
                </span>
              </div>
              <p className="font-label-caps text-warm-ivory/50 mb-3 text-[10px] tracking-widest">OCTOBER 24, 2023 • 2:00 PM</p>
              <h4 className="font-headline-md text-warm-ivory mb-4 tracking-tight text-lg">Royal Thai Massage</h4>
              <p className="font-body-sm text-warm-ivory/70 mb-10 line-clamp-2 leading-relaxed italic text-sm">
                A 90-minute restorative session focusing on deep tissue recovery and energy alignment.
              </p>
              <button className="w-full py-4 border border-gold/30 rounded-full font-label-caps text-gold text-[10px] tracking-widest hover:bg-gold hover:text-on-primary transition-all duration-500">
                MANAGE BOOKING
              </button>
            </div>
            
            {/* Appointment Card 2 */}
            <div className="glass-card rounded-[32px] p-10 group hover:scale-[1.02] hover:border-gold/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20">
                  <span className="material-symbols-outlined text-gold text-2xl">face_5</span>
                </div>
                <span className="font-label-caps text-gold bg-gold/10 px-4 py-1.5 rounded-full text-[10px] border border-gold/20">
                  CONFIRMED
                </span>
              </div>
              <p className="font-label-caps text-warm-ivory/50 mb-3 text-[10px] tracking-widest">OCTOBER 28, 2023 • 10:30 AM</p>
              <h4 className="font-headline-md text-warm-ivory mb-4 tracking-tight text-lg">Golden Glow Facial</h4>
              <p className="font-body-sm text-warm-ivory/70 mb-10 line-clamp-2 leading-relaxed italic text-sm">
                Revitalizing cellular treatment utilizing 24k gold leaf and hyaluronic infusion.
              </p>
              <button className="w-full py-4 border border-gold/30 rounded-full font-label-caps text-gold text-[10px] tracking-widest hover:bg-gold hover:text-on-primary transition-all duration-500">
                MANAGE BOOKING
              </button>
            </div>

            {/* New Appointment Action */}
            <Link
              to="/book"
              className="bg-white/5 rounded-[32px] p-10 border-2 border-dashed border-gold/20 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-gold/5 hover:border-gold/40 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
                <span className="material-symbols-outlined text-gold text-3xl">add</span>
              </div>
              <h4 className="font-headline-md text-warm-ivory mb-2 tracking-tight text-lg">New Appointment</h4>
              <p className="font-body-sm text-warm-ivory/50 italic text-sm">Schedule your next masterpiece</p>
            </Link>
          </div>
        </section>

        {/* Recommended Treatments */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-headline-lg text-warm-ivory tracking-tight text-shadow-sm text-2xl font-bold">
              Recommended for You
            </h3>
            <p className="font-body-md text-gold italic opacity-80 text-sm">Based on your preferences</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Bento Recommendation 1 */}
            <div className="relative rounded-[40px] overflow-hidden min-h-[480px] flex items-end group shadow-2xl shadow-black/60">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                alt="Hot stone massage"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC0wr29kslxpdzmTjVejZc63GRALOPgu1rHbWoE1CRZk6E7vjCVaeNkbAINlztkQjklL65hcaP7lakM0mtyzQaP6H_-vpvuPU0rmfTmDiS06EVR8ADYnQ6HtgheYD5-tAQGvEL4FeSlb2XOZN-JIHYcrVOuIAgUvSrdRM1v34EKSqGjKmQKJG5H2ObmsB_ay_hIOooFB94Grhb0XpgSMmssi8D3hyyAhEZ876deUxvi0lACVnkq9XPWI0JW5bCQ3ODR4YL-qLNWrk"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002019] via-[#002019]/40 to-transparent opacity-90"></div>
              <div className="relative p-12 w-full">
                <span className="font-label-caps text-gold mb-3 block tracking-[0.3em] text-[10px]">NEW ARRIVAL</span>
                <h4 className="font-headline-lg text-warm-ivory mb-6 tracking-tight italic text-2xl">Obsidian Stone Therapy</h4>
                <div className="flex items-center justify-between gap-6">
                  <p className="text-warm-ivory/70 font-body-md max-w-sm leading-relaxed text-sm">
                    Volcanic warmth to release deep-seated tension and restore skeletal alignment.
                  </p>
                  <Link
                    to="/book"
                    className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-on-primary group-hover:scale-110 shadow-lg shadow-gold/30 transition-all duration-500"
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Bento Recommendation 2 */}
            <div className="relative rounded-[40px] overflow-hidden min-h-[480px] flex items-end group shadow-2xl shadow-black/60">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                alt="Skincare treatment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6i9TKyfW5CJTr-eMsxNOzGCu8N9KKyvdqmtfLtCuJH8R5yVQUHLgI8dTz3wfv6NGjkY2jTkBLGfBsQUPPqGt8mvSzBfoYNgSW_UvNJ4A_KmnbL85-MstJ0mSNZ1T8hkk-D7eJFkEBKL6yRiFEs3_abH5zZJ0HTdY5_brEMD0LCft2_WIVeqBAX5LyF6gIFCWwcHc8fATdtcrMdiD1BT9P-Qep0uZV2GIuUPQ3vHCDfO_szzkjGZLb55MxjtzNddEYuDqz9FAwa-Y"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002019] via-[#002019]/40 to-transparent opacity-90"></div>
              <div className="relative p-12 w-full">
                <span className="font-label-caps text-gold mb-3 block tracking-[0.3em] text-[10px]">CURATED FOR YOU</span>
                <h4 className="font-headline-lg text-warm-ivory mb-6 tracking-tight italic text-2xl">Cryo-Oxygen Infusion</h4>
                <div className="flex items-center justify-between gap-6">
                  <p className="text-warm-ivory/70 font-body-md max-w-sm leading-relaxed text-sm">
                    A refreshing blast of pure oxygen and sub-zero temperatures to instantly lift and firm.
                  </p>
                  <Link
                    to="/book"
                    className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-on-primary group-hover:scale-110 shadow-lg shadow-gold/30 transition-all duration-500"
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* AI Concierge FAB */}
      <div className="fixed bottom-10 right-10 z-[60] flex flex-col items-center group">
        <div className="absolute -top-12 bg-white/10 backdrop-blur-md border border-white/20 text-warm-ivory text-[10px] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity tracking-[0.2em] pointer-events-none">
          AI CONCIERGE
        </div>
        <button className="ai-concierge-sphere w-20 h-20 rounded-full flex items-center justify-center animate-pulse-glow hover:scale-110 active:scale-95 transition-all duration-500 group overflow-hidden">
          <span className="material-symbols-outlined text-gold text-4xl group-hover:rotate-12 transition-transform">auto_awesome</span>
        </button>
      </div>
    </div>
  );
}
