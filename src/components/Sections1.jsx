import { useRef, useEffect } from "react";
import { useLang } from "../hooks/useLang";
import { useRevealRef } from "../hooks/useScrollReveal";

/* ============================================================
   MARQUEE
   ============================================================ */
const logos = [
  "Cairo Grill House",
  "Nola Eatery",
  "Sachi Dubai",
  "The Grill Room",
  "Lemon Tree Café",
  "Crave Kitchen",
  "Ovio Restaurant",
  "Zaatar w Zeit",
  "Abu Mazen",
  "Bab Al Yamen",
];

export function Marquee() {
  const { t } = useLang();
  return (
    <div style={{ padding: "48px 0", overflow: "hidden" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: 28,
        }}
      >
        {t(
          "Trusted by restaurants across MENA",
          "موثوق به في مطاعم الشرق الأوسط وشمال أفريقيا",
        )}
      </div>
      <div
        style={{
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 0,
            whiteSpace: "nowrap",
            animation: "marquee 28s linear infinite",
          }}
        >
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 32,
                padding: "0 32px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(245,239,228,.18)",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </span>
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "rgba(94,141,255,.25)",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HOW IT WORKS
   ============================================================ */
const steps = [
  {
    num: "01",
    icon: "📱",
    en: [
      "Scan or Tap",
      "Guest scans QR or taps NFC. No app, no sign-up. Instant menu access on any device.",
    ],
    ar: [
      "امسح أو المس",
      "يمسح الضيف رمز QR أو يلمس NFC. بدون تطبيق، بدون تسجيل. وصول فوري للقائمة على أي جهاز.",
    ],
  },
  {
    num: "02",
    icon: "🍽️",
    en: [
      "Browse & Order",
      "Beautiful menu with photos, allergens, and smart upsell suggestions. Order in one tap.",
    ],
    ar: [
      "تصفح وأطلب",
      "قائمة جميلة مع صور ومعلومات الحساسية واقتراحات البيع الذكي. اطلب بنقرة واحدة.",
    ],
  },
  {
    num: "03",
    icon: "⚡",
    en: [
      "Kitchen Notified",
      "Order appears on KDS instantly. The waiter is alerted. Zero handwriting, zero errors.",
    ],
    ar: [
      "المطبخ مُبلَّغ",
      "يظهر الطلب على KDS فوراً. النادل مُبلَّغ. لا كتابة يدوية، لا أخطاء.",
    ],
  },
  {
    num: "04",
    icon: "✅",
    en: [
      "Served & Paid",
      "Staff confirms delivery. Guest pays digitally or requests the bill — all from the table.",
    ],
    ar: [
      "قُدِّم ودُفع",
      "الموظف يؤكد التسليم. الضيف يدفع رقمياً أو يطلب الفاتورة — كل ذلك من الطاولة.",
    ],
  },
];

export function HowItWorks() {
  const { isAr, t } = useLang();
  const headerRef = useRevealRef();
  const stepsRef = useRevealRef({ threshold: 0.3 });

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animated");
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stepsRef]);

  return (
    <section
      id="how"
      style={{
        background: "var(--ink)",
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,.025) 0, rgba(255,255,255,.025) 1px, transparent 1px, transparent 80px)",
        }}
      />

      <div className="container">
        <div
          ref={headerRef}
          className="reveal"
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <div className="tag" style={{ marginBottom: 20 }}>
            <span className="tag-dot" />
            {t("How It Works", "كيف يعمل")}
          </div>
          <h2 className="section-heading">
            {t("From scan to ", "من المسح إلى ")}
            <em className="italic-gold">{t("served", "التقديم")}</em>
            {t(" in minutes", " في دقائق")}
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--text-secondary)",
              maxWidth: 500,
              margin: "16px auto 0",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            {t(
              "Four frictionless steps. Maximum satisfaction.",
              "أربع خطوات بلا احتكاك. أقصى رضا.",
            )}
          </p>
        </div>

        {/* Steps grid */}
        <div
          ref={stepsRef}
          className="reveal-scale how-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--line)",
            border: "1px solid var(--line)",
            borderRadius: 32,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Animated progress line */}
          <style>{`
            .how-steps-inner.animated::before {
              animation: progress-line 2s cubic-bezier(0.16,1,0.3,1) .3s forwards;
            }
          `}</style>
          <div
            className="how-steps-inner"
            style={{
              display: "contents",
            }}
          ></div>
          {steps.map((step, i) => (
            <div
              key={i}
              className="step"
              style={{
                background: "var(--ink-3)",
                padding: "40px 32px",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.4s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(26,22,16,.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--ink-3)")
              }
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: 64,
                  fontWeight: 400,
                  lineHeight: 1,
                  color: "rgba(94,141,255,.12)",
                  position: "absolute",
                  top: 20,
                  right: 24,
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 15,
                  background: "rgba(94,141,255,.12)",
                  border: "1px solid rgba(94,141,255,.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 24,
                  boxShadow: "0 0 20px rgba(94,141,255,.12)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 12,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {isAr ? step.ar[0] : step.en[0]}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {isAr ? step.ar[1] : step.en[1]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURES
   ============================================================ */
function FeatCard({ children, style, className }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    ref.current.style.setProperty("--mx", x + "%");
    ref.current.style.setProperty("--my", y + "%");
  };
  return (
    <div
      ref={ref}
      className={`feat-card ${className || ""}`}
      onMouseMove={handleMove}
      style={{
        background: "var(--ink-3)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-xl)",
        overflow: "hidden",
        position: "relative",
        transition: "border-color .4s, box-shadow .4s",
        "--mx": "50%",
        "--my": "50%",
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(94,141,255,.2)";
        el.style.boxShadow =
          "0 0 0 1px rgba(94,141,255,.05) inset, 0 20px 60px rgba(0,0,0,.4)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--line)";
        el.style.boxShadow = "none";
      }}
    >
      <style>{`
        .feat-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at var(--mx, 50%) var(--my, 50%), rgba(94,141,255,.05) 0%, transparent 60%);
          opacity: 0; transition: opacity .4s; pointer-events: none; z-index: 0;
        }
        .feat-card:hover::before { opacity: 1; }
      `}</style>
      {children}
    </div>
  );
}

export function Features() {
  const { t, isAr } = useLang();
  const headerRef = useRevealRef();

  const IconBox = ({ emoji }) => (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 14,
        background: "rgba(94,141,255,.12)",
        border: "1px solid rgba(94,141,255,.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        marginBottom: 22,
      }}
    >
      {emoji}
    </div>
  );

  return (
    <section
      id="features"
      style={{ padding: "160px 0", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(94,141,255,.06) 0%, transparent 70%)",
        }}
      />

      <div className="container" style={{ marginBottom: 32 }}>
        <div
          className="section-image-panel"
          style={{ minHeight: 300, padding: 28 }}
        >
          <div className="section-image-grid" />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1.15fr .85fr",
              gap: 22,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 18,
              }}
            >
              <div>
                <div className="tag" style={{ marginBottom: 18 }}>
                  <span className="tag-dot" />
                  {t("Premium Restaurant View", "عرض المطعم الفاخر")}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(28px, 4vw, 44px)",
                    lineHeight: 1.05,
                    color: "var(--text-primary)",
                    marginBottom: 12,
                  }}
                >
                  {t(
                    "A calmer, faster, more luxurious dining flow.",
                    "تجربة طعام أهدأ وأسرع وأكثر فخامة.",
                  )}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    maxWidth: 520,
                  }}
                >
                  {t(
                    "A visual showcase for the restaurant dashboard, designed to feel premium, modern, and easy to scan.",
                    "واجهة عرض بصرية للوحة المطعم، مصممة لتبدو فاخرة وحديثة وسهلة القراءة.",
                  )}
                </p>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {[
                  { label: t("Table flow", "تدفق الطاولات"), value: "92%" },
                  {
                    label: t("Avg. prep time", "متوسط التحضير"),
                    value: "4.2m",
                  },
                  {
                    label: t("Guest satisfaction", "رضا الضيوف"),
                    value: "4.9",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      minWidth: 140,
                      flex: "1 1 140px",
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.08)",
                      borderRadius: 18,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        marginBottom: 6,
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 28,
                        lineHeight: 1,
                        color: "var(--text-primary)",
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <div
                style={{
                  borderRadius: 22,
                  padding: 18,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                      }}
                    >
                      {t("Live Overview", "نظرة مباشرة")}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginTop: 6,
                      }}
                    >
                      {t(
                        "Orchestrating orders in real time",
                        "تنسيق الطلبات لحظياً",
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 14,
                      background:
                        "linear-gradient(135deg, #7aa0ff 0%, #3e67ff 100%)",
                      boxShadow: "0 18px 40px rgba(62,103,255,.35)",
                    }}
                  />
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  {[
                    {
                      name: t("Orders synced", "تمت مزامنة الطلبات"),
                      value: "128",
                    },
                    {
                      name: t("Ready in kitchen", "جاهز في المطبخ"),
                      value: "18",
                    },
                    {
                      name: t("Waiting tables", "الطاولات المنتظرة"),
                      value: "07",
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 12px",
                        borderRadius: 12,
                        background: "rgba(255,255,255,.03)",
                      }}
                    >
                      <span
                        style={{ fontSize: 12, color: "var(--text-secondary)" }}
                      >
                        {item.name}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          ref={headerRef}
          className="reveal"
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <div className="tag" style={{ marginBottom: 20 }}>
            <span className="tag-dot" />
            {t("Product Features", "ميزات المنتج")}
          </div>
          <h2 className="section-heading">
            {t("Every screen. Every role. ", "كل شاشة. كل دور. ")}
            <em className="italic-gold">{t("Every insight.", "كل رؤية.")}</em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              maxWidth: 480,
              margin: "16px auto 0",
              lineHeight: 1.7,
            }}
          >
            {t(
              "A complete restaurant OS — not just a digital menu.",
              "نظام تشغيل مطعم متكامل — وليس مجرد قائمة رقمية.",
            )}
          </p>
        </div>

        {/* Row 1 */}
        <div
          className="features-grid-primary"
          style={{
            display: "grid",
            gridTemplateColumns: "7fr 5fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          {/* Large: Ordering */}
          <FeatCard className="reveal">
            <div style={{ padding: 36, position: "relative", zIndex: 1 }}>
              <IconBox emoji="📱" />
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 10,
                  letterSpacing: "-.01em",
                }}
              >
                {t("Customer Ordering", "طلبات العملاء")}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {t(
                  "QR & NFC menus that work on any device. No app needed. Stunning UI with photos, allergens, and smart upsell in Arabic and English.",
                  "قوائم QR و NFC تعمل على أي جهاز. لا تطبيق مطلوب. واجهة رائعة مع صور ومعلومات الحساسية والبيع الذكي بالعربية والإنجليزية.",
                )}
              </p>
            </div>
            <div
              style={{
                background: "var(--surface)",
                borderTop: "1px solid var(--line)",
                padding: "28px 36px 0",
                minHeight: 200,
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 260,
                  background: "var(--ink-2)",
                  borderRadius: "16px 16px 0 0",
                  border: "1px solid var(--line-2)",
                  borderBottom: "none",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid var(--line)",
                    background:
                      "linear-gradient(180deg, rgba(94,141,255,.06) 0%, transparent 100%)",
                  }}
                >
                  <div className="live-badge">
                    <span className="live-dot" />
                    Live Menu
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    Table 3 · La Maison
                  </div>
                  <div style={{ fontSize: 9, color: "var(--text-muted)" }}>
                    Tap to order · No app needed
                  </div>
                </div>
                <div style={{ padding: 10 }}>
                  {[
                    { e: "🐟", n: "Grilled Salmon", p: "EGP 185", a: true },
                    { e: "🥩", n: "Ribeye Steak", p: "EGP 340", a: false },
                    { e: "🍕", n: "Margherita Pizza", p: "EGP 140", a: false },
                  ].map((item) => (
                    <div
                      key={item.n}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px",
                        borderRadius: 8,
                        marginBottom: 4,
                        background: item.a
                          ? "rgba(94,141,255,.1)"
                          : "transparent",
                      }}
                    >
                      <span style={{ fontSize: 16, flexShrink: 0 }}>
                        {item.e}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          flex: 1,
                        }}
                      >
                        {item.n}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "var(--gold-2)",
                          fontWeight: 500,
                        }}
                      >
                        {item.p}
                      </span>
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "var(--gold)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        +
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FeatCard>

          {/* KDS */}
          <FeatCard className="reveal delay-2">
            <div style={{ padding: 36, position: "relative", zIndex: 1 }}>
              <IconBox emoji="⚡" />
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 10,
                }}
              >
                {t("Kitchen Display System", "نظام عرض المطبخ")}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {t(
                  "Real-time order routing with priority alerts, prep timers, and station assignment. Your kitchen, orchestrated.",
                  "توجيه الطلبات في الوقت الفعلي مع تنبيهات الأولوية وموقتات التحضير وتعيين المحطات.",
                )}
              </p>
            </div>
            <div
              style={{
                background: "var(--surface)",
                borderTop: "1px solid var(--line)",
                padding: "24px 28px 0",
                minHeight: 180,
              }}
            >
              {[
                {
                  id: "Table 5 · #53",
                  time: "2:14",
                  items: "× 2 Beef Burger · × 1 Sweet Fries",
                  type: "new",
                },
                {
                  id: "⚡ Table 2 · URGENT",
                  time: "11:03",
                  items: "× 1 Pizza Margherita",
                  type: "urgent",
                },
                {
                  id: "Table 7 · #55",
                  time: "0:44",
                  items: "× 3 Grilled Salmon",
                  type: "new",
                },
              ].map((o) => (
                <div
                  key={o.id}
                  style={{
                    background:
                      o.type === "urgent"
                        ? "rgba(251,146,60,.05)"
                        : "rgba(34,197,94,.05)",
                    border: `1px solid ${o.type === "urgent" ? "rgba(251,146,60,.2)" : "rgba(34,197,94,.15)"}`,
                    borderRadius: 12,
                    padding: "12px",
                    marginBottom: 8,
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
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: o.type === "urgent" ? "#FB923C" : "#22C55E",
                      }}
                    >
                      {o.id}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 600,
                        background:
                          o.type === "urgent"
                            ? "rgba(251,146,60,.1)"
                            : "rgba(34,197,94,.1)",
                        borderRadius: 4,
                        padding: "2px 6px",
                        color:
                          o.type === "urgent"
                            ? "rgba(251,146,60,.7)"
                            : "rgba(34,197,94,.6)",
                      }}
                    >
                      {o.time}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-secondary)",
                      lineHeight: 1.8,
                    }}
                  >
                    {o.items}
                  </div>
                </div>
              ))}
            </div>
          </FeatCard>
        </div>

        {/* Row 2: 3 small cards */}
        <div
          className="features-grid-secondary"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {[
            {
              icon: "👤",
              en: [
                "Waiter Dashboard",
                "All tables. All orders. One screen. Service requests, status updates, and real-time routing.",
              ],
              ar: [
                "لوحة تحكم النادل",
                "جميع الطاولات. جميع الطلبات. شاشة واحدة.",
              ],
            },
            {
              icon: "📊",
              en: [
                "Admin Analytics",
                "Revenue trends, peak hours, bestsellers, and staff performance — in real-time.",
              ],
              ar: [
                "تحليلات المدير",
                "اتجاهات الإيرادات وأوقات الذروة والأكثر مبيعاً في الوقت الفعلي.",
              ],
            },
            {
              icon: "🌐",
              en: [
                "Multi-Language",
                "Full Arabic RTL, English, French and more. Menus that speak your guest's language.",
              ],
              ar: [
                "متعدد اللغات",
                "دعم كامل للعربية RTL والإنجليزية والفرنسية والمزيد.",
              ],
            },
          ].map((card, i) => (
            <FeatCard key={i} className={`reveal delay-${i + 1}`}>
              <div style={{ padding: 28, position: "relative", zIndex: 1 }}>
                <IconBox emoji={card.icon} />
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                  }}
                >
                  {isAr ? card.ar[0] : card.en[0]}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {isAr ? card.ar[1] : card.en[1]}
                </p>
                {card.icon === "🌐" && (
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginTop: 20,
                      flexWrap: "wrap",
                    }}
                  >
                    {["العربية ✓", "English ✓", "Français ✓"].map((l) => (
                      <span
                        key={l}
                        style={{
                          background: l.includes("العربية")
                            ? "rgba(94,141,255,.1)"
                            : "rgba(255,255,255,.04)",
                          border: `1px solid ${l.includes("العربية") ? "rgba(94,141,255,.2)" : "var(--line)"}`,
                          borderRadius: 6,
                          padding: "5px 11px",
                          fontSize: 11,
                          color: l.includes("العربية")
                            ? "var(--gold-2)"
                            : "var(--text-muted)",
                          fontWeight: 600,
                        }}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </FeatCard>
          ))}
        </div>
      </div>
    </section>
  );
}
