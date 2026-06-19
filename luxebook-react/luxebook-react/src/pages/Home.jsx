import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { SERVICES_DATA } from "../data/services";
import SectionDivider from "../components/ui/SectionDivider";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import GlassInfoCard from "../components/ui/GlassInfoCard";
import LuxuryBadge from "../components/ui/LuxuryBadge";

export default function Home() {
  const navigate = useNavigate();
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleAvailabilityCheck = () => {
    setValidationError("");
    if (!selectedServiceId) {
      setValidationError("Please select a service.");
      return;
    }
    if (!selectedDate) {
      setValidationError("Please select a date.");
      return;
    }

    setIsChecking(true);
    const service = SERVICES_DATA.find(s => s.id === parseInt(selectedServiceId));

    setTimeout(() => {
      navigate(`/appointments/${selectedServiceId}`, {
        state: {
          selectedDate: selectedDate.toISOString(),
          therapist: selectedTherapist || "Any Professional"
        }
      });
    }, 600);
  };
  useEffect(() => {
    // Glass card mouse move effects
    const cards = document.querySelectorAll(".glass-card");
    cards.forEach((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };
      card.addEventListener("mousemove", handleMouseMove);
      return () => card.removeEventListener("mousemove", handleMouseMove);
    });

    // Scroll reveal observer
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((section) => {
      section.classList.add("transition-all", "duration-1000", "opacity-0", "translate-y-10");
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      {/* Premium Announcement Bar */}
      <div className="bg-[#0A1A15] text-gold py-1.5 text-center font-label-caps text-[10px] tracking-widest z-[60] relative border-b border-gold/20">
        <span className="material-symbols-outlined text-[12px] inline-block align-text-bottom mr-2">diamond</span>
        EXCLUSIVE PARTNERSHIP: NOW FEATURING LA MER AESTHETIC TREATMENTS
      </div>
      <Navbar />
      
      
      {/* Hero Section */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0A1A15] pt-24 pb-12">
        {/* Background Gradients & Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0A241A] via-[#061410] to-[#061410] opacity-90 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent opacity-80 z-0 mix-blend-screen pointer-events-none"></div>
        
        {/* Subtle Edge Shadows for Depth (Simulating Botanical Silhouettes) */}
        <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-0"></div>
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-0"></div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-lg flex flex-col gap-10">
          
          {/* Asymmetric Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mt-8 lg:mt-0">
            
            {/* Left Column (~55%) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left animate-fade-in-up z-20">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-xl text-[#D4AF37]">spa</span>
                <span className="font-label-caps text-xs text-[#D4AF37] tracking-[0.25em]">PRIVATE WELLNESS CONCIERGE</span>
              </div>
              
              {/* Headline */}
              <h1 className="font-display-lg text-5xl md:text-6xl lg:text-[5.5rem] text-white/95 mb-8 tracking-tight leading-[1.1]">
                A Private World of <br/>
                <span className="italic font-light text-[#D4AF37] tracking-normal">Wellness</span> <span className="italic font-light text-white tracking-normal">&amp;</span> <br/>
                Restoration
              </h1>
              
              {/* Description */}
              <p className="font-body-md text-lg text-white/70 max-w-lg mb-10 leading-relaxed font-light">
                Access extraordinary spa rituals, advanced aesthetic treatments, and transformative wellness experiences curated for those who value refinement, discretion, and excellence.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto mb-16">
                <Link to="/appointments" className="w-full sm:w-auto">
                  <button className="w-full bg-[#D4AF37] text-[#0A1A15] px-8 py-3.5 rounded-full font-label-caps text-[13px] tracking-widest font-semibold hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2">
                    Reserve Your Experience <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </Link>
                <Link to="/explore" className="w-full sm:w-auto">
                  <button className="w-full bg-transparent border border-[#D4AF37]/50 text-white px-8 py-3.5 rounded-full font-label-caps text-[13px] tracking-widest hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-300">
                    Discover Destinations
                  </button>
                </Link>
              </div>

              {/* Trust Bar */}
              <div className="flex flex-wrap items-center gap-8 text-white/80 font-label-caps text-[10px] tracking-widest">
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[#D4AF37] text-xl">spa</span>
                  <div className="text-center">
                    <div className="text-white text-xl font-display-md mb-1">500+</div>
                    <div className="text-white/50 text-[9px]">Experiences</div>
                  </div>
                </div>
                <div className="h-12 w-[1px] bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[#D4AF37] text-xl">diamond</span>
                  <div className="text-center">
                    <div className="text-white text-xl font-display-md mb-1">100+</div>
                    <div className="text-white/50 text-[9px]">Premium Partners</div>
                  </div>
                </div>
                <div className="h-12 w-[1px] bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[#D4AF37] text-xl">room_service</span>
                  <div className="text-center">
                    <div className="text-white text-xl font-display-md mb-1">24/7</div>
                    <div className="text-white/50 text-[9px]">Concierge</div>
                  </div>
                </div>
                <div className="h-12 w-[1px] bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[#D4AF37] text-xl">stars</span>
                  <div className="text-center">
                    <div className="text-white text-xl font-display-md mb-1">98%</div>
                    <div className="text-white/50 text-[9px]">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (~45%) */}
            <div className="lg:col-span-5 relative w-full h-[600px] lg:h-[700px] mt-12 lg:mt-0 animate-fade-in-up" style={{animationDelay: '200ms'}}>
              {/* Main Image */}
              <div className="absolute inset-0 right-0 lg:-right-8 top-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  alt="Luxury Wellness Interior" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                />
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Top Left Card */}
              <div className="absolute top-16 -left-4 sm:-left-12 lg:-left-24 bg-[#141A17]/95 border border-white/5 p-5 rounded-2xl shadow-2xl flex flex-col animate-float w-[220px]">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-[#D4AF37]">
                    <span className="material-symbols-outlined text-2xl">diamond</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[8px] tracking-widest text-white/50 mb-0.5">VERIFIED</p>
                    <p className="font-headline-sm text-sm text-white font-semibold tracking-wide">Luxury Partners</p>
                  </div>
                </div>
                <p className="font-body-sm text-[10px] text-white/50 leading-relaxed">Hand-selected for excellence</p>
              </div>

              {/* Middle Left Card */}
              <div className="absolute top-[45%] -left-4 sm:-left-12 lg:-left-24 bg-[#141A17]/95 border border-white/5 p-5 rounded-2xl shadow-2xl flex flex-col animate-float w-[220px]" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-[#D4AF37]">
                    <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[8px] tracking-widest text-white/50 mb-0.5">CONCIERGE</p>
                    <p className="font-headline-sm text-sm text-white font-semibold tracking-wide">Available 24/7</p>
                  </div>
                </div>
                <p className="font-body-sm text-[10px] text-white/50 leading-relaxed">Personalized assistance whenever you need</p>
              </div>

              {/* Top Right Card */}
              <div className="absolute top-32 -right-4 sm:-right-8 lg:-right-16 bg-[#141A17]/95 border border-white/5 p-5 rounded-2xl shadow-2xl flex flex-col animate-float w-[220px]" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-[#D4AF37]">
                    <span className="material-symbols-outlined text-2xl">spa</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[8px] tracking-widest text-white/50 mb-0.5">PREMIUM ACCESS</p>
                    <p className="font-headline-sm text-sm text-white font-semibold tracking-wide">Member Benefits</p>
                  </div>
                </div>
                <p className="font-body-sm text-[10px] text-white/50 leading-relaxed">Exclusive access to private experiences</p>
              </div>

              {/* Bottom Right Card */}
              <div className="absolute bottom-24 -right-4 sm:-right-8 lg:-right-16 bg-[#141A17]/95 border border-white/5 p-5 rounded-2xl shadow-2xl flex flex-col animate-float w-[220px]" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-[#D4AF37]">
                    <span className="material-symbols-outlined text-2xl">location_on</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[8px] tracking-widest text-white/50 mb-0.5">AWARD WINNING</p>
                    <p className="font-headline-sm text-sm text-white font-semibold tracking-wide">Wellness Destinations</p>
                  </div>
                </div>
                <p className="font-body-sm text-[10px] text-white/50 leading-relaxed">Curated from the world's finest sanctuaries</p>
              </div>
            </div>
          </div>

          {/* Luxury Reservation Suite (Booking Widget) */}
          <div className="w-full animate-fade-in-up mt-6 z-20" style={{animationDelay: '400ms'}}>
            <div className="bg-[#0B1511] rounded-[1.25rem] p-6 lg:p-8 shadow-2xl border border-white/5">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left side text */}
                <div className="md:w-1/4 text-left">
                  <h3 className="font-display-md text-xl text-white mb-2 flex items-center gap-2">
                    Luxury Reservation Suite <span className="material-symbols-outlined text-[#D4AF37] text-lg">auto_awesome</span>
                  </h3>
                  <p className="font-body-sm text-white/50 text-[11px] tracking-wide">Your journey to wellbeing begins here</p>
                </div>

                {/* Right side inputs */}
                <div className="md:w-3/4 w-full">
                  {validationError && (
                    <div className="bg-error/10 text-error px-4 py-2 rounded-lg text-sm font-semibold border border-error/20 flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      {validationError}
                    </div>
                  )}

                  {/* DatePicker Custom Styles */}
                  <style dangerouslySetInnerHTML={{__html: `
                    .luxe-datepicker-wrapper { width: 100%; }
                    .luxe-datepicker { 
                      width: 100%; 
                      background: transparent; 
                      border: none; 
                      font-family: inherit;
                      font-size: 0.875rem;
                      color: white;
                      outline: none;
                      cursor: pointer;
                    }
                    .luxe-datepicker::placeholder { color: rgba(255,255,255,0.4); }
                    .luxe-calendar { 
                      background: #0B1511 !important; 
                      border: 1px solid rgba(212,175,55,0.2) !important;
                      border-radius: 12px !important;
                      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
                      font-family: inherit !important;
                    }
                    .react-datepicker__header { background: transparent !important; border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
                    .react-datepicker__current-month { color: #D4AF37 !important; font-weight: 500 !important; }
                    .react-datepicker__day-name { color: rgba(255,255,255,0.3) !important; }
                    .react-datepicker__day { color: white !important; border-radius: 50% !important; }
                    .react-datepicker__day:hover { background: rgba(212,175,55,0.1) !important; }
                    .react-datepicker__day--selected { background: #D4AF37 !important; color: #0A1A15 !important; }
                    .react-datepicker__day--disabled { color: rgba(255,255,255,0.1) !important; }
                    select option { background-color: #0B1511; color: white; }
                  `}} />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-[#16251F] rounded-xl p-3 text-left">
                      <label className="font-label-caps text-[8px] text-[#D4AF37]/70 block mb-1.5 tracking-widest">SERVICE</label>
                      <select 
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-medium focus:ring-0 outline-none appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select Service</option>
                        {SERVICES_DATA.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1 bg-[#16251F] rounded-xl p-3 text-left flex justify-between items-center">
                      <div className="w-full">
                        <label className="font-label-caps text-[8px] text-[#D4AF37]/70 block mb-1.5 tracking-widest">DATE</label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          minDate={new Date()}
                          dateFormat="MMMM d, yyyy"
                          placeholderText="Select Date"
                          className="luxe-datepicker"
                          calendarClassName="luxe-calendar"
                          wrapperClassName="luxe-datepicker-wrapper"
                        />
                      </div>
                      <span className="material-symbols-outlined text-white/30 text-[16px]">calendar_today</span>
                    </div>

                    <div className="flex-1 bg-[#16251F] rounded-xl p-3 text-left">
                      <label className="font-label-caps text-[8px] text-[#D4AF37]/70 block mb-1.5 tracking-widest">THERAPIST</label>
                      <select 
                        value={selectedTherapist}
                        onChange={(e) => setSelectedTherapist(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-medium focus:ring-0 outline-none appearance-none cursor-pointer"
                      >
                        <option value="Any Therapist">Any Therapist</option>
                        <option value="Senior Therapist">Senior Therapist</option>
                        <option value="Wellness Specialist">Wellness Specialist</option>
                        <option value="Massage Expert">Massage Expert</option>
                        <option value="Facial Specialist">Facial Specialist</option>
                      </select>
                    </div>

                    <button 
                      onClick={handleAvailabilityCheck}
                      disabled={isChecking}
                      className="bg-[#D4AF37] text-[#0A1A15] px-6 rounded-xl font-label-caps text-[11px] tracking-widest font-bold hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2 h-auto py-3 sm:py-0 whitespace-nowrap"
                    >
                      {isChecking ? (
                        <><span className="material-symbols-outlined animate-spin text-[16px]">sync</span> Checking...</>
                      ) : (
                        <>Check Availability <span className="material-symbols-outlined text-[16px] font-light">arrow_right_alt</span></>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start gap-1.5 mt-4 text-[10px] text-white/40 font-body-sm tracking-wide">
                    <span className="material-symbols-outlined text-[13px]">shield_person</span>
                    Secure reservations <span className="mx-2">•</span> No hidden fees <span className="mx-2">•</span> Premium member care
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Luxury Statistics Layer */}
      <section className="bg-surface-container-lowest py-8 border-y border-gold/10 relative z-20 -mt-8 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-container-max mx-auto px-lg flex flex-wrap justify-around items-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-display-lg text-primary mb-1"><AnimatedCounter end={12} suffix="k+" duration={2500} /></div>
            <div className="text-[10px] font-label-caps tracking-widest text-on-surface-variant">CURATED EXPERIENCES</div>
          </div>
          <div className="w-px h-12 bg-gold/20 hidden md:block"></div>
          <div className="text-center">
            <div className="text-3xl font-display-lg text-primary mb-1"><AnimatedCounter end={50} suffix="+" duration={2000} /></div>
            <div className="text-[10px] font-label-caps tracking-widest text-on-surface-variant">GLOBAL SANCTUARIES</div>
          </div>
          <div className="w-px h-12 bg-gold/20 hidden md:block"></div>
          <div className="text-center">
            <div className="text-3xl font-display-lg text-primary mb-1"><AnimatedCounter end={99} suffix="%" duration={1500} /></div>
            <div className="text-[10px] font-label-caps tracking-widest text-on-surface-variant">CLIENT SATISFACTION</div>
          </div>
        </div>
      </section>

      {/* Featured Services (Bento Grid Style) */}
      <section className="reveal-section py-xl bg-background px-lg">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-lg">
            <div>
              <span className="font-label-caps text-label-caps text-primary tracking-widest">CURATED EXPERIENCES</span>
              <h2 className="font-headline-xl text-headline-xl text-on-background mt-xs">Featured Services</h2>
            </div>
            <Link to="/explore" className="text-primary font-label-caps border-b border-primary hover:opacity-70 transition-opacity">
              VIEW ALL SERVICES
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
            {/* Card 1: Facial (Large) */}
            <div className="md:col-span-7 relative group rounded-2xl overflow-hidden shadow-lg glass-card gold-glow transition-all duration-500 h-[400px]">
              <img alt="Facial treatment" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDatAhjz_se5P1nl9ve0QvIJnHdKinl90J7ACa55YB6Tm2NYauGpM91dqokAKq99Ovl0W4BjweGEkX70oKdZP4uIo2sBEmStwZeq5bnjQ5zHwuDCBpRWukG6gjXtqcE0zwNrdY8_dGhQOK4hndH7XsQ5nexeHR1lfmRBsgajQf31rTjFWsjzGS-LBYYA_CB06WEOpluvyV3ESluppET30JmpvZ3cHHlwwebe-2Ststk32heCi728d_PHhqWOqi1rWQ_qf3tzpAWEMs" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-lg flex flex-col justify-end">
                <h3 className="font-headline-lg text-headline-lg text-white">Sculpting Facial</h3>
                <p className="font-body-md text-white/80 max-w-sm">Revitalize your skin with our signature lymphatic drainage and non-invasive lifting ritual.</p>
              </div>
            </div>
            
            {/* Card 2: Spa */}
            <div className="md:col-span-5 relative group rounded-2xl overflow-hidden shadow-lg glass-card gold-glow transition-all duration-500 h-[400px]">
              <img alt="Luxury Spa" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2guadWouFv0bLpSENdi-2HGTQuMUmJB2A4G0-3yeyh9w8QpstX8nvjVDLg1_0qcIzkuQLtM4quxk6gMSxZavMYyx3nfmxMkFzPIf5q4v6yND_TLyb4v4Q0UfE6gVSiPIAzSn3dmjVdtxbDbWJ5xLWXE098xKO--g8deE_Q50ogea3_Zpp6Ss5mqrecy9NqzHHhE8qA5uaUs5kwpgg9LsSisK3LaDY5LpwMK_JuxkSbpyJ2sNHMxDKDvuFiwW39hW1mizX1wFlD7M" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-lg flex flex-col justify-end">
                <h3 className="font-headline-lg text-headline-lg text-white">The Sanctuary Spa</h3>
                <p className="font-body-md text-white/80">Immerse yourself in mineral-rich thermal waters and bespoke aromatherapy.</p>
              </div>
            </div>
            
            {/* Card 3: Massage */}
            <div className="md:col-span-4 relative group rounded-2xl overflow-hidden shadow-lg glass-card gold-glow transition-all duration-500 h-[300px]">
              <img alt="Therapeutic Massage" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmWzGwzA_XqCZ0pCrMKZN5we3rcfJ-_31J4GWRgtUmxWacaOFOvqq_75zOL5wWdZXfUry9QPh15OBbznBcN3ISoAaIz8tSuDuU6W2dOog3Q3XIJDmb_f9ZIwRVVOEh1snndF9XQreWwiHRfswTROsAnUpL7dbDA1SUZrRwRIzy4jD0Dbl4FqMoBcj8csetqYIYydlBrZKwqQfsADq5djEq266CPziZjtw5iLwVXARn_czUoO0kfde_9KUMJp2ISXByBw2NIaIC5-E" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-lg flex flex-col justify-end">
                <h3 className="font-headline-md text-headline-md text-white">Deep Ritual Massage</h3>
              </div>
            </div>
            
            {/* Card 4: Skin Care */}
            <div className="md:col-span-4 relative group rounded-2xl overflow-hidden shadow-lg glass-card gold-glow transition-all duration-500 h-[300px]">
              <img alt="Clinical Skin Care" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9mYvIZAka6MV9n6uepZpRGE4JHh-tDl9pIFa8ZwCfT2DLq1NbtpFjJU3wrTaC_mDTqDwLC3PaZDvItidnaElHgbYDogJYPEsjB168S7anGTnpaf4khZI-2LT4hMlOuEgtruHH4T38xj8DWDOgBsWBx-Btfw7BKo2blclj0GB0-D12EKXmVGujGjlBDtI5vyUD-S7qomdzMhAlplnVkZp__0eWLlTZ7BjA-ukO-g2ciDbxxaC3MMX3bYa3iHWDP29Tob0teFQIOlQ" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-lg flex flex-col justify-end">
                <h3 className="font-headline-md text-headline-md text-white">Precision Skin Care</h3>
              </div>
            </div>
            
            {/* Card 5: Wellness Packages */}
            <div className="md:col-span-4 relative group rounded-2xl overflow-hidden shadow-lg glass-card gold-glow transition-all duration-500 h-[300px]">
              <img alt="Wellness Package" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVEnPPZSeOeuTmnHD5aM0-S8-RXYNQ-HENH-gWLCe5kJdopPCLEpaSSs-mffiB7QG_HgYkruchJ1VqlkNA96ORkV9liCFpcxVEk3cIH45JKKsvbSBTvZqXKC310vnnPDvqi7YF_bDRgxqaaFS_gmyfGppkc7B5Xdc7L5XKM745HMoQo4hq4YA6_6ObfLNSfPBlHW9KkoKybi-qXeO_-COxqqr5JC0KKWRmjiJEV_FeJkaplkXoaANxs2p6RHoEjQETyptfvBOF27U" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-lg flex flex-col justify-end">
                <h3 className="font-headline-md text-headline-md text-white">Curated Wellness</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why LuxeBook */}
      <section className="reveal-section py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="text-center mb-xl">
            <span className="font-label-caps text-label-caps text-secondary tracking-widest">THE PINNACLE OF SERVICE</span>
            <h2 class="font-headline-xl text-headline-xl text-on-background mt-xs">Why LuxeBook</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg text-center">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 flex items-center justify-center rounded-full border border-gold/30 text-gold mb-md group-hover:bg-gold/10 transition-colors">
                <span className="material-symbols-outlined text-4xl">calendar_month</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs">Instant Booking</h4>
              <p className="font-body-sm text-on-surface-variant">Real-time confirmation for your precious schedule.</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 flex items-center justify-center rounded-full border border-gold/30 text-gold mb-md group-hover:bg-gold/10 transition-colors">
                <span className="material-symbols-outlined text-4xl">verified_user</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs">Verified Pros</h4>
              <p className="font-body-sm text-on-surface-variant">Top 1% therapists vetted for exceptional skill.</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 flex items-center justify-center rounded-full border border-gold/30 text-gold mb-md group-hover:bg-gold/10 transition-colors">
                <span className="material-symbols-outlined text-4xl">hotel_class</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs">Premium Only</h4>
              <p className="font-body-sm text-on-surface-variant">Exclusive partners offering white-glove treatment.</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 flex items-center justify-center rounded-full border border-gold/30 text-gold mb-md group-hover:bg-gold/10 transition-colors">
                <span className="material-symbols-outlined text-4xl">lock</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs">Secure Pay</h4>
              <p className="font-body-sm text-on-surface-variant">Encrypted transactions for complete peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="reveal-section py-xl bg-surface-container-low text-on-surface">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="text-center mb-xl">
            <span className="font-label-caps text-label-caps text-primary tracking-[0.2em]">CAPTURED SERENITY</span>
            <h2 className="font-display-lg text-display-lg mt-xs mb-md text-on-background">Gallery</h2>
            <p className="font-body-lg text-on-surface-variant max-w-3xl mx-auto">
              Explore the tranquil spaces, luxurious treatments, and elegant experiences that make LuxeBook a destination for wellness and relaxation.
            </p>
          </div>
          
          {/* Gallery Grid (5 Images) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md mb-xl h-auto md:h-[500px]">
            {/* Main large image */}
            <div className="md:col-span-6 overflow-hidden rounded-2xl shadow-lg relative group h-[300px] md:h-full">
              <img alt="LuxeBook Gallery Preview 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </div>
            
            {/* 4 smaller images */}
            <div className="md:col-span-6 grid grid-cols-2 gap-md h-full">
              <div className="overflow-hidden rounded-2xl shadow-lg relative group h-[200px] md:h-[240px]">
                <img alt="LuxeBook Gallery Preview 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-lg relative group h-[200px] md:h-[240px]">
                <img alt="LuxeBook Gallery Preview 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-lg relative group h-[200px] md:h-[240px]">
                <img alt="LuxeBook Gallery Preview 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-lg relative group h-[200px] md:h-[240px]">
                <img alt="LuxeBook Gallery Preview 5" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/gallery">
              <button className="bg-primary text-white px-xl py-md rounded-full font-label-caps text-label-caps shadow-lg hover:shadow-xl hover:bg-primary-container transition-all hover:-translate-y-0.5">
                View Full Gallery →
              </button>
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Brand Philosophy / Editorial Block */}
      <section className="reveal-section py-xl bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto px-lg text-center">
          <span className="material-symbols-outlined text-4xl text-gold mb-6 opacity-80">spa</span>
          <h2 className="font-display-lg text-4xl md:text-5xl text-primary leading-tight mb-8">
            "True luxury is not just found in the surroundings, but in the seamless anticipation of your every need."
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed max-w-2xl mx-auto text-lg">
            At LuxeBook, we believe wellness is the ultimate luxury. Our philosophy revolves around curating extraordinary moments that transcend traditional spa experiences. We partner exclusively with the world's most distinguished sanctuaries to offer our members unparalleled access to rejuvenation and peace.
          </p>
          <div className="mt-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Jane_Doe_Signature.png" alt="Founder Signature" className="h-12 mx-auto opacity-60 invert dark:invert-0" />
            <p className="font-label-caps tracking-widest mt-2 text-xs text-on-surface-variant/70">ISABELLA VANE, FOUNDER</p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Concierge Service Highlight */}
      <section className="reveal-section py-xl bg-surface-container-lowest overflow-hidden">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full"></div>
              <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Concierge" className="rounded-3xl shadow-2xl relative z-10 w-full h-[500px] object-cover" />
              <div className="absolute -bottom-8 -right-8 bg-white dark:bg-[#121212] p-6 rounded-2xl shadow-xl z-20 border border-gold/20 flex items-center gap-4">
                <span className="material-symbols-outlined text-4xl text-primary">support_agent</span>
                <div>
                  <p className="text-xs font-label-caps tracking-widest text-gold mb-1">24/7 AVAILABILITY</p>
                  <p className="font-headline-md text-sm text-on-surface">Your Personal Wellness Attaché</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <LuxuryBadge variant="emerald" className="mb-6">WHITE-GLOVE SERVICE</LuxuryBadge>
              <h2 className="font-headline-xl text-primary mb-6">The Dedicated Concierge</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed mb-8">
                Every reservation made through LuxeBook includes complimentary access to our dedicated wellness concierge team. From coordinating private transport to your sanctuary, to ensuring your favorite aromatherapy blends await in your suite, no detail is too small.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-on-surface">
                  <span className="material-symbols-outlined text-gold">check_circle</span>
                  <span>Bespoke itinerary planning</span>
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <span className="material-symbols-outlined text-gold">check_circle</span>
                  <span>Pre-arrival consultation & customization</span>
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <span className="material-symbols-outlined text-gold">check_circle</span>
                  <span>Post-treatment aftercare coordination</span>
                </li>
              </ul>
              <button className="bg-transparent border border-primary text-primary px-8 py-3 rounded-full font-label-caps tracking-widest hover:bg-primary hover:text-white transition-colors duration-300">
                Discover The Concierge
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Discover the Difference */}
      <section className="reveal-section py-xl bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 blur-3xl bg-secondary"></div>
        <div className="max-w-container-max mx-auto px-lg relative z-10 flex flex-col md:flex-row items-center gap-xl">
          
          {/* Left Side: Benefit Cards */}
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-md">
            
            <div className="glass-card-light p-lg rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary mb-md group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl">spa</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs text-on-surface">Personalized Treatments</h4>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Every service is tailored to your unique wellness goals, ensuring a truly customized spa experience.
              </p>
            </div>
            
            <div className="glass-card-light p-lg rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 sm:translate-y-lg">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary mb-md group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl">psychiatry</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs text-on-surface">Expert Therapists</h4>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Our highly trained professionals provide exceptional care using proven techniques and premium products.
              </p>
            </div>
            
            <div className="glass-card-light p-lg rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary mb-md group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl">local_florist</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs text-on-surface">Luxury Environment</h4>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Relax in a peaceful sanctuary designed to help you unwind, recharge, and escape daily stress.
              </p>
            </div>
            
            <div className="glass-card-light p-lg rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 sm:translate-y-lg">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary mb-md group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl">self_care</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs text-on-surface">Holistic Wellness</h4>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                We focus on complete well-being through treatments that nurture both body and mind.
              </p>
            </div>

          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2 mt-xl md:mt-0 md:pl-lg">
            <span className="font-label-caps text-label-caps text-primary tracking-[0.2em]">WHY CHOOSE US</span>
            <h2 className="font-headline-xl text-headline-xl mt-xs mb-md text-on-background">Discover the Difference ✨</h2>
            <p className="font-body-lg text-on-surface-variant mb-xl leading-relaxed">
              Experience personalized care, luxurious treatments, and a tranquil atmosphere designed to rejuvenate your mind, body, and spirit.
            </p>
            
            <Link to="/explore">
              <button className="bg-primary text-white px-xl py-md rounded-full font-label-caps text-label-caps shadow-lg hover:shadow-xl hover:bg-primary-container transition-all hover:-translate-y-0.5">
                Explore Our Services
              </button>
            </Link>
          </div>
          
        </div>
      </section>

      {/* Testimonials */}
      <section className="reveal-section py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-lg">
          <h2 className="font-headline-xl text-center mb-xl text-primary">Voices of the Inner Circle</h2>
          <div className="flex flex-wrap justify-center gap-lg">
            {/* Testimonial 1 */}
            <div className="glass-card-light p-lg rounded-2xl shadow-lg border border-gold/10 max-w-sm">
              <div className="flex text-gold mb-md">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined">star</span>
                ))}
              </div>
              <p className="font-body-md italic mb-lg">"LuxeBook has transformed how I manage my self-care. The quality of therapists is simply unmatched in the city."</p>
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full bg-surface-dim overflow-hidden">
                  <img alt="Client" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc8jhgbPfA3AaqxNdJTSgJUl7Wmbor4VE5aB7jYNdrvIEfSJlmPn88CqGD3MOotRJ4nNnAQa5Ngdj8pUFD9cHXEG1lEiol2ND33mJICJMkIflvTJu0fkZM29KvfPDE3T0kHei22Bnnvgnzclwp2Py8zdyZRONbN7oUfO2mckRxbTLaoupFD2GXImBmS_b4RCQPWIqbDfVaT5wxiEhkkNkNbt0WaUnGClJEflNvxx8Gzs06droklRAMS4Aom7BnjVDIXA3RkVUzdBw" />
                </div>
                <div>
                  <h5 className="font-headline-md text-headline-md text-lg">Eleanor Vane</h5>
                  <p className="font-label-caps text-[10px] text-on-surface-variant">PLATINUM MEMBER</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="glass-card-light p-lg rounded-2xl shadow-lg border border-gold/10 max-w-sm md:scale-105">
              <div className="flex text-gold mb-md">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined">star</span>
                ))}
              </div>
              <p className="font-body-md italic mb-lg">"The personalized wellness consultation suggested a treatment I didn't even know I needed. It was life-changing. Pure effortless luxury."</p>
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full bg-surface-dim overflow-hidden">
                  <img alt="Client" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7fOcr1RiqHPyhGTZFQwMBepNYvtmaUkz3ieE9poGufO1v7LsqtIJJKvhzEaTJf2JgyUgX-GGOFG65pm7U4ZBO7c2Kp3Op-qaQsEQrSHwaD3LzLrbWunn2W1cF8Ext4lsbpi17_fRLMDrWbbDKet0IpVGXF2l025x_hAw8LnNeWyR4-hk94RFJKFrOVYp9BTYd4jLTeU5deV_KyoJeErPHgwCL1Nzvov9pu9vldbHg-cuE2ZBQFyY-i563K9DBcjgXmCBz3hOBmGc" />
                </div>
                <div>
                  <h5 className="font-headline-md text-headline-md text-lg">Julian Cross</h5>
                  <p className="font-label-caps text-[10px] text-on-surface-variant">DIAMOND TIER</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership & Loyalty */}
      <section className="reveal-section py-xl bg-[#0a261f] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/30 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-container-max mx-auto px-lg relative z-10 text-center">
          <span className="font-label-caps text-label-caps text-gold tracking-[0.3em]">BEYOND ACCESS</span>
          <h2 className="font-display-lg text-display-lg mt-md mb-lg">The Inner Circle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg max-w-5xl mx-auto mb-xl">
            <div className="p-lg border border-gold/20 rounded-2xl hover:bg-white/5 transition-colors">
              <h3 class="font-headline-md text-gold mb-md">Priority Concierge</h3>
              <p className="text-white/70 font-body-sm">Skip the wait with 24/7 priority access to the world's most sought-after practitioners.</p>
            </div>
            <div className="p-lg border border-gold/20 rounded-2xl hover:bg-white/5 transition-colors bg-white/5 shadow-2xl scale-110">
              <h3 class="font-headline-md text-gold mb-md">Platinum Events</h3>
              <p className="text-white/70 font-body-sm">Exclusive invitations to private wellness retreats and high-society aesthetics galas.</p>
            </div>
            <div className="p-lg border border-gold/20 rounded-2xl hover:bg-white/5 transition-colors">
              <h3 class="font-headline-md text-gold mb-md">Global Access</h3>
              <p className="text-white/70 font-body-sm">Seamless wellness continuity as you travel between our partner suites in 20+ capitals.</p>
            </div>
          </div>
          <Link to="/membership">
            <button className="bg-gold text-[#0a261f] px-xl py-md rounded-full font-label-caps tracking-widest hover:bg-white transition-all">
              APPLY FOR MEMBERSHIP
            </button>
          </Link>
        </div>
      </section>

      <SectionDivider />

      {/* Signature Experience Timeline */}
      <section className="reveal-section py-xl bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto px-lg">
          <div className="text-center mb-16">
            <LuxuryBadge variant="gold" className="mb-4">THE JOURNEY</LuxuryBadge>
            <h2 className="font-headline-xl text-primary">The LuxeBook Experience</h2>
          </div>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gold/30 before:to-transparent">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-container-lowest bg-gold text-[#0a261f] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">1</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl border border-gold/10 hover:border-gold/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-gold">auto_awesome</span>
                  <h4 className="font-headline-md text-lg text-primary">The Consultation</h4>
                </div>
                <p className="text-sm text-on-surface-variant">Your journey begins with a private consultation with our wellness attachés to understand your unique needs and desires.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-container-lowest bg-surface-variant text-on-surface shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-gold transition-colors">2</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl border border-outline-variant/30 hover:border-gold/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-gold">map</span>
                  <h4 className="font-headline-md text-lg text-primary">The Curation</h4>
                </div>
                <p className="text-sm text-on-surface-variant">We meticulously select the perfect sanctuary, therapist, and treatment protocol tailored exclusively to you.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-container-lowest bg-surface-variant text-on-surface shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-gold transition-colors">3</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl border border-outline-variant/30 hover:border-gold/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-gold">spa</span>
                  <h4 className="font-headline-md text-lg text-primary">The Immersion</h4>
                </div>
                <p className="text-sm text-on-surface-variant">Arrive at your destination where every detail, from the ambient temperature to the tea selection, has been preemptively orchestrated.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Instagram/Social Inspiration Gallery */}
      <section className="py-2">
        <div className="text-center mb-8">
          <p className="font-label-caps tracking-widest text-on-surface-variant mb-2">JOIN THE CONVERSATION</p>
          <h3 className="font-headline-md text-2xl text-primary">@LuxeBookOfficial</h3>
        </div>
        <div className="flex overflow-hidden gap-1">
          <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=300&q=80" alt="Social" className="w-1/4 h-64 object-cover hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0" />
          <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&q=80" alt="Social" className="w-1/4 h-64 object-cover hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0" />
          <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&q=80" alt="Social" className="w-1/4 h-64 object-cover hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0" />
          <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?w=300&q=80" alt="Social" className="w-1/4 h-64 object-cover hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-[#0c1f1a]">
        <img alt="Serene wellness" className="absolute inset-0 w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKTAQq7acmtZvMetbVKrNCnRv6qkA1p-kk-SNLTeaTdiBs7q8zVS5VyI1BBPqYSVOeaEBbmm6kmEqflcBkaLYjei1dRGA-R2ICewr5ULmWphoPOadYNelGQ2aK_Oc9DrZCSIV7oDs91182i-SalSazzphnxraXFL_WHtfra1efqXenVjBbjSXMW__825rDACkXIrXXbuO-IFPxBkHmMTURD1rRzJmFARQXeh-bEA4Qch08t9ZVkisq8lfOZZ4qCvFRdDTjF9vCibs" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-lg">
          <h2 className="font-display-lg text-display-lg text-white mb-lg">Begin Your Wellness Journey Today</h2>
          <Link to="/appointments">
            <button className="shimmer-btn bg-white text-primary px-xl py-lg rounded-full font-label-caps text-xl shadow-2xl hover:scale-105 transition-all">
              Book Your Experience
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
