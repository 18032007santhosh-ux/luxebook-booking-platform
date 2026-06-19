import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import toast from "react-hot-toast";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCompletePayment = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      navigate("/confirmed");
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-container-max mx-auto px-md md:px-xl py-lg pt-28">
        {/* Progress Indicator */}
        <div className="mb-lg max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-sm">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-semibold text-body-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span className="font-label-caps text-label-caps text-primary">Service</span>
            </div>
            <div className="flex-grow h-[1px] bg-outline-variant/30 mx-4 -mt-8"></div>
            <div className="flex flex-col items-center gap-sm">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-semibold text-body-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span className="font-label-caps text-label-caps text-primary">Details</span>
            </div>
            <div className="flex-grow h-[1px] bg-outline-variant/30 mx-4 -mt-8"></div>
            <div className="flex flex-col items-center gap-sm">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-semibold text-body-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span className="font-label-caps text-label-caps text-primary">DateTime</span>
            </div>
            <div className="flex-grow h-[1px] bg-outline-variant/30 mx-4 -mt-8"></div>
            <div className="flex flex-col items-center gap-sm">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-body-md ring-4 ring-primary-container/20">
                4
              </div>
              <span className="font-label-caps text-label-caps text-primary font-bold">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
          {/* Left Column: Booking Summary */}
          <div className="lg:col-span-5 flex flex-col gap-md">
            <h1 className="font-headline-lg text-headline-lg text-primary">Review Your Reservation</h1>
            <div className="glass-card luxury-shadow rounded-[24px] overflow-hidden">
              <div className="h-48 w-full relative">
                <img 
                  alt="Luxury Spa Treatment" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhvK_AkL6ru0KRxJXOyTEYhf297yt94JjzcnQsrWTIIefSiwmKlNtCuIuCcFPtireLqBFHy1TLWdcltoy7r0KaPbtzDH-vhGFdXZhOwDr9MBqJpSoGd3ysvdRLjKjOYo_QtejQ2UQteDRFIniU29p91PlRKqAUDTA9IEnAItoCoOJWiHfzF7NEvFXRkrnrbGh65gSIFYX6S7CvflbQjJTelb3rC4PM-rtrftbaqQqzov0dBKZ0nZMNchYpceGVobmfnp_uamPyL8M"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="p-lg flex flex-col gap-base">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-label-caps text-label-caps text-tertiary uppercase tracking-widest mb-xs">Wellness &amp; Recovery</p>
                    <h2 className="font-headline-md text-headline-md text-primary">Royal Thai Massage</h2>
                  </div>
                  <span className="font-headline-md text-headline-md text-primary">$350.00</span>
                </div>
                <div className="h-[1px] bg-outline-variant/20 my-sm"></div>
                <div className="flex items-center gap-md">
                  <img 
                    alt="Elena S. Volkov" 
                    className="w-12 h-12 rounded-full object-cover border border-outline-variant" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAlZz014nAt3z-JMURIR9CR1ttVe4vJdIHu4_bAdbrpqO5x-K9CuigFzP-e3I3_6cGB6zlFiCwaR03jEsOG0hGi-lXsqE4orpr3EtBSeyaK5GftO4n8XqmJZXq_2_TgAi-KTGXMSGdAxkRbe4E7NTMFFj76ke7pyMH9aGww0jxzczznisYm8GgmpndtJ2Sf3ur-_CWNVwTscKSEpur5OarTMQayjrgkkBMFnT24fZelO9nOwTUi42oYBq6KWOZ9M07GxZe0XyennQ"
                  />
                  <div>
                    <p className="text-on-surface-variant font-body-sm">Elite Practitioner</p>
                    <p className="font-semibold text-primary">Elena S. Volkov</p>
                  </div>
                </div>
                <div className="flex items-center gap-md mt-sm">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-on-surface-variant font-body-sm">Appointment Date</p>
                    <p className="font-semibold text-primary">Fri, Oct 4 • 4:30 PM</p>
                  </div>
                </div>
                <div className="mt-lg p-md rounded-xl bg-surface-container-low border border-outline-variant/10">
                  <div className="flex justify-between text-body-sm text-on-surface-variant">
                    <span>Service Duration</span>
                    <span>90 Minutes</span>
                  </div>
                  <div className="flex justify-between text-body-sm text-on-surface-variant mt-base">
                    <span>Service Fee</span>
                    <span>$320.00</span>
                  </div>
                  <div className="flex justify-between text-body-sm text-on-surface-variant mt-base">
                    <span>Concierge Booking Tax</span>
                    <span>$30.00</span>
                  </div>
                  <div className="h-[1px] bg-outline-variant/30 my-sm"></div>
                  <div className="flex justify-between font-bold text-primary text-body-lg">
                    <span>Total Amount</span>
                    <span>$350.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-md bg-surface-container/30 border border-outline-variant/10 rounded-xl flex items-start gap-sm">
              <span className="material-symbols-outlined text-tertiary">info</span>
              <p className="text-body-sm text-on-surface-variant italic">Cancellation policy: Complimentary cancellation up to 24 hours before your scheduled appointment.</p>
            </div>
          </div>

          {/* Right Column: Payment Details */}
          <div className="lg:col-span-7 flex flex-col gap-md">
            <h2 className="font-headline-md text-headline-md text-primary">Payment Information</h2>
            {/* Payment Method Selectors */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
              <div className="relative">
                <input 
                  checked={paymentMethod === "card"} 
                  onChange={() => setPaymentMethod("card")}
                  className="payment-option-input hidden" 
                  id="card" 
                  name="payment_method" 
                  type="radio"
                />
                <label className="glass-card luxury-shadow rounded-xl p-md flex flex-col items-center justify-center gap-xs cursor-pointer border-transparent transition-all hover:translate-y-[-2px]" htmlFor="card">
                  <span className="material-symbols-outlined text-primary">credit_card</span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant">Card</span>
                </label>
              </div>
              <div className="relative">
                <input 
                  checked={paymentMethod === "applepay"} 
                  onChange={() => setPaymentMethod("applepay")}
                  className="payment-option-input hidden" 
                  id="applepay" 
                  name="payment_method" 
                  type="radio"
                />
                <label className="glass-card luxury-shadow rounded-xl p-md flex flex-col items-center justify-center gap-xs cursor-pointer border-transparent transition-all hover:translate-y-[-2px]" htmlFor="applepay">
                  <span className="material-symbols-outlined text-primary">phone_iphone</span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant">Apple Pay</span>
                </label>
              </div>
              <div className="relative">
                <input 
                  checked={paymentMethod === "googlepay"} 
                  onChange={() => setPaymentMethod("googlepay")}
                  className="payment-option-input hidden" 
                  id="googlepay" 
                  name="payment_method" 
                  type="radio"
                />
                <label className="glass-card luxury-shadow rounded-xl p-md flex flex-col items-center justify-center gap-xs cursor-pointer border-transparent transition-all hover:translate-y-[-2px]" htmlFor="googlepay">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant">Google Pay</span>
                </label>
              </div>
              <div className="relative">
                <input 
                  checked={paymentMethod === "membership"} 
                  onChange={() => setPaymentMethod("membership")}
                  className="payment-option-input hidden" 
                  id="membership" 
                  name="payment_method" 
                  type="radio"
                />
                <label className="glass-card luxury-shadow rounded-xl p-md flex flex-col items-center justify-center gap-xs cursor-pointer border-transparent transition-all hover:translate-y-[-2px]" htmlFor="membership">
                  <span className="material-symbols-outlined text-primary">stars</span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant">Credits</span>
                </label>
              </div>
            </div>

            {/* Payment Form */}
            <div className="glass-card luxury-shadow rounded-[24px] p-lg">
              <form onSubmit={handleCompletePayment} className="flex flex-col gap-lg">
                <div className="relative">
                  <input className="block w-full px-0 py-base bg-transparent border-0 border-b-2 border-outline-variant/30 text-primary font-medium peer focus:ring-0 focus:outline-none" id="card_name" placeholder=" " required type="text" />
                  <label className="absolute text-label-caps text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" htmlFor="card_name">Cardholder Name</label>
                </div>
                <div className="relative">
                  <div className="flex items-center">
                    <input className="block w-full px-0 py-base bg-transparent border-0 border-b-2 border-outline-variant/30 text-primary font-medium peer focus:ring-0 focus:outline-none" id="card_number" placeholder=" " required type="text" defaultValue="**** **** **** 8892" />
                    <span className="material-symbols-outlined text-on-surface-variant absolute right-0 bottom-base">lock</span>
                  </div>
                  <label className="absolute text-label-caps text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" htmlFor="card_number">Card Number</label>
                </div>
                <div className="grid grid-cols-2 gap-lg">
                  <div className="relative">
                    <input className="block w-full px-0 py-base bg-transparent border-0 border-b-2 border-outline-variant/30 text-primary font-medium peer focus:ring-0 focus:outline-none" id="expiry" placeholder="MM/YY" required type="text" />
                    <label className="absolute text-label-caps text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" htmlFor="expiry">Expiry Date</label>
                  </div>
                  <div className="relative">
                    <input className="block w-full px-0 py-base bg-transparent border-0 border-b-2 border-outline-variant/30 text-primary font-medium peer focus:ring-0 focus:outline-none" id="cvv" placeholder="***" required type="password" />
                    <label className="absolute text-label-caps text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" htmlFor="cvv">CVV/CVC</label>
                  </div>
                </div>
                <div className="flex items-center gap-sm">
                  <input className="w-5 h-5 rounded border-outline-variant text-primary-container focus:ring-primary-container/20" id="save_card" type="checkbox" />
                  <label className="text-body-sm text-on-surface-variant" htmlFor="save_card">Save card details for future bookings</label>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-lg w-full bg-primary-container text-white py-lg rounded-[24px] font-semibold text-body-lg flex items-center justify-center gap-sm active:scale-[0.98] transition-all hover:bg-primary shadow-lg shadow-primary-container/20 disabled:opacity-85"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span> Securing Reservation...
                    </>
                  ) : (
                    <>
                      Complete Reservation
                      <span className="material-symbols-outlined text-[#D4AF37]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    </>
                  )}
                </button>
                <p className="text-center text-label-caps text-on-surface-variant mt-sm">
                  <span className="material-symbols-outlined text-[14px] align-middle mr-1">encrypted</span>
                  End-to-End Encrypted Payment Processing
                </p>
              </form>
            </div>
            
            {/* Alternative Interaction */}
            <div className="flex justify-between items-center px-md">
              <Link to="/appointments" className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-label-caps">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Schedule
              </Link>
              <div className="flex gap-md">
                <span className="material-symbols-outlined text-outline-variant">card_travel</span>
                <span className="material-symbols-outlined text-outline-variant">credit_card</span>
                <span className="material-symbols-outlined text-outline-variant">credit_card</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-xl border-t border-outline-variant/20 py-lg px-xl bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex flex-col gap-xs">
            <span className="font-headline-md text-primary">LuxeBook</span>
            <span className="text-body-sm text-on-surface-variant">Elevating Private Concierge Services Globally</span>
          </div>
          <div className="flex gap-lg">
            <a className="font-label-caps text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Privacy Policy coming soon."); }}>Privacy Policy</a>
            <a className="font-label-caps text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Terms of Service coming soon."); }}>Terms of Service</a>
            <a className="font-label-caps text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Concierge Support coming soon."); }}>Concierge Support</a>
          </div>
        </div>
      </footer>
    </>
  );
}
