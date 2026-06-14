import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import TiltedCard from "../components/ui/TiltedCard";
import BlurText from "../components/ui/BlurText";

const SERVICES_DATA = [
  {
    id: 1,
    title: "Signature Grooming",
    price: 185,
    category: "hair",
    duration: "75 Minutes",
    description: "A bespoke haircutting experience including a private consultation, essential oil scalp treatment, and artisanal styling.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIUvrXGi_lKXZXyL4QlCVRdUwGcaulVdsk54fnqx-FnWdpY02HbTccJ3_i0-xIqOs-rUiCEEmMRlgmaeAHNtdXngoa1G1TKceLG2tgBIOSr0FjjfFvrP-IOlkKbB_mjJpJuAwUVjLuCqL9NfhsXkUydL4W6BCdwGdflbB7RU2uQ0Y11Y6wRqpb5ynC9B7bc5deWvqw2OebDhyY2Mi0SU5_GJx31mReA64Sv8tbsP4fbQYFCrZMXmEfZr905858Jws8S2sczvwzPuM",
    tag: "Popular"
  },
  {
    id: 2,
    title: "Luminous Radiance",
    price: 320,
    category: "facials",
    duration: "90 Minutes",
    description: "Advanced oxygen-infusion facial using rare botanical extracts and 24k gold leaf to restore immediate vitality and glow.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwJJny5ffqCmT3d4SqQG0c1inCbfM3DmDRPnvSubnhJOXV21nCGNZfurraz4zZJPpTRbavhvV96tmO7V6XJS_Jw46sBuiioebUQvuVs8SZXMVw6zR4r6q2nE9NXNYObgjI9hsA3Vhwrv44-rY-TxAFgvCqtZjI8nkep8Bnzk8JL06qHAyku-n2fJIR7ZJLyEzCK4ZUXTrlZy-NQ1kkqP-KPvvulU7beg3Xywrw8jn-QvqSDyGecfn5aUTGbxaP0JRyBUj-4bZ0M6s"
  },
  {
    id: 3,
    title: "Deep Sanctuary",
    price: 450,
    category: "spa",
    duration: "120 Minutes",
    description: "Our signature full-body hot stone massage combined with a private thermal suite experience and herbal rejuvenation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhw74xQy_evKeImHvzRGo7iwD4oMpg-D4aeHFjI1ouJidnsLYfYlgIGw9e4irDjDmqSPzl_ShlAvEKMkHbpdHpkkninW_jGza_tWj-AcapRCSj7MWKs80TwwFwKyPD1Hj5dtHAEK3-FPON8XxpfVGQOtWYnDIKNkKyQU0MCAxjMKPesttfLn1oI1AL5j5Dy-iZkM7lBYVQstn9w5W0yZ0dbIbyREFhoqHO8Eh8tvRc4-qKM9uOGiEdhCKUSq1A0rSm42rD0XenVB0"
  },
  {
    id: 4,
    title: "Vitality IV Infusion",
    price: 275,
    category: "wellness",
    duration: "60 Minutes",
    description: "Personalized nutrient cocktail designed to enhance cognitive function, immune support, and physical performance.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9OYbrWMo0oyl52RpAppNMbVcM5tKcdLwbD0QgjZ-mWcx7bggm4FDT1KOoIyDgGTbUnyOhQFhNrmSmZ6qNTai-Lo6FI4AnXkx1qHzdPhBKnjTZ4OrRy3olmA_TSwtBYMN-snx6NcoPgXS_V83R6ddiMU6QKaxrqACPGzj1PMy8FPKdlkCRCTCUpjiaBYC-P06ERx7P34ThUWHBGdwiFN-T5lPwVEgoBMgwY0HGSvKaOglVR-n1C8pZ97sERf3pYpWBa1Msa-Pym1w"
  },
  {
    id: 5,
    title: "Artisan Hand Ritual",
    price: 120,
    category: "spa",
    duration: "60 Minutes",
    description: "Comprehensive restoration for hands including organic clay mask, silk-infused soak, and precision nail design.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0NSeqHjUGs3GuE0afQTBOJYKv_yeNky3tA5x3IqzeNuoSTpX9_W1C1arrtc4B2QIC6E-RbRlnuRwKrjDdOqk1vXTe-DZyGpY493mTbuF-pdZd0CVS4EnfJurHIqp67gMA0B7Q6tYRlmaWlaUwHit2cjJrn-_3S7VcxROxuJ7D6d8Og2OCnB0wrYwG7BOKsU9QMSMNk5IKcBKnHeD9SFgztsOHk9xtKmtT2gzSfILinA_lJEXV2SfJ3n4cwjv_aY65sf_jRfr-C44"
  },
  {
    id: 6,
    title: "Holistic Aromatherapy",
    price: 195,
    category: "wellness",
    duration: "90 Minutes",
    description: "A sensory journey utilizing rare essential oils sourced from the French Riviera, tailored to your specific emotional needs.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB978o4MN_tTFxU83mm7NOx9gp1vPafAumDHXF01ld7nmnZK1tGr8x1KZp6taZKCoiS-g8_LuvhkxBdnA-iwgvgalHGQoidbtYWnJFWQ_yHBJbuzERQNIx_UXy86aiRyxGJqKQAZVT3xwk6LNFHvOLCmvTtoMJTdOfzQRSjxeRGMyPhBZ3TZWrtjTWnedjBR34KT2nvvf-qRgcHfnXXGOwbhWpPUzvCWoY4TnvHn-fGk4sy0Cqsm5m5lTute4PARgBZZXgrXZ98ZT4"
  }
];

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
            <span>Concierge</span>
          </Link>
          <Link className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/30 rounded-full mx-4 py-3 px-6 transition-all duration-300" to="/book">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Appointments</span>
          </Link>
          <Link className="flex items-center gap-md bg-primary text-on-primary rounded-full mx-4 py-3 px-6 shadow-md shadow-primary/20" to="/explore">
            <span className="material-symbols-outlined">explore</span>
            <span>Discover</span>
          </Link>
          <Link className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/30 rounded-full mx-4 py-3 px-6 transition-all duration-300" to="/admin/portfolio">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>Portfolio</span>
          </Link>
        </nav>
        <div className="mt-auto px-4 pb-12">
          <Link to="/book">
            <button className="w-full bg-primary-container text-on-primary-container py-4 rounded-full font-label-caps uppercase tracking-widest text-xs hover:shadow-lg transition-all duration-300 border border-tertiary-container/20">
              Book New Service
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-[120px] pb-xl px-gutter xl:pl-[320px] max-w-container-max mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-xl text-center md:text-left">
          <span className="font-label-caps text-tertiary tracking-widest uppercase mb-base block">Curated Selection</span>
          <BlurText
            text="Discover Excellence"
            delay={150}
            animateBy="words"
            direction="top"
            className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-md"
          />
          <p className="font-body-lg text-on-surface-variant max-w-2xl">Refined services tailored for the discerning individual. From bespoke grooming to holistic wellness, explore our private collection.</p>
        </header>

        {/* Sticky Category Filters */}
        <section className="mb-lg sticky top-[90px] z-30">
          <div className="flex items-center gap-sm overflow-x-auto pb-4 no-scrollbar">
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
            <Link to="/book" key={service.id} className="block">
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
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white/90 dark:bg-black/80 backdrop-blur-xl border-t border-secondary/10 flex justify-around items-center py-4 z-50">
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant" to="/home">
          <span className="material-symbols-outlined">diamond</span>
          <span className="text-[10px] font-label-caps">Concierge</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant" to="/book">
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
