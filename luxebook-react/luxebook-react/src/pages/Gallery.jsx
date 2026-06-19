import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SplitText from "../components/ui/SplitText";
import BlurText from "../components/ui/BlurText";
import SectionDivider from "../components/ui/SectionDivider";
import LuxuryBadge from "../components/ui/LuxuryBadge";

// Sample high-quality images for the gallery
const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", alt: "Luxurious Spa Pool", category: "Facilities" },
  { id: 2, src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Aromatherapy Oils", category: "Treatments" },
  { id: 3, src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Massage Therapy", category: "Treatments" },
  { id: 4, src: "https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Facial Care", category: "Aesthetics" },
  { id: 5, src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Relaxation Lounge", category: "Facilities" },
  { id: 6, src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Therapeutic Stones", category: "Treatments" },
  { id: 7, src: "https://images.unsplash.com/photo-1583416750470-965b2707b355?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Sauna Interior", category: "Facilities" },
  { id: 8, src: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Skin Care Products", category: "Aesthetics" },
  { id: 9, src: "https://images.unsplash.com/photo-1604601815764-6d0ec63e80bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Couples Massage Room", category: "Treatments" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center bg-[#050b09] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img alt="Cinematic spa background" src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover filter brightness-50" />
        </div>
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-[#050b09] via-transparent to-[#0a120f]"></div>
        
        <div className="relative z-10 text-center px-lg max-w-4xl mx-auto">
          <BlurText 
            text="VISUAL JOURNEY"
            delay={50}
            animateBy="letters"
            direction="top"
            className="font-label-caps text-label-caps text-gold tracking-[0.4em] mb-md justify-center opacity-80"
          />
          
          <SplitText
            text="Cinematic Serenity"
            className="font-display-lg text-5xl md:text-7xl text-white mb-lg drop-shadow-2xl"
            delay={40}
            duration={1.5}
            tag="h1"
          />
          
          <BlurText
            text="Immerse yourself in the elegant spaces and serene experiences that define LuxeBook. Discover our world of premium wellness in every frame."
            delay={20}
            animateBy="words"
            direction="bottom"
            className="font-body-lg text-white/70 leading-relaxed justify-center max-w-2xl mx-auto"
          />
        </div>
      </header>

      {/* Gallery Grid */}
      <section className="py-24 bg-[#0a120f] px-lg min-h-screen">
        <div className="max-w-container-max mx-auto">
          {/* Category Spotlight Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-6">
            <div>
              <LuxuryBadge variant="gold" className="mb-4">THE ARCHIVE</LuxuryBadge>
              <h2 className="font-headline-xl text-white">Curated Collections</h2>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto">
              <button className="px-6 py-2 rounded-full border border-gold text-gold font-label-caps tracking-widest text-xs whitespace-nowrap">ALL WORKS</button>
              <button className="px-6 py-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 font-label-caps tracking-widest text-xs transition-colors whitespace-nowrap">FACILITIES</button>
              <button className="px-6 py-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 font-label-caps tracking-widest text-xs transition-colors whitespace-nowrap">TREATMENTS</button>
            </div>
          </div>

          {/* Masonry Grid Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-lg space-y-lg">
            {galleryImages.map((image) => (
              <div 
                key={image.id} 
                className="relative overflow-hidden rounded-xl shadow-2xl transition-all duration-[800ms] cursor-pointer group break-inside-avoid"
                onClick={() => openLightbox(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-[1500ms] ease-out group-hover:scale-110 filter grayscale-[30%] group-hover:grayscale-0 group-hover:brightness-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-xl">
                  <span className="text-white font-headline-lg text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">{image.alt}</span>
                  <span className="text-gold font-label-caps tracking-widest text-xs mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100 ease-out">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Featured Artist / Photographer Spotlight */}
      <section className="py-32 bg-black px-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-fixed"></div>
        <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <LuxuryBadge variant="emerald" className="mb-6">FEATURED LENS</LuxuryBadge>
            <h2 className="font-headline-xl text-white mb-6">Capturing Serenity</h2>
            <p className="font-body-lg text-white/70 leading-relaxed mb-8">
              "My goal is to translate the profound silence of a spa into a visual language. The interplay of light, shadow, and texture in LuxeBook's sanctuaries provides the perfect canvas for exploring themes of renewal."
            </p>
            <div className="flex items-center gap-4">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7fOcr1RiqHPyhGTZFQwMBepNYvtmaUkz3ieE9poGufO1v7LsqtIJJKvhzEaTJf2JgyUgX-GGOFG65pm7U4ZBO7c2Kp3Op-qaQsEQrSHwaD3LzLrbWunn2W1cF8Ext4lsbpi17_fRLMDrWbbDKet0IpVGXF2l025x_hAw8LnNeWyR4-hk94RFJKFrOVYp9BTYd4jLTeU5deV_KyoJeErPHgwCL1Nzvov9pu9vldbHg-cuE2ZBQFyY-i563K9DBcjgXmCBz3hOBmGc" alt="Photographer" className="w-16 h-16 rounded-full object-cover grayscale" />
              <div>
                <p className="font-headline-md text-white">Alexander Chen</p>
                <p className="font-label-caps tracking-widest text-[10px] text-gold">RESIDENT PHOTOGRAPHER</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 border border-gold/30 rounded-full blur-[2px]"></div>
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Behind the scenes" className="rounded-full aspect-square object-cover shadow-[0_0_50px_rgba(212,175,55,0.15)]" />
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-xl transition-all duration-700" onClick={closeLightbox}>
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-all duration-500 hover:rotate-90 hover:scale-110 p-2 z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <span className="material-symbols-outlined text-4xl block font-light">close</span>
          </button>
          
          <div 
            className="relative max-w-[90vw] w-auto max-h-[90vh] flex flex-col items-center justify-center animate-fade-in"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="max-w-full max-h-[85vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)]" 
            />
            <div className="absolute bottom-[-50px] left-0 text-left w-full flex justify-between items-end">
              <div>
                <h3 className="text-white font-headline-md tracking-wide text-2xl">{selectedImage.alt}</h3>
                <p className="text-white/50 font-label-caps text-xs tracking-[0.2em] mt-2">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
