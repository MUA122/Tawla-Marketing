import { useEffect, useState } from "react";
import { LangProvider } from "./hooks/useLang";
import { useScrollReveal } from "./hooks/useScrollReveal";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Marquee, HowItWorks, Features } from "./components/Sections1";
import {
  Benefits,
  Testimonials,
  Pricing,
  FAQ,
  CTA,
  Footer,
} from "./components/Sections2";

function AppInner() {
  useScrollReveal();
  const [isBootLoading, setIsBootLoading] = useState(true);
  const [showMobileHint, setShowMobileHint] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBootLoading(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobileView = window.matchMedia("(max-width: 900px)").matches;
    const alreadyDismissed =
      window.sessionStorage.getItem("tawla-mobile-hint-dismissed") === "1";

    if (isMobileView && !alreadyDismissed) {
      setShowMobileHint(true);
    }
  }, []);

  const dismissMobileHint = () => {
    setShowMobileHint(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("tawla-mobile-hint-dismissed", "1");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "transparent" }}>
      {isBootLoading && (
        <div className="app-preloader" role="status" aria-live="polite">
          <div className="app-preloader-card">
            <div className="app-preloader-spinner" />
            <div className="app-preloader-title">Tawla</div>
            <div className="app-preloader-subtitle">
              Preparing your experience...
            </div>
          </div>
        </div>
      )}
      <Cursor />
      <Navbar />
      {showMobileHint && (
        <div className="mobile-hint-overlay" role="dialog" aria-modal="true">
          <div className="mobile-hint-card">
            <p className="mobile-hint-text">
              For the best experience, please open this website on a PC.
            </p>
            <button
              type="button"
              className="mobile-hint-btn"
              onClick={dismissMobileHint}
            >
              Got it
            </button>
          </div>
        </div>
      )}
      <main>
        <Hero />
        <div className="section-divider" />
        <Marquee />
        <div className="section-divider" />
        <HowItWorks />
        <div className="section-divider" />
        <Features />
        <div className="section-divider" />
        <Benefits />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <Pricing />
        <div className="section-divider" />
        <FAQ />
        <div className="section-divider" />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
