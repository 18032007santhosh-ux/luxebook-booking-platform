import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import TiltedCard from "../components/ui/TiltedCard";
import BlurText from "../components/ui/BlurText";
import SpotlightCard from "../components/ui/SpotlightCard";
import LuxuryBackground from "../components/ui/LuxuryBackground";
import { Player } from "@remotion/player";
import { PerspectiveMarquee } from "../components/ui/PerspectiveMarquee";
import LuxuryBadge from "../components/ui/LuxuryBadge";
import SectionDivider from "../components/ui/SectionDivider";
import GlassInfoCard from "../components/ui/GlassInfoCard";

import { SERVICES_DATA } from "../data/services";

export default function ExploreServices() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredServices = selectedCategory === "all"
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === selectedCategory);

  return (
    <>
      <Navbar />

      {/* Side Navigation (Desktop Drawer) */}
      <aside className="fixed left-0 top-0 h-full w-72 z-40 bg-white/80 dark:bg-black/20 backdrop-blur-2xl border-r border-secondary/20 shadow-2xl hidden xl:flex flex-col gap-sm py-lg mt-[80px]">
        <div className="px-lg mb-lg">
          <h2 className="font-headline-md text-headline-md text-primary">Welcome, Excellence</h2>
          <p className="font-body-sm text-on-surface-variant">Your private concierge awaits</p>
        </div>
        <nav className="flex flex-col gap-xs">
          <Link className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/30 rounded-full mx-4 py-3 px-6 transition-all duration-300" to="/home">
            <span className="material-symbols-outlined">diamond</span>
            <span>Home</span>
          </Link>
          <Link className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/30 rounded-full mx-4 py-3 px-6 transition-all duration-300" to="/appointments">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Appointments</span>
          </Link>
          <Link className="flex items-center gap-md bg-primary text-on-primary rounded-full mx-4 py-3 px-6 shadow-md shadow-primary/20" to="/explore">
            <span className="material-symbols-outlined">explore</span>
            <span>Discover</span>
          </Link>
          <Link className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/30 rounded-full mx-4 py-3 px-6 transition-all duration-300" to="/customer-portfolio">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>Portfolio</span>
          </Link>
        </nav>
        <div className="mt-auto px-4 pb-12">
          <Link to="/appointments">
            <button className="w-full bg-primary-container text-on-primary-container py-4 rounded-full font-label-caps uppercase tracking-widest text-xs hover:shadow-lg transition-all duration-300 border border-tertiary-container/20">
              Book New Service
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-[120px] pb-xl px-gutter xl:pl-[320px] max-w-container-max mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-xl">
          <SpotlightCard className="w-full min-h-[300px] md:min-h-[350px] p-0 rounded-3xl border border-secondary/20 shadow-2xl relative flex items-center" spotlightColor="rgba(212, 175, 55, 0.2)">
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 mix-blend-screen pointer-events-none">
              <LuxuryBackground intensity="normal" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent z-0 pointer-events-none"></div>

            <div className="relative z-10 w-full p-8 md:p-12 text-center md:text-left">
              <span className="font-label-caps text-tertiary tracking-widest uppercase mb-base block drop-shadow-md">Curated Selection</span>
              <BlurText
                text="Discover Excellence"
                delay={150}
                animateBy="words"
                direction="top"
                className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-md drop-shadow-lg"
              />
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto md:mx-0 drop-shadow-sm">Refined services tailored for the discerning individual. From bespoke grooming to holistic wellness, explore our private collection.</p>
            </div>
          </SpotlightCard>
        </header>

        {/* Featured Collections Banner */}
        <section className="mb-xl">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[250px] group">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Featured Collection" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A15]/90 via-[#0A1A15]/60 to-transparent"></div>
            <div className="absolute inset-0 p-10 flex flex-col justify-center">
              <LuxuryBadge variant="gold" className="self-start mb-4">SEASONAL EXCLUSIVE</LuxuryBadge>
              <h3 className="font-display-lg text-3xl text-white mb-2 drop-shadow-md">The Rebirth Collection</h3>
              <p className="text-white/80 max-w-md font-body-md drop-shadow-sm mb-6">A curated suite of treatments designed to renew vitality for the upcoming season.</p>
              <button className="self-start text-gold font-label-caps tracking-widest text-xs hover:text-white transition-colors border-b border-gold/30 hover:border-white pb-1">EXPLORE COLLECTION</button>
            </div>
          </div>
        </section>

        {/* Perspective Marquee Filter Bar */}
        <section className="mb-lg sticky top-[90px] z-30 relative overflow-hidden rounded-full border border-secondary/20 bg-surface/80 backdrop-blur-xl shadow-lg">
          {/* Marquee Background */}
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen">
            <Player
              component={() => (
                <PerspectiveMarquee
                  items={["All Experience", "Artisan Hair", "Advanced Facial", "Sanctuary Spa", "Wellness & Vitality"]}
                  rotateY={-15}
                  rotateX={5}
                  perspective={1000}
                  pixelsPerFrame={1}
                  background="transparent"
                  fadeColor="#0a0a0a"
                  color="#d4af37"
                  fontSize={40}
                />
              )}
              durationInFrames={240}
              fps={30}
              compositionWidth={1280}
              compositionHeight={80}
              style={{ width: "100%", height: "100%" }}
              controls={false}
              autoPlay
              loop
              clickToPlay={false}
            />
          </div>

          <div className="relative z-10 flex items-center gap-sm overflow-x-auto p-4 md:px-6 no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-8 py-3 rounded-full font-body-md border border-outline-variant/20 whitespace-nowrap transition-all glass-card ${selectedCategory === "all" ? "active-filter" : "text-on-surface-variant hover:bg-surface-container"}`}
            >
              All Experiences
            </button>
            <button
              onClick={() => setSelectedCategory("hair")}
              className={`px-8 py-3 rounded-full font-body-md border border-outline-variant/20 whitespace-nowrap transition-all glass-card ${selectedCategory === "hair" ? "active-filter" : "text-on-surface-variant hover:bg-surface-container"}`}
            >
              Artisan Hair
            </button>
            <button
              onClick={() => setSelectedCategory("facials")}
              className={`px-8 py-3 rounded-full font-body-md border border-outline-variant/20 whitespace-nowrap transition-all glass-card ${selectedCategory === "facials" ? "active-filter" : "text-on-surface-variant hover:bg-surface-container"}`}
            >
              Advanced Facials
            </button>
            <button
              onClick={() => setSelectedCategory("spa")}
              className={`px-8 py-3 rounded-full font-body-md border border-outline-variant/20 whitespace-nowrap transition-all glass-card ${selectedCategory === "spa" ? "active-filter" : "text-on-surface-variant hover:bg-surface-container"}`}
            >
              Sanctuary Spa
            </button>
            <button
              onClick={() => setSelectedCategory("wellness")}
              className={`px-8 py-3 rounded-full font-body-md border border-outline-variant/20 whitespace-nowrap transition-all glass-card ${selectedCategory === "wellness" ? "active-filter" : "text-on-surface-variant hover:bg-surface-container"}`}
            >
              Wellness &amp; Vitality
            </button>
          </div>
        </section>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg place-items-center">
          {filteredServices.map(service => (
            <Link to={`/appointments/${service.id}`} key={service.id} className="block group">
              <TiltedCard
                imageSrc={service.image}
                altText={service.title}
                captionText={`${service.title} — $${service.price}`}
                containerHeight="350px"
                containerWidth="300px"
                imageHeight="350px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.15}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="tilted-card-overlay-content">
                    {service.tag && (
                      <span className="service-tag">{service.tag}</span>
                    )}
                    <span className="service-duration">{service.duration}</span>
                    <span className="service-title">{service.title}</span>
                    <span className="service-price">${service.price}</span>
                  </div>
                }
              />
            </Link>
          ))}
        </div>

        <SectionDivider />

        {/* Expert Recommendations & Frequently Booked Together */}
        <section className="mt-8 mb-xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassInfoCard 
            title="Expert Recommendations" 
            icon="psychiatry"
            content="Our master therapists suggest pairing the Sculpting Facial with the Deep Ritual Massage for a complete holistic reset."
          >
            <div className="mt-6 flex items-center gap-4 border-t border-gold/10 pt-4">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7fOcr1RiqHPyhGTZFQwMBepNYvtmaUkz3ieE9poGufO1v7LsqtIJJKvhzEaTJf2JgyUgX-GGOFG65pm7U4ZBO7c2Kp3Op-qaQsEQrSHwaD3LzLrbWunn2W1cF8Ext4lsbpi17_fRLMDrWbbDKet0IpVGXF2l025x_hAw8LnNeWyR4-hk94RFJKFrOVYp9BTYd4jLTeU5deV_KyoJeErPHgwCL1Nzvov9pu9vldbHg-cuE2ZBQFyY-i563K9DBcjgXmCBz3hOBmGc" alt="Expert" className="w-12 h-12 rounded-full object-cover grayscale" />
              <div>
                <p className="font-headline-md text-sm text-primary">Dr. Evelyn Hayes</p>
                <p className="font-label-caps text-[10px] text-on-surface-variant">HEAD OF WELLNESS</p>
              </div>
            </div>
          </GlassInfoCard>

          <GlassInfoCard 
            title="The Luxe Guarantee" 
            icon="verified"
            content="Every experience is backed by our promise of perfection. If your treatment does not exceed expectations, your next visit is complimentary."
          >
            <div className="mt-6 flex flex-wrap gap-2 border-t border-gold/10 pt-4">
              <span className="text-[10px] font-label-caps tracking-widest px-2 py-1 bg-surface-variant rounded text-on-surface-variant">CLINICALLY PROVEN</span>
              <span className="text-[10px] font-label-caps tracking-widest px-2 py-1 bg-surface-variant rounded text-on-surface-variant">ORGANIC BOTANICALS</span>
              <span className="text-[10px] font-label-caps tracking-widest px-2 py-1 bg-surface-variant rounded text-on-surface-variant">DISCREET SERVICE</span>
            </div>
          </GlassInfoCard>
        </section>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white/90 dark:bg-black/80 backdrop-blur-xl border-t border-secondary/10 flex justify-around items-center py-4 z-50">
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant" to="/home">
          <span className="material-symbols-outlined">diamond</span>
          <span className="text-[10px] font-label-caps">Concierge</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant" to="/appointments">
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="text-[10px] font-label-caps">Bookings</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-primary" to="/explore">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          <span className="text-[10px] font-label-caps">Discover</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant" to="/login">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px] font-label-caps">Profile</span>
        </Link>
      </nav>

      {/* FAB AI Chat */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 md:flex hidden group">
        <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">chat</span>
        <div className="absolute right-full mr-4 bg-white text-on-surface px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-xl transition-opacity pointer-events-none">
          Speak with Concierge
        </div>
      </button>
    </>
  );
}
