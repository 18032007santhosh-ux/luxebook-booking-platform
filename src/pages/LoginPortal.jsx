import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function LoginPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary/10 selection:text-primary min-h-screen">
      <main className="flex min-h-screen overflow-hidden">
        {/* Left Side: High-end lifestyle imagery */}
        <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/20 to-transparent"></div>
          <img
            alt="Luxury Spa Interior"
            className="hero-zoom absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk6KjY_Ai0RfKAJie4Q041II14gKyWbWNIb5QehuQVwjoYqNCJguCgnIsEm7YNDJj-IYTVpQti1K1S6UkbrJxVjjbtHGwhgoQTCl5MWxPvwN8dlqCPNJigzaO35HIr8Ol1k_khhWCMnQhFieMl4JLnOtfx9SxRbvUe9f6fiIrHmeDkKqB0r8o7lvDf5xdGahYoC11ai6Ua87f7AzWxIUzxw2E743WN8x0ItL7ziJHx1FPSbJftcWTKX5ZxM8vhnQsWfoHUVEHotE8"
          />
          <div className="absolute bottom-xl left-xl z-20 max-w-md p-6">
           <h1 className="font-display-lg text-display-lg text-white mb-md leading-tight text-4xl font-bold">
               Refined <br />
                   Appointments.
           </h1>
            <p className="font-body-lg text-body-lg text-white/80 mt-4 text-base">
              Access your curated world of luxury services and private concierge management.
            </p>
          </div>
        </section>

        {/* Right Side: Login Form Canvas */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-md lg:p-xl bg-[#F8F5F0] relative min-h-screen">
          {/* Subtle atmospheric element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary-container/10 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>

          <div className="w-full max-w-[480px] z-10 animate-fade-in-up">
            {/* Brand Anchor */}
            <div className="mb-lg flex flex-col items-center lg:items-start px-4">
              <Link
                to="/home"
                className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight mb-2 cursor-pointer text-2xl"
              >
                LuxeBook
              </Link>
              <div className="h-px w-12 bg-tertiary-container/40"></div>
            </div>

            {/* Glassmorphism Card */}
            <div className="glass-card luxury-shadow rounded-[32px] p-6 md:p-12 mx-4">
              <div className="mb-lg">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2 text-xl font-bold">
                  Welcome Excellence
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-sm">
                  Please identify yourself to proceed to your private concierge.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-lg">
                {/* Email Field */}
                <div className="relative group">
                  <label
                    className={`font-label-caps text-label-caps mb-base block transition-colors duration-300 ${
                      focusedField === "email" ? "text-primary font-bold" : "text-on-surface-variant"
                    }`}
                    htmlFor="email"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    className="w-full py-base input-elegant text-on-surface placeholder:text-outline-variant outline-none"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@excellence.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <div className="flex justify-between items-end mb-base">
                    <label
                      className={`font-label-caps text-label-caps block transition-colors duration-300 ${
                        focusedField === "password" ? "text-primary font-bold" : "text-on-surface-variant"
                      }`}
                      htmlFor="password"
                    >
                      PASSWORD
                    </label>
                    <a
                      className="font-label-caps text-[10px] text-tertiary hover:text-primary-container transition-colors duration-300"
                      href="#"
                    >
                      FORGOT PASSWORD?
                    </a>
                  </div>
                  <input
                    className="w-full py-base input-elegant text-on-surface placeholder:text-outline-variant outline-none"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Primary CTA */}
                <button
                  className="w-full bg-primary-container text-white font-body-md py-md rounded-full shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group border border-tertiary-container/30 h-12"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In to Concierge
                      <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-lg flex items-center">
                <div className="flex-grow border-t border-outline-variant/30"></div>
                <span className="flex-shrink mx-4 font-label-caps text-[10px] text-outline">OR ACCESS VIA</span>
                <div className="flex-grow border-t border-outline-variant/30"></div>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-md">
                <button className="flex items-center justify-center gap-2 py-3 rounded-full border border-outline-variant/50 hover:bg-white transition-all duration-300 group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M17.05,20.28c-0.96,0.95-2.05,1.72-3.26,1.72c-1.2,0-1.59-0.73-3.04-0.73c-1.45,0-1.89,0.72-3.04,0.73 c-1.21,0-2.3-0.78-3.27-1.73C2.47,18.32,1,15.22,1,12.09c0-3.14,2.04-4.8,4.02-4.8c1.04,0,2.02,0.42,2.66,0.42 c0.63,0,1.83-0.49,3.06-0.49c1.08,0,2.37,0.4,3.22,1.39C11.53,9.4,10.15,11.36,10.15,13.88c0,2.77,2.44,3.87,2.48,3.89 C12.6,17.89,12.21,19.22,17.05,20.28z M12.03,6.86c0-1.23,0.51-2.43,1.33-3.39c0.82-0.97,2.01-1.63,3.22-1.63 c0.07,0,0.14,0,0.22,0.01c0.12,1.26-0.38,2.47-1.2,3.37C14.77,6.14,13.25,6.86,12.03,6.86z"
                      fill="#191c1b"
                    ></path>
                  </svg>
                  <span className="font-label-caps text-[11px]">Apple</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-full border border-outline-variant/50 hover:bg-white transition-all duration-300 group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.14-4.53z"
                      fill="#EA4335"
                    ></path>
                  </svg>
                  <span className="font-label-caps text-[11px]">Google</span>
                </button>
              </div>
            </div>

            {/* Secondary Action */}
            <div className="mt-lg text-center px-4">
              <p className="font-body-sm text-on-surface-variant text-sm">
                New to LuxeBook?
                <a className="text-primary font-semibold hover:underline underline-offset-4 ml-1" href="#">
                  Request Private Access
                </a>
              </p>
            </div>
          </div>

          {/* Footer-style disclaimer */}
          <div className="absolute bottom-md left-0 w-full px-lg hidden md:block">
            <div className="flex justify-between items-center text-[10px] font-label-caps text-outline uppercase tracking-widest">
              <span>© 2024 LuxeBook Global</span>
              <div className="flex gap-md">
                <a className="hover:text-primary transition-colors" href="#">
                  Privacy
                </a>
                <a className="hover:text-primary transition-colors" href="#">
                  Terms
                </a>
                <a className="hover:text-primary transition-colors" href="#">
                  Concierge Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
