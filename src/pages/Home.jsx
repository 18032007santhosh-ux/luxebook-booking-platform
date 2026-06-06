import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Home() {
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
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#102a24]">
        {/* Background Decorative Gradient */}
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>
        <div className="absolute inset-0 opacity-40 z-0">
          <img 
            alt="Luxury Wellness Lounge" 
            className="w-full h-full object-cover hero-zoom" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKTAQq7acmtZvMetbVKrNCnRv6qkA1p-kk-SNLTeaTdiBs7q8zVS5VyI1BBPqYSVOeaEBbmm6kmEqflcBkaLYjei1dRGA-R2ICewr5ULmWphoPOadYNelGQ2aK_Oc9DrZCSIV7oDs91182i-SalSazzphnxraXFL_WHtfra1efqXenVjBbjSXMW__825rDACkXIrXXbuO-IFPxBkHmMTURD1rRzJmFARQXeh-bEA4Qch08t9ZVkisq8lfOZZ4qCvFRdDTjF9vCibs"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-container-max px-lg text-center mt-20">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-md drop-shadow-2xl">
            Luxury Wellness, Effortlessly Booked
          </h1>
          <p className="font-body-lg text-body-lg text-white/95 max-w-2xl mx-auto mb-lg">
            Discover exclusive spa, facial, beauty, and wellness experiences curated for your lifestyle. Your journey to tranquility starts here.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-md">
            <Link to="/book">
              <button className="shimmer-btn bg-primary-container text-white px-xl py-md rounded-full font-label-caps text-label-caps text-lg shadow-xl hover:scale-105 transition-all">
                Book Appointment
              </button>
            </Link>
            <Link to="/explore">
              <button className="glass-card text-white border border-white/30 px-xl py-md rounded-full font-label-caps text-label-caps text-lg hover:bg-white/10 transition-all">
                Explore Services
              </button>
            </Link>
          </div>
          
          {/* Glassmorphic Booking Widget */}
          <div className="mt-xl glass-card-light rounded-2xl p-lg shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-md items-end">
            <div className="text-left">
              <label className="font-label-caps text-[10px] text-on-surface-variant block mb-base">SERVICE</label>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-outline-variant font-headline-md text-on-surface py-base focus:ring-0 focus:border-primary transition-all appearance-none cursor-pointer">
                  <option>Signature Facial</option>
                  <option>Deep Tissue Spa</option>
                  <option>Aesthetic Ritual</option>
                </select>
              </div>
            </div>
            <div className="text-left">
              <label className="font-label-caps text-[10px] text-on-surface-variant block mb-base">DATE</label>
              <input className="w-full bg-transparent border-b border-outline-variant font-headline-md text-on-surface py-base focus:ring-0 focus:border-primary transition-all" placeholder="Pick a date" type="text" />
            </div>
            <div className="text-left">
              <label className="font-label-caps text-[10px] text-on-surface-variant block mb-base">THERAPIST</label>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-outline-variant font-headline-md text-on-surface py-base focus:ring-0 focus:border-primary appearance-none cursor-pointer">
                  <option>Any Professional</option>
                  <option>Dr. Sarah Sterling</option>
                  <option>Master Therapist Julian</option>
                </select>
              </div>
            </div>
            <Link to="/book" className="w-full flex justify-center">
              <button className="w-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps py-md rounded-xl hover:bg-secondary transition-colors shadow-md">
                Check Availability
              </button>
            </Link>
          </div>
        </div>
      </header>

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
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-lg text-center">
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
                <span className="material-symbols-outlined text-4xl">auto_awesome</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-xs">AI Concierge</h4>
              <p className="font-body-sm text-on-surface-variant">Personalized wellness recommendations by Elowen.</p>
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

      {/* The Art of Wellness */}
      <section className="reveal-section py-xl bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <div className="space-y-lg">
              <span className="font-label-caps text-label-caps text-primary-fixed tracking-[0.2em]">CRAFTING TRANQUILITY</span>
              <h2 className="font-display-lg text-display-lg text-white">The Art of Wellness</h2>
              <p className="font-body-lg text-primary-fixed/80 leading-relaxed">
                We believe wellness is an art form. Our curators scour the globe for the most profound rituals, the most serene environments, and the most gifted healers to ensure every LuxeBook experience is a masterpiece of rejuvenation.
              </p>
              <div className="flex items-center gap-md">
                <div className="h-px w-20 bg-gold/50"></div>
                <span className="font-headline-md text-gold italic">Pure Excellence</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-md">
              <img alt="Therapist profile" className="w-full h-80 object-cover rounded-2xl shadow-xl animate-float" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpLDFczIJhbcbjvqbiRRrQhenWukwccba1e0swyb2Ihmm-h05Fj8KgJh1nMLSoZlVFgFBVoNRSN7hR_q7HoiF5J2oNmQZypjg95lOhwLmh-ODLb-KiEspPOqF2BtKD9sD_pss6TqVrUOkY2fu8CZP7c_4kXBeRR1LLw84so2VchEMONVJxkG17QqE19JNn58yMm5z4wdpYXvV4ayylB7o6oF9Zug23pibiSBwGtVjzhUXiG8RNDrLDaCkYvxMTUvWl0OcWrVCUD-Q" />
              <img alt="Ritual" className="w-full h-80 object-cover rounded-2xl shadow-xl mt-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf-Q5D_Bj1BgTrV2Hw20nrJ8JssXRDcsViZYHjW9YwoK2Ztbu43kag8DSzJ7tguC8zeomjmcIcg3tCQ6ae6EN1MNe_tn3QNLvkze0nOfxWhX22hQKWLnHeMZNqOTGsyo8GpYWjdseJKUtcRbZFIT2XIcX38phnITC_HtFP7kWpzAfDS_hIG-ePERovVu8laqD61n-PPOetZCno4SmZps852WTNquV-Fjc314M5I_TpjY4YtAnqt8C49TwzJXsMw-xjHhkU-vo5Vp8" />
            </div>
          </div>
        </div>
      </section>

      {/* AI Concierge Elowen */}
      <section className="reveal-section py-xl bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 blur-3xl bg-primary"></div>
        <div className="max-w-container-max mx-auto px-lg relative z-10 flex flex-col md:flex-row items-center gap-xl">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              {/* Orb Placeholder */}
              <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-tr from-primary to-primary-fixed border border-primary/20 flex items-center justify-center shadow-xl">
                <span className="material-symbols-outlined text-6xl text-white animate-spin" style={{ animationDuration: '10s' }}>auto_awesome</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="font-label-caps text-label-caps text-primary">MEET ELOWEN</span>
            <h2 className="font-headline-xl text-headline-xl mt-xs mb-md">Your Personal Wellness AI Concierge</h2>
            <p className="font-body-lg text-on-surface-variant mb-lg italic">"Tell me how you're feeling today, and I will curate your perfect sanctuary."</p>
            <div className="glass-card-light p-md rounded-2xl border border-primary/10 shadow-lg">
              <div className="flex gap-md mb-md">
                <div className="bg-primary/10 rounded-full px-base py-xs text-[10px] font-bold text-primary">PERSONALIZED</div>
                <div className="bg-secondary/10 rounded-full px-base py-xs text-[10px] font-bold text-secondary">ADAPTIVE</div>
              </div>
              <p className="font-body-md text-on-surface mb-md">Elowen analyzes your stress levels, skin needs, and schedule to recommend the most effective treatments in real-time.</p>
              <Link to="/cinematic">
                <button className="w-full py-md bg-primary text-white font-label-caps rounded-xl hover:bg-primary-container transition-all">
                  Chat with Elowen
                </button>
              </Link>
            </div>
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
              <p className="font-body-md italic mb-lg">"The AI concierge Elowen suggested a treatment I didn't even know I needed. It was life-changing. Pure effortless luxury."</p>
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
          <Link to="/login">
            <button className="bg-gold text-[#0a261f] px-xl py-md rounded-full font-label-caps tracking-widest hover:bg-white transition-all">
              APPLY FOR MEMBERSHIP
            </button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-[#0c1f1a]">
        <img alt="Serene wellness" className="absolute inset-0 w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKTAQq7acmtZvMetbVKrNCnRv6qkA1p-kk-SNLTeaTdiBs7q8zVS5VyI1BBPqYSVOeaEBbmm6kmEqflcBkaLYjei1dRGA-R2ICewr5ULmWphoPOadYNelGQ2aK_Oc9DrZCSIV7oDs91182i-SalSazzphnxraXFL_WHtfra1efqXenVjBbjSXMW__825rDACkXIrXXbuO-IFPxBkHmMTURD1rRzJmFARQXeh-bEA4Qch08t9ZVkisq8lfOZZ4qCvFRdDTjF9vCibs" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-lg">
          <h2 className="font-display-lg text-display-lg text-white mb-lg">Begin Your Wellness Journey Today</h2>
          <Link to="/book">
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
