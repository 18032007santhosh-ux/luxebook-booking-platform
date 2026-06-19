import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SplitText from "../components/ui/SplitText";
import BlurText from "../components/ui/BlurText";
import { membershipService } from "../services/membershipService";
import { useAuth } from "../contexts/AuthContext";

const MEMBERSHIP_TIERS = [
  {
    id: "signature",
    name: "Signature Club",
    price: "$5,000 / year",
    description: "The foundation of luxury wellness. Priority access to all LuxeBook facilities.",
    color: "from-surface-container-high to-surface-variant",
    accent: "text-primary",
    benefits: [
      "Priority Booking Access",
      "Complimentary Valet Parking",
      "Access to Signature Lounges",
      "2 Guest Passes Annually"
    ]
  },
  {
    id: "gold",
    name: "Gold Reserve",
    price: "$15,000 / year",
    description: "Elevated access with tailored treatments and wellness consultations.",
    color: "from-primary/10 to-primary/5 border border-primary/20",
    accent: "text-gold",
    isPopular: true,
    benefits: [
      "All Signature Benefits",
      "1 Complimentary Treatment Monthly",
      "Quarterly Wellness Consultations",
      "Access to Private Gold Suites",
      "5 Guest Passes Annually"
    ]
  },
  {
    id: "onyx",
    name: "Onyx Elite",
    price: "By Invitation",
    description: "The pinnacle of private service. Unlimited access and a dedicated concierge.",
    color: "from-black to-surface-container-highest border border-white/10",
    accent: "text-white",
    benefits: [
      "All Gold Benefits",
      "Dedicated Private Concierge 24/7",
      "Unlimited Access to Premium Amenities",
      "Exclusive Event Invitations",
      "Private Chauffeur Service (Local)"
    ]
  }
];

export default function Membership() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSelectTier = (tier) => {
    membershipService.setPendingMembership(tier);
    console.log("[Membership] Apply clicked", { isAuthenticated });
    
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          redirectTo: "/membership/confirm"
        }
      });
      return;
    }

    navigate("/membership/confirm");
  };

  const scrollToTiers = () => {
    document.getElementById("tiers-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-lg overflow-hidden min-h-[60vh] flex items-center bg-black">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDatAhjz_se5P1nl9ve0QvIJnHdKinl90J7ACa55YB6Tm2NYauGpM91dqokAKq99Ovl0W4BjweGEkX70oKdZP4uIo2sBEmStwZeq5bnjQ5zHwuDCBpRWukG6gjXtqcE0zwNrdY8_dGhQOK4hndH7XsQ5nexeHR1lfmRBsgajQf31rTjFWsjzGS-LBYYA_CB06WEOpluvyV3ESluppET30JmpvZ3cHHlwwebe-2Ststk32heCi728d_PHhqWOqi1rWQ_qf3tzpAWEMs"
              alt="Luxury Membership"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-surface"></div>
          </div>

          <div className="relative z-10 max-w-container-max mx-auto w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="font-label-caps text-gold tracking-widest text-sm mb-4 block">THE INNER CIRCLE</span>
              <div className="mb-6">
                <SplitText
                  text="Exclusive Access."
                  className="font-display-lg text-white text-5xl md:text-7xl mb-2 drop-shadow-2xl font-bold"
                  delay={50}
                />
                <SplitText
                  text="Unparalleled Service."
                  className="font-display-lg text-white/90 text-4xl md:text-6xl drop-shadow-2xl"
                  delay={50}
                />
              </div>
              
              <BlurText
                text="Join an elite community of individuals who demand the highest standard of wellness and privacy. Discover the LuxeBook membership tiers below."
                className="font-body-lg text-white/80 max-w-2xl mx-auto mb-10"
                delay={20}
              />

              <div className="flex justify-center gap-4">
                <button onClick={scrollToTiers} className="bg-primary text-on-primary font-label-caps px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all">
                  Apply Now
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Membership Tiers */}
        <section id="tiers-section" className="py-24 px-lg bg-surface relative">
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-headline-xl text-primary mb-4">Membership Tiers</h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Select the level of access that suits your lifestyle. Each tier is meticulously crafted to provide exceptional value and unparalleled service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MEMBERSHIP_TIERS.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative rounded-[32px] p-8 flex flex-col h-full bg-gradient-to-br ${tier.color} shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500`}
                >
                  {tier.isPopular && (
                    <div className="absolute top-0 right-8 bg-gold text-white font-label-caps text-[10px] px-4 py-1 rounded-b-lg shadow-md z-10 tracking-widest">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="mb-8 z-10">
                    <h3 className={`font-headline-lg text-3xl mb-2 ${tier.accent}`}>{tier.name}</h3>
                    <div className={`font-display-md text-2xl mb-4 ${tier.accent}`}>{tier.price}</div>
                    <p className="text-on-surface-variant text-sm h-12">{tier.description}</p>
                  </div>

                  <div className="flex-1 z-10">
                    <div className="h-px w-full bg-outline-variant/30 mb-6"></div>
                    <ul className="space-y-4 mb-8">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className={`material-symbols-outlined text-[20px] ${tier.accent}`}>check_circle</span>
                          <span className="text-on-surface-variant text-sm leading-tight pt-0.5">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto z-10">
                    <button 
                      onClick={() => handleSelectTier(tier)}
                      className={`w-full py-4 rounded-xl font-label-caps tracking-widest transition-all ${
                        tier.id === "onyx" 
                          ? "bg-white text-black hover:bg-white/90" 
                          : "bg-primary-container text-white hover:bg-primary"
                      }`}
                    >
                      {tier.id === "onyx" ? "Request Invitation" : "Select Tier"}
                    </button>
                  </div>
                  
                  {/* Subtle hover glow effect behind the card content */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 z-0"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The LuxeBook Advantage */}
        <section className="py-24 px-lg bg-surface-container-low border-t border-outline-variant/20">
          <div className="max-w-container-max mx-auto text-center">
            <span className="font-label-caps text-primary tracking-widest text-sm mb-4 block">WHY LUXEBOOK</span>
            <h2 className="font-headline-xl text-on-surface mb-16">The LuxeBook Advantage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/20">
                  <span className="material-symbols-outlined text-3xl">diamond</span>
                </div>
                <h3 className="font-headline-md text-xl mb-3 text-primary">Unrivaled Quality</h3>
                <p className="text-on-surface-variant max-w-sm text-center">
                  Access to world-renowned therapists, premium amenities, and proprietary wellness treatments available nowhere else.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/20">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <h3 className="font-headline-md text-xl mb-3 text-primary">Absolute Privacy</h3>
                <p className="text-on-surface-variant max-w-sm text-center">
                  Our facilities are designed to ensure complete discretion. Private entrances and secluded suites guarantee your peace of mind.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/20">
                  <span className="material-symbols-outlined text-3xl">support_agent</span>
                </div>
                <h3 className="font-headline-md text-xl mb-3 text-primary">White-Glove Service</h3>
                <p className="text-on-surface-variant max-w-sm text-center">
                  From booking to departure, our dedicated concierge team anticipates your needs to provide a seamless, stress-free experience.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Member Testimonials */}
        <section className="py-24 px-lg bg-surface border-t border-outline-variant/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline-xl text-primary mb-12">Whispers from the Inner Circle</h2>
            <div className="glass-card p-12 rounded-[2rem] border border-gold/20 shadow-2xl relative">
              <span className="material-symbols-outlined text-6xl text-gold/20 absolute top-8 left-8">format_quote</span>
              <p className="font-headline-md text-2xl italic text-on-surface-variant leading-relaxed mb-8 relative z-10">
                "Upgrading to the Gold Reserve membership was the best investment in my personal wellbeing. The quarterly consultations and private suites have completely transformed my approach to self-care."
              </p>
              <div className="flex flex-col items-center gap-2">
                <span className="font-label-caps tracking-widest text-primary">VICTORIA C.</span>
                <span className="text-xs text-gold font-label-caps">MEMBER SINCE 2024</span>
              </div>
            </div>
          </div>
        </section>

        {/* Invitation Only & Concierge */}
        <section className="relative py-32 px-lg overflow-hidden bg-black text-center border-t border-gold/30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-gold text-5xl mb-6">vpn_key</span>
            <h2 className="font-display-lg text-4xl md:text-5xl text-white mb-6">Onyx Elite</h2>
            <p className="font-body-lg text-white/70 leading-relaxed mb-10">
              Our most exclusive tier is available strictly by invitation. It grants access to off-menu services, private home visits from master therapists, and a dedicated 24/7 wellness attaché.
            </p>
            <button className="bg-transparent border border-gold text-gold px-10 py-4 rounded-full font-label-caps tracking-widest hover:bg-gold hover:text-black transition-colors">
              INQUIRE ABOUT ONYX
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
