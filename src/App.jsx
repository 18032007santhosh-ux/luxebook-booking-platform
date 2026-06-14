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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route shows the premium loading splash screen */}
        <Route path="/" element={<SplashScreen />} />
        
        {/* Standard Web Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<ExploreServices />} />
        <Route path="/book" element={<CalendarBooking />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmed" element={<BookingConfirmed />} />
        
        {/* Admin and Business Intelligence Portals */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/portfolio" element={<PortfolioManagement />} />
        
        {/* Experiential and Security Screens */}
        <Route path="/cinematic" element={<CinematicEvolution />} />
        <Route path="/login" element={<LoginPortal />} />
        
        {/* Catch-all fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;