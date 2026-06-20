import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Home from "./pages/Home";
import ExploreServices from "./pages/ExploreServices";
import CalendarBooking from "./pages/CalendarBooking";
import Checkout from "./pages/Checkout";
import BookingConfirmed from "./pages/BookingConfirmed";
import Dashboard from "./pages/Dashboard";
import CinematicEvolution from "./pages/CinematicEvolution";
import LoginPortal from "./pages/LoginPortal";
import PortfolioManagement from "./pages/PortfolioManagement";
import AdminCustomers from "./pages/AdminCustomers";
import CustomerDashboard from "./pages/CustomerDashboard";
import Gallery from "./pages/Gallery";
import Membership from "./pages/Membership";
import MembershipConfirm from "./pages/MembershipConfirm";
import MembershipPayment from "./pages/MembershipPayment";
import MembershipSuccess from "./pages/MembershipSuccess";
import MembershipDashboard from "./pages/MembershipDashboard";
import Profile from "./pages/Profile";
import Support from "./pages/Support";

import { AuthProvider } from "./contexts/AuthContext";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AdminRoute from "./components/routing/AdminRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="global-scale-wrapper">
      <AuthProvider>
        <PortfolioProvider>
      <BrowserRouter>
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0a0a0a',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
            },
            success: {
              iconTheme: { primary: '#10B981', secondary: '#fff' },
            },
          }} 
        />
        <Routes>
        {/* Default route shows the premium loading splash screen */}
        <Route path="/" element={<SplashScreen />} />
        
        {/* Standard Web Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<ExploreServices />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/customer-portfolio" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/membership" element={<Membership />} />
        
        {/* Protected Membership Flow */}
        <Route path="/membership/confirm" element={<ProtectedRoute><MembershipConfirm /></ProtectedRoute>} />
        <Route path="/membership/payment" element={<ProtectedRoute><MembershipPayment /></ProtectedRoute>} />
        <Route path="/membership/success" element={<ProtectedRoute><MembershipSuccess /></ProtectedRoute>} />
        <Route path="/membership/dashboard" element={<ProtectedRoute><MembershipDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
        <Route path="/appointments" element={<CalendarBooking />} />
        <Route path="/appointments/:serviceId" element={<CalendarBooking />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmed" element={<BookingConfirmed />} />
        
        {/* Admin and Business Intelligence Portals */}
        <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/portfolio" element={<AdminRoute><PortfolioManagement /></AdminRoute>} />
        <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
        
        {/* Experiential and Security Screens */}
        <Route path="/cinematic" element={<CinematicEvolution />} />
        <Route path="/login" element={<LoginPortal />} />
        
        {/* Catch-all fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
        </PortfolioProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
