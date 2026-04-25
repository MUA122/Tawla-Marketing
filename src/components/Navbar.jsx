import { useEffect, useState } from "react";
import { useLang } from "../hooks/useLang";
import LogoMark from "./LogoMark";

export default function Navbar() {
  const { isAr, toggle, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#how", label: t("How It Works", "كيف يعمل") },
    { href: "#features", label: t("Features", "الميزات") },
    { href: "#pricing", label: t("Pricing", "الأسعار") },
    { href: "#faq", label: t("FAQ", "الأسئلة") },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 32px",
        background: scrolled ? "rgba(8,7,6,.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--line)"
          : "1px solid transparent",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            textDecoration: "none",
            cursor: "none",
          }}
        >
          <LogoMark size={38} />
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Tawla
            </div>
            <div
              style={{
                fontFamily: "'Noto Sans Arabic', sans-serif",
                fontSize: 13,
                color: "var(--text-muted)",
                marginTop: -3,
              }}
            >
              طاولة
            </div>
          </div>
        </a>

        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  cursor: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--text-secondary)")
                }
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={toggle}
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-full)",
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--text-muted)",
              cursor: "none",
              transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--text-primary)";
              e.target.style.borderColor = "var(--line-2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "var(--text-muted)";
              e.target.style.borderColor = "var(--line)";
            }}
          >
            {isAr ? "English" : "العربية"}
          </button>
          <a
            href="#demo"
            className="btn-gold"
            style={{ padding: "11px 24px", fontSize: 14 }}
          >
            {t("Book Demo →", "احجز عرضاً ←")}
          </a>
        </div>
      </div>
    </nav>
  );
}
