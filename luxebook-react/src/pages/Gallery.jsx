import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
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
      
      <main className="pt-32 pb-24 px-lg max-w-container-max mx-auto min-h-screen">
        {/* Header Section */}
        <header className="text-center mb-xl">
          <LuxuryBadge variant="gold" className="mb-4">VISUAL JOURNEY</LuxuryBadge>
          <BlurText 
            text="The LuxeBook Experience" 
            delay={150} 
            animateBy="words" 
            direction="top" 
            className="font-display-lg text-4xl md:text-5xl text-primary mb-4"
          />
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Immerse yourself in our world of unparalleled luxury, serenity, and bespoke aesthetics.
          </p>
        </header>

        {/* Gallery Grid */}
        <section>
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
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-xl">
                  <span className="text-white font-headline-lg text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">{image.alt}</span>
                  <span className="text-gold font-label-caps tracking-widest text-xs mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100 ease-out">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        <section className="text-center">
            <h2 className="font-headline-md text-2xl text-primary mb-4">Experience It Yourself</h2>
            <p className="text-on-surface-variant mb-6 font-body-md">Book your next visit and discover true excellence.</p>
            <button className="bg-primary text-on-primary font-label-caps tracking-widest text-xs px-8 py-4 rounded-full border border-primary/20 hover:bg-primary-container hover:text-on-primary-container hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all">
                Make a Reservation
            </button>
        </section>

      </main>

      <Footer />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-md animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-black/50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/80"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Modal Content */}
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
    </>
  );
}
