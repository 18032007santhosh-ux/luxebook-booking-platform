import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function CalendarBooking() {
  const [selectedDay, setSelectedDay] = useState(4);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleContinue = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      {/* Main Booking Canvas */}
      <div className="flex-1 pt-24 pb-24 max-w-container-max mx-auto w-full px-lg mt-md">
        
        {/* Stepper Progress Header */}
        <div className="flex justify-between items-center mb-lg border-b border-secondary/10 pb-6">
          <div className="flex flex-col">
            <h1 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">Booking Schedule</h1>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Excellence in Every Detail</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center gap-2 text-on-surface-variant/40">
              <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center font-label-caps text-[10px]">01</span>
              <span className="font-label-caps uppercase text-[11px]">Service</span>
            </div>
            <div className="w-8 h-[1px] bg-secondary/20"></div>
            <div className="flex items-center gap-2 text-on-surface-variant/40">
              <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center font-label-caps text-[10px]">02</span>
              <span className="font-label-caps uppercase text-[11px]">Expert</span>
            </div>
            <div className="w-8 h-[1px] bg-secondary/20"></div>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <span className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center font-label-caps text-[10px]">03</span>
              <span className="font-label-caps uppercase text-[11px]">Date &amp; Time</span>
            </div>
            <div className="w-8 h-[1px] bg-secondary/20"></div>
            <div className="flex items-center gap-2 text-on-surface-variant/40">
              <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center font-label-caps text-[10px]">04</span>
              <span className="font-label-caps uppercase text-[11px]">Confirm</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-md">
          {/* Left Sidebar: Summary */}
          <aside className="lg:col-span-3 flex flex-col gap-md">
            <div className="glass-card rounded-2xl p-md flex flex-col gap-md">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase border-b border-secondary/10 pb-2">Selected Journey</h3>
              <div className="space-y-4">
                <div className="relative group overflow-hidden rounded-xl shadow-md">
                  <img 
                    alt="Luxury Spa Treatment" 
                    className="w-full h-40 object-cover group-hover:scale-[1.02] transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOWh7_VKVLyUvT_S78y_aGkMlVojn-vPi074Ob2qGcWFbiaqH92F783QeP-Lo3TjKnWaTNiB5BgT3JYUTqkNffEU7wMNMxuACrQ-awlG0Tz7zIKeaSvgc48Y8CGVFxuKw-H0OWFYCE9HwcC0NIdKMayWOkO8W6_8H2bJ_S2MpNRDO1A2ugxD5KL16JcYjOgA33hl1uuL2Xnn7LSXN78OZT_-fSnhc2LClLBujMH7gNE7oS58q-34bLvmWX5Hq6Epi9DJmgq_K34TY"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <span className="text-xs font-semibold text-emerald-green">90 min</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-primary">Royal Thai Massage</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Deep tissue restoration and pressure point therapy.</p>
                </div>
              </div>
              <div className="pt-4 border-t border-secondary/10 flex items-center gap-md">
                <img 
                  alt="Therapist Profile" 
                  className="w-12 h-12 rounded-full object-cover border border-rich-gold/30" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACSPrSirEJ5qqCeA5J1cT5049Bi8FKQjfNLMQai5WHV9-nFJ8Vw_EcmbXDsRQq8C-IqQ-VF9PuXtLXpwh-Zd0iGo_AaZh91Ea4GeImRZOIQJYTm4DFhVcpYGAhHMMEeIfe3wUn6rxm0-Sma8mKrOPjjp7G-vTK13Sgf3MgZjBlEBYgAZHEfFdTHP-b4OkS2ON9zFLSFqXPPOwXeADBPD6lDoXY6iMjotaZqKyvQL9YeZKXe5Kg05vC6oagiEr1nzx6Gvv1RAbyXyM"
                />
                <div>
                  <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">Wellness Expert</p>
                  <p className="font-body-md font-semibold text-on-surface">Elena S. Volkov</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-md bg-emerald-green text-white">
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-[10px] opacity-80 uppercase">Total Estimate</span>
                <span className="material-symbols-outlined text-sm">info</span>
              </div>
              <p className="font-headline-md text-headline-md mt-1">$350.00</p>
            </div>
          </aside>

          {/* Main Content: Calendar Grid */}
          <section className="lg:col-span-6 flex flex-col gap-md">
            <div className="glass-card rounded-3xl p-lg flex flex-col">
              <div className="flex justify-between items-center mb-md">
                <h2 className="font-headline-lg text-headline-lg text-primary">October 2024</h2>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-primary hover:bg-secondary/5 transition-colors">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-primary hover:bg-secondary/5 transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
              <div className="calendar-grid border-b border-secondary/10 pb-4 mb-4">
                <div className="text-center font-label-caps text-[11px] text-on-surface-variant">SUN</div>
                <div className="text-center font-label-caps text-[11px] text-on-surface-variant">MON</div>
                <div className="text-center font-label-caps text-[11px] text-on-surface-variant">TUE</div>
                <div className="text-center font-label-caps text-[11px] text-on-surface-variant">WED</div>
                <div className="text-center font-label-caps text-[11px] text-on-surface-variant">THU</div>
                <div className="text-center font-label-caps text-[11px] text-on-surface-variant">FRI</div>
                <div className="text-center font-label-caps text-[11px] text-on-surface-variant">SAT</div>
              </div>
              <div className="calendar-grid flex-1 items-stretch">
                {/* Week 1 */}
                <div className="p-2 text-on-surface-variant/30 flex flex-col items-center justify-start py-4">29</div>
                <div className="p-2 text-on-surface-variant/30 flex flex-col items-center justify-start py-4">30</div>
                
                {[...Array(26)].map((_, index) => {
                  const day = index + 1;
                  const isSelectable = day % 3 !== 0; // Simulate some blocked days
                  const isSelected = selectedDay === day;
                  return (
                    <div 
                      key={day}
                      onClick={() => isSelectable && setSelectedDay(day)}
                      className={`p-2 flex flex-col items-center justify-start py-4 group relative ${isSelectable ? "cursor-pointer text-on-surface" : "text-on-surface-variant/30"} ${isSelected ? "bg-primary/5 rounded-2xl active-ring" : ""}`}
                    >
                      <span className={`z-10 font-medium ${isSelected ? "text-primary font-bold" : ""}`}>
                        {day < 10 ? `0${day}` : day}
                      </span>
                      {isSelectable && (
                        <div className={`absolute bottom-4 w-1.5 h-1.5 rounded-full ${isSelected ? "bg-emerald-green" : "bg-emerald-green/40 group-hover:bg-emerald-green transition-colors"}`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Right Sidebar: Availability Slots */}
          <aside className="lg:col-span-3 flex flex-col gap-md">
            <div className="glass-card rounded-2xl p-md flex flex-col h-full">
              <div className="mb-6">
                <h3 className="font-headline-md text-headline-md text-primary">Availability</h3>
                <p className="font-body-sm text-on-surface-variant">Friday, October {selectedDay < 10 ? `0${selectedDay}` : selectedDay}</p>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                {/* Morning */}
                <div className="space-y-3">
                  <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Morning</p>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => handleSlotSelect("09:00 AM")}
                      className={`w-full py-4 px-6 rounded-xl border transition-all flex justify-between items-center group ${selectedSlot === "09:00 AM" ? "active-ring bg-emerald-green/5 border-emerald-green/30" : "border-secondary/10 bg-white/40 hover:border-emerald-green/50"}`}
                    >
                      <span className="font-medium text-on-surface">09:00 AM</span>
                      <span className={`material-symbols-outlined text-emerald-green ${selectedSlot === "09:00 AM" ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"}`}>check_circle</span>
                    </button>
                    <button 
                      onClick={() => handleSlotSelect("10:30 AM")}
                      className={`w-full py-4 px-6 rounded-xl border transition-all flex justify-between items-center group ${selectedSlot === "10:30 AM" ? "active-ring bg-emerald-green/5 border-emerald-green/30" : "border-secondary/10 bg-white/40 hover:border-emerald-green/50"}`}
                    >
                      <span className="font-medium text-on-surface">10:30 AM</span>
                      <span className={`material-symbols-outlined text-emerald-green ${selectedSlot === "10:30 AM" ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"}`}>check_circle</span>
                    </button>
                  </div>
                </div>

                {/* Premium Golden Hour */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2">
                    <p className="font-label-caps text-[10px] text-rich-gold uppercase tracking-widest">Golden Hour</p>
                    <span className="material-symbols-outlined text-[14px] text-rich-gold" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => handleSlotSelect("04:30 PM")}
                      className={`w-full py-4 px-6 rounded-xl border-2 backdrop-blur-md transition-all flex justify-between items-center ring-offset-2 hover:ring-2 hover:ring-rich-gold/50 ${selectedSlot === "04:30 PM" ? "active-ring bg-rich-gold/10 border-rich-gold" : "border-rich-gold/20 bg-rich-gold/5"}`}
                    >
                      <span className="font-semibold text-tertiary">04:30 PM</span>
                      <span className="text-[10px] bg-rich-gold text-white px-2 py-0.5 rounded-full uppercase">Premium</span>
                    </button>
                    <button 
                      onClick={() => handleSlotSelect("06:00 PM")}
                      className={`w-full py-4 px-6 rounded-xl border-2 backdrop-blur-md transition-all flex justify-between items-center ring-offset-2 hover:ring-2 hover:ring-rich-gold/50 ${selectedSlot === "06:00 PM" ? "active-ring bg-rich-gold/10 border-rich-gold" : "border-rich-gold/20 bg-rich-gold/5"}`}
                    >
                      <span className="font-semibold text-tertiary">06:00 PM</span>
                      <span className="text-[10px] bg-rich-gold text-white px-2 py-0.5 rounded-full uppercase">Premium</span>
                    </button>
                  </div>
                </div>

                {/* Evening */}
                <div className="space-y-3 pt-4">
                  <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Evening</p>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => handleSlotSelect("07:30 PM")}
                      className={`w-full py-4 px-6 rounded-xl border transition-all flex justify-between items-center group ${selectedSlot === "07:30 PM" ? "active-ring bg-emerald-green/5 border-emerald-green/30" : "border-secondary/10 bg-white/40 hover:border-emerald-green/50"}`}
                    >
                      <span className="font-medium text-on-surface">07:30 PM</span>
                      <span className={`material-symbols-outlined text-emerald-green ${selectedSlot === "07:30 PM" ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"}`}>check_circle</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-t border-secondary/10">
        <div className="max-w-container-max mx-auto px-lg h-24 flex items-center justify-between">
          <Link to="/explore" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-label-caps uppercase">Back to Services</span>
          </Link>
          <div className="flex items-center gap-xl">
            <div className="hidden lg:flex flex-col items-end">
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Selected Slot</span>
              <span className="font-body-md font-semibold text-primary">
                {selectedSlot ? `Fri, Oct ${selectedDay} • ${selectedSlot}` : "Please select an availability slot"}
              </span>
            </div>
            <button 
              onClick={handleContinue}
              disabled={!selectedSlot}
              className={`px-12 py-4 rounded-full font-label-caps uppercase tracking-widest shadow-lg transition-all flex items-center gap-3 ${selectedSlot ? "bg-primary hover:bg-emerald-green text-white hover:scale-[1.02] active:scale-95" : "bg-surface-container text-on-surface-variant cursor-not-allowed opacity-50"}`}
            >
              Continue to Details
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-rich-gold/5 rounded-full blur-[80px]"></div>
      </div>
    </>
  );
}
