import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LuxuryBadge from "../components/ui/LuxuryBadge";
import { generateReceiptPDF } from "../utils/receiptGenerator";
import { useAuth } from "../contexts/AuthContext";
import { membershipService } from "../services/membershipService";
import toast from "react-hot-toast";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [activeReviewBookingId, setActiveReviewBookingId] = useState(null);
  const [cancelModalBookingId, setCancelModalBookingId] = useState(null);

  const currentMembership = membershipService.getActiveMembership();

  useEffect(() => {
    if (user) {
      const storageKey = `luxebook_reservations_${user.id}`;
      const storedBookings = JSON.parse(localStorage.getItem(storageKey) || "[]");
      
      const processedBookings = storedBookings.map(b => {
        if (b.status === "cancelled") return b;
        
        let parsedDate;
        try {
          if (b.date && b.date.includes(",")) {
             const withoutWeekday = b.date.split(", ").slice(1).join(", ");
             parsedDate = new Date(`${withoutWeekday} ${b.time}`);
          } else {
             parsedDate = new Date(b.date);
          }
        } catch(e) {
          parsedDate = new Date();
        }
        
        if (parsedDate < new Date()) {
          return { ...b, status: "completed" };
        } else {
          return { ...b, status: "upcoming" };
        }
      });
      setBookings(processedBookings);

      const reviewsKey = `luxebook_reviews_${user.id}`;
      const storedReviews = JSON.parse(localStorage.getItem(reviewsKey) || "[]");
      setReviews(storedReviews);
    }
  }, [user]);

  const saveBookings = (newBookings) => {
    setBookings(newBookings);
    if (user) {
      const storageKey = `luxebook_reservations_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(newBookings));
    }
  };

  const saveReviews = (newReviews) => {
    setReviews(newReviews);
    if (user) {
      const reviewsKey = `luxebook_reviews_${user.id}`;
      localStorage.setItem(reviewsKey, JSON.stringify(newReviews));
    }
  };

  const handleDownloadReceipt = async (booking) => {
    try {
      toast("Generating receipt...");
      const receiptData = {
        id: booking.bookingId || booking.id,
        service: { title: booking.serviceName, price: booking.price },
        date: booking.date,
        time: booking.time || "N/A",
        customerDetails: { firstName: booking.customerName || user?.name || "Valued Guest", lastName: "" }
      };
      await generateReceiptPDF(receiptData);
      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate receipt.");
    }
  };

  const confirmCancellation = () => {
    if (!cancelModalBookingId) return;
    const newBookings = bookings.map(b => {
      const id = b.bookingId || b.id;
      if (id === cancelModalBookingId) {
        return { ...b, status: "cancelled", cancelledAt: new Date().toISOString() };
      }
      return b;
    });
    saveBookings(newBookings);
    toast.success("Booking cancelled successfully.");
    setCancelModalBookingId(null);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!activeReviewBookingId) return;
    
    if (ratingValue === 0) {
      toast.error("Please select a star rating before submitting.");
      return;
    }

    const existingIndex = reviews.findIndex(r => r.bookingId === activeReviewBookingId);
    let newReviews;
    if (existingIndex >= 0) {
      newReviews = [...reviews];
      newReviews[existingIndex] = { bookingId: activeReviewBookingId, rating: ratingValue, comment: feedbackText };
      toast.success("Feedback updated successfully.");
    } else {
      newReviews = [...reviews, { bookingId: activeReviewBookingId, rating: ratingValue, comment: feedbackText }];
      toast.success("Feedback submitted successfully.");
    }
    saveReviews(newReviews);
    setActiveReviewBookingId(null);
    setFeedbackText("");
    setRatingValue(0);
  };

  const openReviewModal = (bookingId) => {
    const existingReview = reviews.find(r => r.bookingId === bookingId);
    if (existingReview) {
      setRatingValue(existingReview.rating);
      setFeedbackText(existingReview.comment);
    } else {
      setRatingValue(0);
      setFeedbackText("");
    }
    setActiveReviewBookingId(bookingId);
  };

  const pastBookings = bookings.filter(b => b.status === "completed" || b.status === "cancelled");

  const totalSpent = bookings.filter(b => b.status === "completed").reduce((sum, b) => sum + b.price, 0);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-lg max-w-container-max mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-xl text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-lg">
          <div>
            <LuxuryBadge variant="gold" className="mb-4">PERSONAL PORTFOLIO</LuxuryBadge>
            <h1 className="font-display-lg text-4xl md:text-5xl text-primary mb-2">
              Welcome Back, {user?.name || "Guest"}
            </h1>
            <p className="text-on-surface-variant font-body-lg">
              Manage your bookings, access receipts, and explore personalized recommendations.
            </p>
          </div>
          <div className="glass-card p-lg rounded-2xl flex flex-col items-center md:items-end text-center md:text-right min-w-[250px]">
            <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-1">Status</p>
            <p className="font-headline-md text-primary text-xl flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-gold">diamond</span>
              {currentMembership ? (currentMembership.id || currentMembership.name || "").toUpperCase() : "STANDARD"}
            </p>
            <div className="flex gap-md">
              <div>
                <p className="font-display-md text-2xl font-bold">{bookings.length}</p>
                <p className="text-xs font-label-caps text-on-surface-variant">Bookings</p>
              </div>
              <div className="w-px bg-outline-variant/30"></div>
              <div>
                <p className="font-display-md text-2xl font-bold">${totalSpent}</p>
                <p className="text-xs font-label-caps text-on-surface-variant">Spent</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-xl">
            
            {/* Book Another Service CTA */}
            <section className="glass-card p-xl rounded-2xl flex flex-col md:flex-row items-center justify-between gap-lg border border-gold/30 bg-gradient-to-r from-surface to-gold/5 shadow-lg">
              <div className="text-center md:text-left">
                <h2 className="font-headline-md text-2xl text-primary mb-2">Book Another Service</h2>
                <p className="font-body-md text-on-surface-variant max-w-md">Ready for your next experience? Discover our curated services and reserve your next appointment.</p>
              </div>
              <Link to="/explore" className="shrink-0 w-full md:w-auto">
                <button className="w-full md:w-auto px-8 py-4 bg-primary text-on-primary rounded-full font-label-caps text-xs tracking-widest hover:bg-gold transition-colors shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  Book Another Service
                </button>
              </Link>
            </section>

            {/* Past Bookings & Receipts */}
              <section>
                <h2 className="font-headline-lg text-2xl text-primary mb-md border-b border-outline-variant/20 pb-sm">Past Experiences</h2>
                {pastBookings.length > 0 ? (
                  <div className="space-y-md">
                    {pastBookings.map(booking => (
                      <div key={booking.bookingId || booking.id} className="glass-card p-md md:p-lg rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
                        <div>
                          <p className={`text-xs font-label-caps tracking-widest mb-1 ${booking.status === 'completed' ? 'text-on-surface-variant' : 'text-error'}`}>
                            {booking.status.toUpperCase()}
                          </p>
                          <h3 className="font-headline-md text-lg text-on-surface">{booking.serviceName}</h3>
                          <p className="text-sm text-on-surface-variant mt-1">
                            {booking.date}
                          </p>
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto">
                          {(booking.status || "").toLowerCase() !== "cancelled" && (
                            <button 
                              className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 border border-error text-error rounded-full text-xs font-label-caps uppercase hover:bg-error hover:text-white transition-colors"
                              onClick={() => setCancelModalBookingId(booking.bookingId || booking.id)}
                            >
                              <span className="material-symbols-outlined text-sm">cancel</span>
                              Cancel Booking
                            </button>
                          )}
                          {booking.status === 'completed' && (
                            <>
                              <button 
                                className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 bg-surface-container-high rounded-full text-xs font-label-caps uppercase hover:bg-gold hover:text-on-primary transition-colors border border-outline-variant/20"
                                onClick={() => openReviewModal(booking.bookingId || booking.id)}
                              >
                                <span className="material-symbols-outlined text-sm">star</span>
                                Rate & Review
                              </button>
                            <button 
                              className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 border border-outline-variant text-on-surface-variant rounded-full text-xs font-label-caps uppercase hover:text-primary hover:border-primary transition-colors"
                              onClick={() => handleDownloadReceipt(booking)}
                            >
                              <span className="material-symbols-outlined text-sm">download</span>
                              Receipt
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-xl rounded-xl text-center border border-outline-variant/10">
                  <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">history</span>
                  <p className="font-body-lg text-on-surface-variant">Your history of experiences will elegantly unfold here.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - Recommendations & Summary */}
          <div className="space-y-xl">
            {/* Membership Recommendations */}
            <section className="glass-card p-lg rounded-2xl border border-gold/30 bg-gradient-to-b from-surface to-gold/5 shadow-lg">
              <div className="flex items-center gap-3 mb-md">
                <span className="material-symbols-outlined text-gold text-2xl">workspace_premium</span>
                <h2 className="font-headline-md text-xl text-primary">Upgrade Your Experience</h2>
              </div>
              {!currentMembership ? (
                <>
                  <p className="text-on-surface-variant text-sm mb-md">
                    Unlock exclusive perks, priority booking, and complimentary services by joining our LuxeBook Membership.
                  </p>
                  <Link to="/membership" className="block w-full">
                    <button className="w-full py-3 bg-gold text-[#121212] rounded-full font-label-caps text-xs tracking-widest font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                      Join The Club
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-on-surface-variant text-sm mb-md">
                    You are currently a {currentMembership.tier} member. Elevate your status to unlock even more premium benefits.
                  </p>
                  <Link to="/membership" className="block w-full">
                    <button className="w-full py-3 border border-gold text-gold rounded-full font-label-caps text-xs tracking-widest font-bold hover:bg-gold hover:text-[#121212] transition-all">
                      View Upgrade Options
                    </button>
                  </Link>
                </>
              )}
            </section>

            {/* My Reviews Summary */}
            <section className="glass-card p-lg rounded-2xl border border-outline-variant/10">
              <h2 className="font-headline-md text-lg text-primary mb-md">My Feedback</h2>
              {reviews.length > 0 ? (
                <div className="space-y-sm">
                  {reviews.map((review, i) => {
                    const relatedBooking = bookings.find(b => (b.bookingId || b.id) === review.bookingId);
                    return (
                      <div key={i} className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/10">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-label-caps text-[10px] text-on-surface-variant truncate pr-2">
                            {relatedBooking?.serviceName || "Service Experience"}
                          </p>
                          <div className="flex">
                            {[...Array(5)].map((_, idx) => (
                              <span key={idx} className={`material-symbols-outlined text-[12px] ${idx < review.rating ? 'text-gold fill-current' : 'text-outline-variant'}`}>
                                star
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-on-surface line-clamp-2">"{review.comment}"</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <span className="material-symbols-outlined text-outline-variant mb-2">rate_review</span>
                  <p className="text-sm text-on-surface-variant italic">No reviews submitted yet.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />

      {/* Review Modal */}
      {activeReviewBookingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-md" onClick={() => setActiveReviewBookingId(null)}>
          <div className="glass-card w-full max-w-md p-lg rounded-2xl relative shadow-2xl border border-outline-variant/20" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors bg-surface-container-low w-8 h-8 rounded-full flex items-center justify-center"
              onClick={() => setActiveReviewBookingId(null)}
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            <h2 className="font-headline-md text-xl text-primary mb-sm">Rate Your Experience</h2>
            <p className="text-sm text-on-surface-variant mb-md">
              {bookings.find(b => (b.bookingId || b.id) === activeReviewBookingId)?.serviceName}
            </p>
            
            <form onSubmit={handleSubmitReview}>
              <div className="flex justify-center gap-2 mb-md bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    type="button"
                    onClick={() => setRatingValue(star)}
                    className="focus:outline-none hover:scale-110 transition-transform p-1"
                    aria-label={`Rate ${star} stars`}
                  >
                    <span 
                      className={`material-symbols-outlined text-4xl transition-colors ${star <= ratingValue ? 'text-gold' : 'text-outline-variant/50'}`}
                      style={{ fontVariationSettings: star <= ratingValue ? '"FILL" 1' : '"FILL" 0' }}
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>
              <div className="mb-md">
                <label className="block text-xs font-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">Your Feedback</label>
                <textarea 
                  rows="4" 
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-sm text-sm focus:outline-none focus:border-gold/50 transition-colors text-on-surface placeholder:text-on-surface-variant/50"
                  placeholder="Share your experience..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-emerald-green text-white rounded-full font-label-caps text-xs tracking-widest hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalBookingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-md" onClick={() => setCancelModalBookingId(null)}>
          <div className="glass-card w-full max-w-md p-lg rounded-2xl relative shadow-2xl border border-error/30" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors bg-surface-container-low w-8 h-8 rounded-full flex items-center justify-center"
              onClick={() => setCancelModalBookingId(null)}
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            <div className="text-center mb-md">
              <span className="material-symbols-outlined text-error text-5xl mb-2">warning</span>
              <h2 className="font-headline-md text-xl text-primary mb-2">Cancel this booking?</h2>
              <p className="text-sm text-on-surface-variant">
                Are you sure you want to cancel? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-3 mt-lg">
              <button 
                className="flex-1 py-3 border border-outline-variant text-on-surface-variant rounded-full font-label-caps text-xs tracking-widest hover:bg-surface-container-high transition-colors"
                onClick={() => setCancelModalBookingId(null)}
              >
                Keep Booking
              </button>
              <button 
                className="flex-1 py-3 bg-error text-white rounded-full font-label-caps text-xs tracking-widest hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                onClick={confirmCancellation}
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
