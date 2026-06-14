import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import { SERVICES_DATA } from "../data/services";
import LuxuryBadge from "../components/ui/LuxuryBadge";
import GlassInfoCard from "../components/ui/GlassInfoCard";
import { authService } from "../services/authService";

export default function CalendarBooking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Find selected service
  const service = serviceId ? SERVICES_DATA.find(s => s.id === parseInt(serviceId)) : null;

  // Read passed state
  const passedState = location.state || {};
  const initialDate = passedState.selectedDate ? new Date(passedState.selectedDate) : new Date(2024, 9, 4); // Default to Oct 4, 2024 if not passed
  const initialStep = passedState.selectedDate ? 2 : 1;

  // Wizard State
  const [step, setStep] = useState(initialStep);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [guestDetails, setGuestDetails] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Empty State if no service selected
  if (!serviceId || !service) {
    return (
      <>
        <Navbar />
        <div className="flex-1 pt-32 pb-24 max-w-container-max mx-auto w-full px-lg min-h-screen flex flex-col items-center justify-center">
          <div className="text-center max-w-2xl">
            <span className="material-symbols-outlined text-[64px] text-tertiary mb-md">spa</span>
            <h1 className="font-headline-xl text-primary mb-md">Book Your Wellness Experience</h1>
            <p className="font-body-lg text-on-surface-variant mb-xl">
              Choose from our curated collection of luxury spa services to begin your booking journey. Each experience is uniquely tailored to your well-being.
            </p>
            <Link to="/explore">
              <button className="px-10 py-4 bg-primary text-on-primary rounded-full font-label-caps uppercase tracking-widest hover:bg-emerald-green transition-colors shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 duration-300">
                Browse Services
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGuestChange = (e) => {
    setGuestDetails({ ...guestDetails, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    console.log("[Booking Flow] Button clicked: Starting confirmation process");
    setIsSubmitting(true);
    console.log("[Booking Flow] State updated: isSubmitting set to true");
    
    try {
      console.log("[Booking Flow] Form validation: Checking required fields");
      if (!service || !selectedDate || !selectedSlot || !guestDetails.name || !guestDetails.email) {
        throw new Error("Missing required booking details");
      }
      
      const bookingId = `LB-${Math.floor(10000 + Math.random() * 90000)}`;
      const day = selectedDate.getDate();
      const month = selectedDate.toLocaleString('default', { month: 'long' });
      const year = selectedDate.getFullYear();
      const weekday = selectedDate.toLocaleString('default', { weekday: 'long' });
      
      const newBooking = {
        bookingId,
        serviceId: service.id,
        serviceName: service.title,
        duration: service.duration,
        price: service.price,
        date: `${weekday}, ${month} ${day < 10 ? `0${day}` : day}, ${year}`,
        time: selectedSlot,
        customerName: guestDetails.name,
        customerEmail: guestDetails.email,
        customerPhone: guestDetails.phone,
        status: "Confirmed",
        timestamp: new Date().toISOString()
      };

      console.log("[Booking Flow] API call: Simulating network request to save booking");
      
      // Simulate API call with 15-second timeout protection
      const apiCall = new Promise((resolve) => setTimeout(() => resolve(newBooking), 1500));
      const timeoutCall = new Promise((_, reject) => setTimeout(() => reject(new Error("API Timeout")), 15000));
      
      const savedBooking = await Promise.race([apiCall, timeoutCall]);
      console.log("[Booking Flow] API call successful", savedBooking);

      console.log("[Booking Flow] Database write: Saving to localStorage");
      const user = authService.getCurrentUser();
      const storageKey = user ? `luxebook_reservations_${user.id}` : "luxebook_reservations";
      const existingBookings = JSON.parse(localStorage.getItem(storageKey) || "[]");
      localStorage.setItem(storageKey, JSON.stringify([savedBooking, ...existingBookings]));
      console.log("[Booking Flow] Database write successful");

      console.log("[Booking Flow] Success callback: Executing navigation");
      console.log("[Booking Flow] Navigation: Redirecting to /confirmed");
      navigate("/confirmed");
    } catch (error) {
      console.error("[Booking Flow] Error handler: Booking confirmation failed", error);
      alert("Booking failed: " + error.message);
    } finally {
      console.log("[Booking Flow] State updated: isSubmitting set to false");
      setIsSubmitting(false);
    }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  return (
    <>
      <Navbar />

      <div className="flex-1 pt-24 pb-32 max-w-container-max mx-auto w-full px-lg mt-md">
        
        {/* Stepper Progress Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl border-b border-secondary/10 pb-6 gap-md">
          <div className="flex flex-col">
            <h1 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">Private Reservation</h1>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">{service.title}</span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {[
              { num: 1, label: "Service" },
              { num: 2, label: "Schedule" },
              { num: 3, label: "Guest" },
              { num: 4, label: "Confirm" }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className={`flex items-center gap-2 ${step === s.num ? "text-primary font-semibold" : step > s.num ? "text-emerald-green" : "text-on-surface-variant/40"}`}>
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-label-caps text-[10px] transition-colors duration-500 ${step === s.num ? "border-primary bg-primary/5" : step > s.num ? "border-emerald-green bg-emerald-green/10" : "border-current"}`}>
                    {step > s.num ? <span className="material-symbols-outlined text-[14px]">check</span> : s.num}
                  </span>
                  <span className="font-label-caps uppercase text-[10px] whitespace-nowrap">{s.label}</span>
                </div>
                {idx < 3 && <div className={`w-4 sm:w-8 h-[2px] transition-colors duration-500 ${step > s.num ? "bg-emerald-green/50" : "bg-secondary/10"}`}></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="min-h-[500px] relative">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SERVICE DETAILS */}
            {step === 1 && (
              <motion.div key="step1" {...pageTransition} className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
                <div className="lg:col-span-7">
                  <div className="rounded-[24px] overflow-hidden shadow-2xl relative h-[400px] lg:h-[500px]">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-lg w-full">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white font-label-caps text-[10px] tracking-widest uppercase border border-white/30 mb-sm inline-block">
                        {service.category}
                      </span>
                      <h2 className="text-white font-display-md text-4xl mb-sm">{service.title}</h2>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col justify-center glass-card p-xl rounded-[24px]">
                  <h3 className="font-headline-md text-primary mb-md text-2xl">Service Overview</h3>
                  <p className="font-body-lg text-on-surface-variant leading-relaxed mb-lg">
                    {service.description}
                  </p>
                  
                  <div className="space-y-4 mb-xl">
                    <div className="flex items-center justify-between p-md bg-surface-container-low rounded-xl border border-outline-variant/20">
                      <div className="flex items-center gap-sm text-on-surface-variant">
                        <span className="material-symbols-outlined">schedule</span>
                        <span className="font-body-md">Duration</span>
                      </div>
                      <span className="font-semibold text-primary">{service.duration}</span>
                    </div>
                    <div className="flex items-center justify-between p-md bg-surface-container-low rounded-xl border border-outline-variant/20">
                      <div className="flex items-center gap-sm text-on-surface-variant">
                        <span className="material-symbols-outlined">payments</span>
                        <span className="font-body-md">Price</span>
                      </div>
                      <span className="font-semibold text-primary">${service.price}.00</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleNextStep}
                    className="w-full py-4 bg-primary text-white rounded-full font-label-caps uppercase tracking-widest hover:bg-emerald-green transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-sm"
                  >
                    Select Date & Time <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DATE & TIME */}
            {step === 2 && (
              <motion.div key="step2" {...pageTransition} className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
                <div className="lg:col-span-7">
                  <div className="glass-card rounded-[24px] p-lg flex flex-col h-full shadow-lg border border-outline-variant/20">
                    <div className="flex justify-between items-center mb-lg">
                      <h2 className="font-headline-lg text-primary text-2xl">Select Date</h2>
                      <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-primary hover:bg-secondary/5 transition-colors">
                          <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <h3 className="font-headline-md text-primary flex items-center px-4">
                          {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </h3>
                        <button className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-primary hover:bg-secondary/5 transition-colors">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
                        <div key={day} className="text-center font-label-caps text-[11px] text-on-surface-variant tracking-wider py-2">{day}</div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-y-6 gap-x-2 flex-1 items-start">
                      <div className="p-2 text-on-surface-variant/30 flex justify-center py-4">29</div>
                      <div className="p-2 text-on-surface-variant/30 flex justify-center py-4">30</div>
                      
                      {[...Array(31)].map((_, index) => {
                        const day = index + 1;
                        const isSelectable = day % 4 !== 0; // Simulate some unavailable days
                        const isSelected = selectedDate.getDate() === day;
                        return (
                          <div 
                            key={day}
                            onClick={() => isSelectable && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                            className={`flex flex-col items-center justify-center w-12 h-12 mx-auto rounded-full cursor-pointer transition-all duration-300 relative group
                              ${!isSelectable ? "text-on-surface-variant/30 cursor-not-allowed" : "hover:bg-primary/5"}
                              ${isSelected ? "bg-primary text-white shadow-lg scale-110 hover:bg-primary" : "text-on-surface"}
                            `}
                          >
                            <span className="font-medium text-sm z-10">{day}</span>
                            {isSelectable && !isSelected && (
                              <div className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-green/40 group-hover:bg-emerald-green transition-colors"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-md">
                  <div className="glass-card rounded-[24px] p-lg flex flex-col h-full shadow-lg border border-outline-variant/20">
                    <div className="mb-6 border-b border-outline-variant/20 pb-4">
                      <h3 className="font-headline-md text-primary text-xl">Available Times</h3>
                      <p className="font-body-sm text-on-surface-variant">
                        {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                      {/* Morning */}
                      <div className="space-y-3">
                        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Morning Focus</p>
                        <div className="grid grid-cols-2 gap-3">
                          {["09:00 AM", "10:30 AM", "11:45 AM"].map(time => (
                            <button 
                              key={time}
                              onClick={() => setSelectedSlot(time)}
                              className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium
                                ${selectedSlot === time ? "bg-primary text-white border-primary shadow-md" : "border-secondary/20 hover:border-primary text-on-surface hover:bg-primary/5"}
                              `}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Afternoon */}
                      <div className="space-y-3">
                        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Afternoon Retreat</p>
                        <div className="grid grid-cols-2 gap-3">
                          {["01:00 PM", "02:30 PM", "04:00 PM"].map(time => (
                            <button 
                              key={time}
                              onClick={() => setSelectedSlot(time)}
                              className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium
                                ${selectedSlot === time ? "bg-primary text-white border-primary shadow-md" : "border-secondary/20 hover:border-primary text-on-surface hover:bg-primary/5"}
                              `}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Evening */}
                      <div className="space-y-3">
                        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Evening Sanctuary</p>
                        <div className="grid grid-cols-2 gap-3">
                          {["06:00 PM", "07:30 PM"].map(time => (
                            <button 
                              key={time}
                              onClick={() => setSelectedSlot(time)}
                              className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium
                                ${selectedSlot === time ? "bg-primary text-white border-primary shadow-md" : "border-secondary/20 hover:border-primary text-on-surface hover:bg-primary/5"}
                              `}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: GUEST DETAILS */}
            {step === 3 && (
              <motion.div key="step3" {...pageTransition} className="max-w-3xl mx-auto">
                <div className="glass-card rounded-[24px] p-xl shadow-xl border border-outline-variant/20">
                  <div className="text-center mb-xl">
                    <h2 className="font-headline-lg text-primary text-3xl mb-2">Guest Information</h2>
                    <p className="font-body-md text-on-surface-variant">Please provide your details so we can prepare your exclusive experience.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="relative group">
                      <input 
                        type="text" 
                        name="name" 
                        value={guestDetails.name} 
                        onChange={handleGuestChange} 
                        id="name" 
                        className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-outline-variant/30 text-primary font-medium text-lg peer focus:ring-0 focus:outline-none focus:border-primary transition-colors" 
                        placeholder=" " 
                      />
                      <label htmlFor="name" className="absolute text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-primary font-label-caps tracking-widest text-xs uppercase">
                        Full Name
                      </label>
                    </div>

                    <div className="relative group">
                      <input 
                        type="email" 
                        name="email" 
                        value={guestDetails.email} 
                        onChange={handleGuestChange} 
                        id="email" 
                        className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-outline-variant/30 text-primary font-medium text-lg peer focus:ring-0 focus:outline-none focus:border-primary transition-colors" 
                        placeholder=" " 
                      />
                      <label htmlFor="email" className="absolute text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-primary font-label-caps tracking-widest text-xs uppercase">
                        Email Address
                      </label>
                    </div>

                    <div className="relative group">
                      <input 
                        type="tel" 
                        name="phone" 
                        value={guestDetails.phone} 
                        onChange={handleGuestChange} 
                        id="phone" 
                        className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-outline-variant/30 text-primary font-medium text-lg peer focus:ring-0 focus:outline-none focus:border-primary transition-colors" 
                        placeholder=" " 
                      />
                      <label htmlFor="phone" className="absolute text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-primary font-label-caps tracking-widest text-xs uppercase">
                        Phone Number
                      </label>
                    </div>
                    
                    <div className="pt-6">
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-1">
                          <input type="checkbox" className="peer w-5 h-5 appearance-none rounded border border-outline-variant checked:bg-primary checked:border-primary transition-all" />
                          <span className="material-symbols-outlined absolute text-white text-[16px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">check</span>
                        </div>
                        <span className="font-body-sm text-on-surface-variant leading-relaxed group-hover:text-primary transition-colors">
                          I have read and agree to the <span className="underline decoration-outline-variant/50 underline-offset-4">Terms of Service</span> and <span className="underline decoration-outline-variant/50 underline-offset-4">Cancellation Policy</span>.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REVIEW & CONFIRM */}
            {step === 4 && (
              <motion.div key="step4" {...pageTransition} className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
                <div className="lg:col-span-7 flex flex-col gap-md">
                  <div className="glass-card rounded-[24px] p-lg border border-outline-variant/20 shadow-lg">
                    <h3 className="font-headline-md text-primary text-xl mb-md border-b border-outline-variant/10 pb-4">Itinerary Summary</h3>
                    
                    <div className="flex gap-md mb-lg items-center">
                      <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-label-caps text-[10px] text-tertiary uppercase tracking-widest">{service.category}</span>
                        <h4 className="font-headline-sm text-primary text-lg">{service.title}</h4>
                        <p className="font-body-sm text-on-surface-variant">{service.duration} Session</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-md bg-surface-container-low p-md rounded-xl mb-lg border border-outline-variant/10">
                      <div>
                        <span className="block font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Date</span>
                        <span className="font-body-md font-semibold text-primary">
                          {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <div>
                        <span className="block font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Time</span>
                        <span className="font-body-md font-semibold text-primary">{selectedSlot}</span>
                      </div>
                    </div>

                    <h3 className="font-headline-md text-primary text-xl mb-md border-b border-outline-variant/10 pb-4 mt-lg">Guest Profile</h3>
                    <div className="space-y-3 bg-surface-container-low p-md rounded-xl border border-outline-variant/10">
                      <div className="flex justify-between">
                        <span className="font-body-sm text-on-surface-variant">Name</span>
                        <span className="font-body-sm font-semibold text-primary">{guestDetails.name || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body-sm text-on-surface-variant">Email</span>
                        <span className="font-body-sm font-semibold text-primary">{guestDetails.email || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body-sm text-on-surface-variant">Phone</span>
                        <span className="font-body-sm font-semibold text-primary">{guestDetails.phone || "N/A"}</span>
                      </div>
                    </div>

                    {/* Enhancements layered here */}
                    <div className="mt-8">
                      <GlassInfoCard 
                        title="Preparation Guide" 
                        icon="self_care"
                        content="We recommend arriving 30 minutes prior to your scheduled time to fully immerse in the thermal suites before your treatment begins. Robes and slippers will be provided."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-5 flex flex-col gap-md">
                  <div className="glass-card rounded-[24px] p-xl border border-primary/20 shadow-xl bg-gradient-to-b from-surface to-surface-container-low">
                    <h3 className="font-headline-md text-primary text-2xl mb-lg text-center">Payment Details</h3>
                    
                    <div className="space-y-4 mb-lg">
                      <div className="flex justify-between text-body-md">
                        <span className="text-on-surface-variant">Service Rate</span>
                        <span className="font-medium text-primary">${service.price}.00</span>
                      </div>
                      <div className="flex justify-between text-body-md">
                        <span className="text-on-surface-variant">Taxes &amp; Fees</span>
                        <span className="font-medium text-primary">${Math.round(service.price * 0.08)}.00</span>
                      </div>
                      <div className="h-[1px] bg-outline-variant/30 my-4"></div>
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-primary">Total Amount</span>
                        <span className="text-emerald-green">${service.price + Math.round(service.price * 0.08)}.00</span>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-md mb-xl border border-primary/10">
                      <div className="flex gap-3">
                        <span className="material-symbols-outlined text-primary">info</span>
                        <p className="font-body-sm text-on-surface-variant text-sm">
                          Payment will be collected at the concierge desk upon arrival. A card is not required to secure this reservation.
                        </p>
                      </div>
                    </div>

                    {/* Trust Badges & Cancellation */}
                    <div className="mb-6 space-y-4">
                      <div className="flex justify-between items-center bg-surface-variant p-4 rounded-xl border border-outline-variant/10">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-emerald-green">verified</span>
                          <span className="font-body-md text-sm text-on-surface">SSL Secure Booking</span>
                        </div>
                        <LuxuryBadge variant="emerald" className="!px-2 !py-0.5 !text-[8px]">VERIFIED</LuxuryBadge>
                      </div>
                      
                      <div className="flex gap-3 items-start border-l-2 border-gold/30 pl-4 py-1">
                        <span className="material-symbols-outlined text-gold">event_busy</span>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          <strong className="text-on-surface">Cancellation Policy:</strong> You may cancel or modify your reservation complimentary up to 24 hours prior to your scheduled arrival.
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={handleConfirm}
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary text-white rounded-full font-label-caps uppercase tracking-widest hover:bg-emerald-green transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-sm disabled:opacity-80"
                    >
                      {isSubmitting ? (
                        <><span className="material-symbols-outlined animate-spin">sync</span> Confirming...</>
                      ) : (
                        <><span className="material-symbols-outlined">check_circle</span> Confirm Reservation</>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/10 p-md z-40 transform transition-transform">
        <div className="max-w-container-max mx-auto px-lg flex justify-between items-center">
          {step > 1 ? (
            <button 
              onClick={handlePrevStep}
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-caps uppercase tracking-widest text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back
            </button>
          ) : (
            <Link to="/explore" className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-caps uppercase tracking-widest text-xs transition-colors">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Cancel
            </Link>
          )}

          {step < 4 && (
            <button 
              onClick={handleNextStep}
              disabled={
                (step === 2 && !selectedSlot) || 
                (step === 3 && (!guestDetails.name || !guestDetails.email))
              }
              className="px-8 py-3 bg-primary text-white rounded-full font-label-caps uppercase tracking-widest text-xs hover:bg-emerald-green transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Continue
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
