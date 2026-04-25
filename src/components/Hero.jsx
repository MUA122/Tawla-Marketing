import { useEffect, useRef } from "react";
import { useLang } from "../hooks/useLang";

function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W,
      H,
      particles = [],
      raf;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.r = Math.random() * 1.5 + 0.5;
        this.gold = Math.random() > 0.7;
      }
      update() {
        const dx = mouse.x - this.x,
          dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const f = (120 - dist) / 120;
          this.vx -= (dx / dist) * f * 0.5;
          this.vy -= (dy / dist) * f * 0.5;
        }
        this.vx *= 0.99;
        this.vy *= 0.99;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.gold
          ? `rgba(94,141,255,${this.alpha})`
          : `rgba(245,239,228,${this.alpha * 0.4})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.update();
        p.draw();
        particles.forEach((p2) => {
          const dx = p.x - p2.x,
            dy = p.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(94,141,255,${(1 - d / 100) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

function PhoneFrame({ children, className, style }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2,
      cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width,
      dy = (e.clientY - cy) / r.height;
    ref.current.style.transform = `${style?.transform || ""} rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = style?.transform || "";
  };

  return (
    <div
      ref={ref}
      className={`phone-frame ${className || ""}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        borderRadius: 38,
        background: "var(--ink-2)",
        border: "1.5px solid var(--line-2)",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow:
          "0 0 0 1px rgba(255,255,255,.04) inset, 0 40px 100px rgba(0,0,0,.6), 0 0 60px rgba(94,141,255,.08)",
        transition: "box-shadow 0.5s",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,.03) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10,
          borderRadius: "38px 38px 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          width: 72,
          height: 6,
          background: "rgba(255,255,255,.08)",
          borderRadius: 3,
          zIndex: 20,
        }}
      />
      <div style={{ position: "absolute", inset: 0 }}>{children}</div>
    </div>
  );
}

function OrderingScreen({ t }) {
  return (
    <div
      style={{
        background: "#0E0C08",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "32px 18px 16px",
          background:
            "linear-gradient(180deg, #141008 0%, rgba(14,12,8,0) 100%)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: "rgba(94,141,255,.14)",
            border: "1px solid rgba(94,141,255,.24)",
            borderRadius: "var(--r-full)",
            padding: "4px 10px",
            fontSize: 10,
            fontWeight: 600,
            color: "var(--gold-2)",
            marginBottom: 8,
          }}
        >
          📍 Table 3 · Scan & Order
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {t("La Maison Restaurant", "مطعم لا ميزون")}
        </div>
        <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>
          Today's Menu · 47 items
        </div>
      </div>
      <div
        style={{
          padding: "10px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          flex: 1,
          overflow: "hidden",
        }}
      >
        {[
          { e: "🐟", n: "Grilled Salmon", p: "EGP 185", sel: false },
          { e: "🥗", n: "Caesar Salad", p: "EGP 95", sel: true },
          { e: "🍋", n: "Fresh Lemonade", p: "EGP 45", sel: false },
          { e: "🥩", n: "Ribeye Steak", p: "EGP 340", sel: false },
          { e: "🍰", n: "Tiramisu", p: "EGP 75", sel: false },
        ].map((item) => (
          <div
            key={item.n}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: item.sel
                ? "rgba(94,141,255,.12)"
                : "rgba(255,255,255,.04)",
              border: `1px solid ${item.sel ? "rgba(94,141,255,.25)" : "rgba(255,255,255,.06)"}`,
              borderRadius: 12,
              padding: "9px 11px",
            }}
          >
            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.e}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.n}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--gold-2)",
                  fontWeight: 500,
                }}
              >
                {item.p}
              </div>
            </div>
            {item.sel ? (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--gold-2)",
                }}
              >
                ×1
              </span>
            ) : (
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                +
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          background: "linear-gradient(90deg, #7aa0ff 0%, #3e67ff 100%)",
          margin: "0 14px 16px",
          borderRadius: 13,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>
          1 item · EGP 95
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>
          View Order →
        </span>
      </div>
    </div>
  );
}

function KDSScreen() {
  const orders = [
    {
      id: "Table 3 · #47",
      time: "2:14",
      items: ["× 2 Grilled Salmon", "× 1 Caesar Salad", "× 3 Lemonade"],
      type: "new",
    },
    {
      id: "⚡ Table 8 · URGENT",
      time: "12:03",
      items: ["× 1 Beef Burger", "× 2 Sweet Fries"],
      type: "urgent",
    },
    {
      id: "Table 1 · #48",
      time: "0:42",
      items: ["× 1 Margherita", "× 2 Tiramisu"],
      type: "new",
    },
    {
      id: "Table 5 · #45",
      time: "✓ Done",
      items: ["× 3 items served"],
      type: "done",
    },
  ];
  const colors = {
    new: {
      bg: "rgba(34,197,94,.06)",
      border: "rgba(34,197,94,.2)",
      id: "#22C55E",
      time: "rgba(34,197,94,.5)",
    },
    urgent: {
      bg: "rgba(251,146,60,.06)",
      border: "rgba(251,146,60,.25)",
      id: "#FB923C",
      time: "rgba(251,146,60,.6)",
    },
    done: {
      bg: "rgba(255,255,255,.03)",
      border: "rgba(255,255,255,.07)",
      id: "var(--text-muted)",
      time: "var(--text-muted)",
    },
  };
  return (
    <div
      style={{
        background: "#071009",
        height: "100%",
        padding: "20px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 9,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#22C55E",
          letterSpacing: ".1em",
          textTransform: "uppercase",
          paddingBottom: 6,
          borderBottom: "1px solid rgba(34,197,94,.15)",
          marginBottom: 2,
        }}
      >
        ● Kitchen Display
      </div>
      {orders.map((o) => {
        const c = colors[o.type];
        return (
          <div
            key={o.id}
            style={{
              background: c.bg,
              border: `1px solid ${c.border}`,
              borderRadius: 10,
              padding: "11px 13px",
              opacity: o.type === "done" ? 0.6 : 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: c.id }}>
                {o.id}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  background: "rgba(255,255,255,.07)",
                  borderRadius: 4,
                  padding: "2px 6px",
                  color: c.time,
                }}
              >
                {o.time}
              </span>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,.5)",
                lineHeight: 1.8,
              }}
            >
              {o.items
                .join("\n")
                .split("\n")
                .map((l, i) => (
                  <div key={i}>{l}</div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AnalyticsScreen() {
  const bars = [35, 52, 38, 88, 95, 70, 60];
  const peak = [3, 4, 5];
  return (
    <div
      style={{
        background: "var(--ink-2)",
        height: "100%",
        padding: "24px 16px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          Admin · Today
        </span>
        <span style={{ fontSize: 9, color: "var(--text-muted)" }}>
          Apr 25, 2026
        </span>
      </div>
      <div style={{ display: "flex", gap: 7, marginBottom: 10 }}>
        {[
          { v: "142", l: "Orders", t: "↑ 18%" },
          { v: "EGP 18k", l: "Revenue", t: "↑ 23%" },
        ].map((m) => (
          <div
            key={m.l}
            style={{
              flex: 1,
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.07)",
              borderRadius: 10,
              padding: "10px 9px",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-.02em",
              }}
            >
              {m.v}
            </div>
            <div
              style={{
                fontSize: 8,
                color: "var(--text-muted)",
                fontWeight: 500,
                marginTop: 2,
              }}
            >
              {m.l}
            </div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 600,
                color: "#22C55E",
                marginTop: 5,
              }}
            >
              {m.t}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.06)",
          borderRadius: 10,
          padding: "12px 10px 8px",
          marginBottom: 8,
        }}
      >
        <div
          style={{ fontSize: 8, color: "var(--text-muted)", marginBottom: 8 }}
        >
          Revenue — Last 7 days
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 4,
            height: 55,
          }}
        >
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRadius: "3px 3px 0 0",
                background: peak.includes(i)
                  ? "var(--gold)"
                  : "rgba(94,141,255,.3)",
                height: `${h}%`,
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 7 }}>
        {[
          { v: "4.2m", l: "Avg. Time", t: "↓ 68%" },
          { v: "94%", l: "Satisfaction", t: "↑ 12%" },
        ].map((m) => (
          <div
            key={m.l}
            style={{
              flex: 1,
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.07)",
              borderRadius: 10,
              padding: "10px 9px",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              {m.v}
            </div>
            <div
              style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 2 }}
            >
              {m.l}
            </div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 600,
                color: "#22C55E",
                marginTop: 5,
              }}
            >
              {m.t}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      className="hero-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 124,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HeroCanvas />

      {/* Gradient BG */}
      <div
        className="hero-bg"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 55% at 50% -5%, rgba(94,141,255,.18) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 15% 80%, rgba(110,231,255,.08) 0%, transparent 60%)",
          animation: "none",
        }}
      />

      {/* Horizontal gold line */}
      <div
        className="hero-line"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(1180px, calc(100% - 96px))",
          transform: "translateX(-50%)",
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(94,141,255,.28) 20%, rgba(110,231,255,.6) 44%, transparent 54%, transparent 100%)",
          pointerEvents: "none",
          animation: "line-reveal 1.5s cubic-bezier(0.16,1,0.3,1) 1.2s both",
        }}
      />

      {/* Content */}
      <div
        className="hero-copy"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 860,
          padding: "0 24px",
        }}
      >
        <div
          style={{
            animation: "rise .9s cubic-bezier(0.16,1,0.3,1) .2s both",
            opacity: 0,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "rgba(94,141,255,.08)",
              border: "1px solid rgba(94,141,255,.2)",
              borderRadius: "var(--r-full)",
              padding: "7px 16px 7px 8px",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #7aa0ff 0%, #3e67ff 100%)",
                color: "#fff",
                borderRadius: "var(--r-full)",
                padding: "3px 10px",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              NEW
            </span>
            <span
              style={{ fontSize: 13, fontWeight: 400, color: "var(--gold-3)" }}
            >
              {t("NFC ordering — no app needed", "طلب NFC — بدون تطبيق")}
            </span>
          </div>
        </div>

        <h1
          className="display-heading"
          style={{
            animation: "rise .9s cubic-bezier(0.16,1,0.3,1) .35s both",
            opacity: 0,
            marginBottom: 28,
          }}
        >
          {t("The Restaurant OS that", "نظام المطعم الذي")}{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--gold-2)",
              position: "relative",
            }}
          >
            {t("eliminates", "يلغي")}
            <span
              style={{
                position: "absolute",
                bottom: -4,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg, var(--gold), var(--gold-2))",
                display: "block",
                animation:
                  "underline-reveal 1s cubic-bezier(0.16,1,0.3,1) 1.4s both",
                transformOrigin: "left",
                transform: "scaleX(0)",
              }}
            />
          </em>{" "}
          {t("waiting", "الانتظار")}
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: 560,
            margin: "0 auto 44px",
            fontWeight: 300,
            animation: "rise .9s cubic-bezier(0.16,1,0.3,1) .5s both",
            opacity: 0,
          }}
        >
          {t(
            "Scan a QR. Tap NFC. Order fires to the kitchen instantly. No apps, no friction — just seamless dining built for MENA.",
            "امسح QR. المس NFC. يُرسل الطلب إلى المطبخ فوراً. بدون تطبيقات، بدون احتكاك — فقط تجربة طعام سلسة مبنية لمنطقتنا.",
          )}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
            marginBottom: 72,
            animation: "rise .9s cubic-bezier(0.16,1,0.3,1) .65s both",
            opacity: 0,
          }}
        >
          <a href="#demo" className="btn-gold">
            {t("Book a Free Demo →", "احجز عرضاً مجانياً ←")}
          </a>
          <a href="#how" className="btn-outline">
            {t("See how it works", "كيف يعمل؟")}
          </a>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
            animation: "rise .9s cubic-bezier(0.16,1,0.3,1) .8s both",
            opacity: 0,
          }}
        >
          {[
            t("200+ restaurants", "200+ مطعم"),
            t("Setup in 24 hours", "إعداد في 24 ساعة"),
            t("4.9 ★ rating", "تقييم 4.9 ★"),
            t("Arabic + English", "عربي + إنجليزي"),
          ].map((item, i, arr) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: i < arr.length - 1 ? 24 : 0,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                <span style={{ color: "var(--gold-2)", fontSize: 11 }}>✦</span>
                {item}
              </span>
              {i < arr.length - 1 && (
                <span
                  style={{ width: 1, height: 16, background: "var(--line-2)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Phone Cluster */}
      <div
        className="hero-cluster"
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: 72,
          marginBottom: -100,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 16,
          perspective: 1000,
        }}
      >
        {/* Notification */}
        <div
          style={{
            position: "absolute",
            top: -130,
            right: -100,
            zIndex: 20,
            background: "rgba(14,12,8,.9)",
            border: "1px solid var(--line-2)",
            borderRadius: 14,
            padding: "11px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,.5)",
            animation:
              "notif-enter .8s cubic-bezier(0.34,1.56,0.64,1) 2s both, float-notif 4s ease-in-out 2.8s infinite",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(94,141,255,.12)",
              border: "1px solid rgba(94,141,255,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            ⚡
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              {t("New order — Table 7", "طلب جديد — طاولة 7")}
            </div>
            <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
              3 items · Just now
            </div>
          </div>
        </div>

        {/* KDS Phone */}
        <PhoneFrame
          className="hero-phone hero-phone-left"
          style={{
            width: 195,
            height: 400,
            animation: "float-l 5s ease-in-out infinite",
            opacity: 0.85,
          }}
        >
          <KDSScreen />
        </PhoneFrame>

        {/* Center: Ordering App */}
        <PhoneFrame
          className="hero-phone hero-phone-center"
          style={{
            width: 230,
            height: 470,
            zIndex: 3,
            animation: "float-c 4.5s ease-in-out infinite .5s",
          }}
        >
          <OrderingScreen t={t} />
        </PhoneFrame>

        {/* Analytics Phone */}
        <PhoneFrame
          className="hero-phone hero-phone-right"
          style={{
            width: 195,
            height: 400,
            animation: "float-r 5.5s ease-in-out infinite 1s",
            opacity: 0.85,
          }}
        >
          <AnalyticsScreen />
        </PhoneFrame>

        {/* Floating cards */}
        {[
          {
            style: {
              left: -80,
              top: 80,
              animation: "float-card-1 5s ease-in-out infinite",
            },
            label: "Daily Revenue",
            val: "+31%",
            sub: "↑ vs last month",
            subColor: "#6ee7ff",
          },
          {
            style: {
              right: -70,
              top: 120,
              animation: "float-card-2 5.5s ease-in-out infinite .7s",
            },
            label: "Order Speed",
            val: "4.2m",
            sub: "✦ 68% faster",
            subColor: "var(--gold-2)",
          },
          {
            style: {
              left: -60,
              bottom: 60,
              animation: "float-card-3 4.8s ease-in-out infinite .3s",
            },
            label: "Satisfaction",
            val: "94%",
            sub: "★★★★★",
            subColor: "#6ee7ff",
          },
        ].map((c) => (
          <div
            className="hero-float-card"
            key={c.label}
            style={{
              position: "absolute",
              ...c.style,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              backdropFilter: "blur(16px)",
              borderRadius: 16,
              padding: "12px 16px",
              boxShadow: "0 8px 32px rgba(0,0,0,.4)",
              zIndex: 5,
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: ".06em",
                marginBottom: 6,
              }}
            >
              {c.label}
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-.03em",
              }}
            >
              {c.val}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: c.subColor,
                marginTop: 3,
              }}
            >
              {c.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
