import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar({ activePage }) {
  const getLinkClass = (pageName) => {
    const base = "flex items-center gap-sm rounded-lg px-md py-sm transition-all ";
    if (activePage === pageName) {
      return base + "bg-primary-container/10 text-primary border-l-4 border-primary font-bold";
    }
    return base + "text-on-surface-variant/60 hover:bg-surface-container-high/50";
  };

  return (
    <aside className="w-80 fixed left-0 top-0 h-screen bg-surface dark:bg-surface-dim border-r border-outline-variant/20 shadow-xl z-50 flex flex-col p-lg h-full">
      <div className="flex items-center gap-sm mb-lg">
        <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary-container">diamond</span>
        </div>
        <div>
          <Link to="/home" className="font-display-lg text-headline-md text-primary tracking-tight leading-none cursor-pointer">
            LuxeBook Admin
          </Link>
          <p className="font-label-caps text-on-surface-variant/60 uppercase text-[10px] mt-1">Elite Concierge</p>
        </div>
      </div>

      <nav className="flex flex-col gap-sm flex-grow">
        <Link className={getLinkClass("dashboard")} to="/admin/dashboard">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-body-md">Overview</span>
        </Link>
        <Link className={getLinkClass("appointments")} to="/book">
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="font-body-md">Appointments</span>
        </Link>
        <Link className={getLinkClass("portfolio")} to="/admin/portfolio">
          <span className={`material-symbols-outlined ${activePage === 'portfolio' ? 'fill-current' : ''}`}>collections</span>
          <span className="font-body-md">Portfolio</span>
        </Link>
        <Link className={getLinkClass("staff")} to="/explore">
          <span className="material-symbols-outlined">badge</span>
          <span className="font-body-md">Staff</span>
        </Link>
        <Link className={getLinkClass("cinematic")} to="/cinematic">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="font-body-md">Cinematic</span>
        </Link>
      </nav>

      <div className="mt-auto flex flex-col gap-sm border-t border-outline-variant/20 pt-lg">
        <a className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all" href="#">
          <span className="material-symbols-outlined">help</span>
          <span className="font-body-md">Support</span>
        </a>
        <Link className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all" to="/login">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-body-md">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
