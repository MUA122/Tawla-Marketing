import { useState, useEffect, useRef } from "react";
import { useLang } from "../hooks/useLang";
import { useRevealRef } from "../hooks/useScrollReveal";
import LogoMark from "./LogoMark";

/* ============================================================
   BENEFITS
   ============================================================ */
export function Benefits() {
  const { t, isAr } = useLang();
  const leftRef = useRevealRef();
  const rightRef = useRevealRef({ threshold: 0.2 });
  const statsRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animated]);

  const benefits = [
    {
      n: "1",
      en: [
        "68% faster order delivery",
        "Orders reach the kitchen instantly — no waiters running back and forth, no delays.",
      ],
      ar: [
        "توصيل الطلبات أسرع بنسبة 68%",
        "تصل الطلبات إلى المطبخ فوراً — بدون نوادل يجرون ذهاباً وإياباً.",
      ],
    },
    {
      n: "2",
      en: [
        "+23% average order value",
        "Smart upsell suggestions and food photography increase what guests order.",
      ],
      ar: [
        "+23% متوسط قيمة الطلب",
        "اقتراحات البيع الذكية وصور الطعام تزيد ما يطلبه الضيوف.",
      ],
    },
    {
      n: "3",
      en: [
        "Zero miscommunication errors",
        "Digital orders eliminate handwriting errors, mishearing, and forgotten modifications.",
      ],
      ar: [
        "صفر أخطاء في التواصل",
        "الطلبات الرقمية تلغي أخطاء الكتابة اليدوية والسوء الفهم.",
      ],
    },
    {
      n: "4",
      en: [
        "Staff focus on hospitality",
        "Freed from order-taking, your team delivers better service and handles more tables.",
      ],
      ar: [
        "الموظفون يركزون على الضيافة",
        "بعد التحرر من أخذ الطلبات، يقدم فريقك خدمة أفضل.",
      ],
    },
  ];

  const metrics = [
    { label: t("Order time reduction", "تقليل وقت الطلب"), val: "68%", w: 68 },
    { label: t("Customer satisfaction", "رضا العملاء"), val: "94%", w: 94 },
    {
      label: t("Avg. order value boost", "زيادة متوسط قيمة الطلب"),
      val: "23%",
      w: 23,
    },
    {
      label: t("Revenue growth (Month 3)", "نمو الإيرادات (الشهر 3)"),
      val: "31%",
      w: 31,
    },
  ];

  return (
    <section
      style={{
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
        background: "var(--ink-2)",
      }}
    >
      <div className="container">
        <div
          className="benefits-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div ref={leftRef} className="reveal">
            <div className="tag" style={{ marginBottom: 24 }}>
              <span className="tag-dot" />
              {t("Real Results", "نتائج حقيقية")}
            </div>
            <h2 className="section-heading" style={{ marginBottom: 20 }}>
              {t("Built to grow your ", "مبني لتنمية ")}
              <em className="italic-gold">{t("revenue", "إيراداتك")}</em>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                marginBottom: 48,
              }}
            >
              {t(
                "Every feature serves one goal: more orders, faster service, happier guests.",
                "كل ميزة تخدم هدفاً واحداً: المزيد من الطلبات وخدمة أسرع وضيوف أكثر سعادة.",
              )}
            </p>
            {benefits.map((b) => (
              <div
                key={b.n}
                style={{
                  display: "flex",
                  gap: 20,
                  padding: "28px 0",
                  borderBottom: "1px solid var(--line)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.querySelector(
                    ".benefit-num",
                  ).style.background =
                    "linear-gradient(135deg, #7aa0ff 0%, #3e67ff 100%)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.querySelector(
                    ".benefit-num",
                  ).style.background = "transparent")
                }
              >
                <div
                  className="benefit-num"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    border: "1px solid var(--line-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: 18,
                    color: "var(--gold-2)",
                    flexShrink: 0,
                    transition: "background 0.3s, color 0.3s",
                  }}
                >
                  {b.n}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: 6,
                      letterSpacing: "-.01em",
                    }}
                  >
                    {isAr ? b.ar[0] : b.en[0]}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                    }}
                  >
                    {isAr ? b.ar[1] : b.en[1]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Stat card */}
          <div
            ref={rightRef}
            className="reveal delay-2"
            style={{ position: "relative" }}
          >
            <div
              style={{
                background: "var(--ink-3)",
                border: "1px solid var(--line-2)",
                borderRadius: "var(--r-xl)",
                overflow: "hidden",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.03) inset",
              }}
            >
              <div
                style={{
                  padding: 48,
                  background:
                    "linear-gradient(135deg, rgba(94,141,255,.08) 0%, transparent 60%)",
                  borderBottom: "1px solid var(--line)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(94,141,255,.15) 0%, transparent 70%)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 88,
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: "-.05em",
                    color: "var(--text-primary)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  +<span style={{ color: "var(--gold-2)" }}>31</span>%
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: "var(--text-secondary)",
                    marginTop: 12,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {t(
                    "Average revenue increase in first 3 months",
                    "متوسط زيادة الإيرادات في الأشهر الثلاثة الأولى",
                  )}
                </div>
              </div>
              <div ref={statsRef} style={{ padding: "32px 48px" }}>
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 0",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <span
                      style={{ fontSize: 13, color: "var(--text-secondary)" }}
                    >
                      {m.label}
                    </span>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 120,
                          height: 3,
                          background: "rgba(255,255,255,.07)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: 2,
                            background:
                              "linear-gradient(90deg, #7aa0ff, #6ee7ff)",
                            width: animated ? m.w + "%" : "0%",
                            transition:
                              "width 1.5s cubic-bezier(0.16,1,0.3,1) 0.3s",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          minWidth: 36,
                          textAlign: "right",
                        }}
                      >
                        {m.val}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating mini stats */}
            {[
              {
                style: {
                  top: -28,
                  right: -36,
                  animation: "float-c 4s ease-in-out infinite .2s",
                },
                icon: "⚡",
                val: "4.2m",
                label: t("avg order time", "متوسط وقت الطلب"),
              },
              {
                style: {
                  bottom: -24,
                  left: -36,
                  animation: "float-l 5s ease-in-out infinite .8s",
                },
                icon: "📈",
                val: "142",
                label: t("orders today", "طلبات اليوم"),
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  position: "absolute",
                  ...s.style,
                  background: "rgba(14,12,8,.92)",
                  border: "1px solid var(--line-2)",
                  borderRadius: 14,
                  padding: "14px 18px",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,.4)",
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    letterSpacing: "-.02em",
                  }}
                >
                  {s.val}
                </div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const testis = [
  {
    initials: "AM",
    bg: "linear-gradient(135deg,#7aa0ff,#3e67ff)",
    name: "Ahmed Mansour",
    role: "Owner, Cairo Grill House · Egypt",
    en: "Table turnover increased 40% in month one. Guests love the experience and our staff are way less stressed during rush hours.",
    ar: "زاد معدل دوران الطاولات 40% في الشهر الأول. الضيوف يحبون التجربة وموظفونا أقل توتراً بكثير خلال ساعات الذروة.",
  },
  {
    initials: "SA",
    bg: "linear-gradient(135deg,#1A7A4A,#0D4A2D)",
    name: "Sara Al-Rashidi",
    role: "F&B Director, Nola Eatery · Dubai",
    en: "Setup in one afternoon. The Arabic RTL menu looks stunning. International guests switch to English instantly. Tawla just works.",
    ar: "تم الإعداد في بعد ظهر واحد. قائمة العربية RTL رائعة. الضيوف الدوليون يتبدلون إلى الإنجليزية فوراً.",
  },
  {
    initials: "KM",
    bg: "linear-gradient(135deg,#7C3AED,#4C1D95)",
    name: "Khalid Mohammed",
    role: "CEO, Crave Kitchen Group · KSA",
    en: "12 branches from one dashboard is a game changer. Update the menu once, all locations sync instantly. Pure gold.",
    ar: "إدارة 12 فرعاً من لوحة تحكم واحدة هي تغيير جذري. حدّث القائمة مرة واحدة، تتزامن جميع المواقع فوراً.",
  },
  {
    initials: "LB",
    bg: "linear-gradient(135deg,#0F6E8C,#074A5E)",
    name: "Leila Badawi",
    role: "GM, Sachi Restaurant · Beirut",
    en: "Revenue is up 28% and guests tip more because the service feels premium. Tawla pays for itself in the first week.",
    ar: "الإيرادات ارتفعت 28% والضيوف يتركون بقشيشاً أكثر لأن الخدمة تبدو فاخرة. طاولة يُسدّد تكلفته في الأسبوع الأول.",
  },
];

export function Testimonials() {
  const { isAr, t } = useLang();
  const headerRef = useRevealRef();
  const doubled = [...testis, ...testis];

  return (
    <section
      id="testimonials"
      style={{ padding: "160px 0", overflow: "hidden" }}
    >
      <div className="container">
        <div ref={headerRef} className="reveal" style={{ textAlign: "center" }}>
          <div className="tag" style={{ marginBottom: 20 }}>
            <span className="tag-dot" />
            {t("Success Stories", "قصص النجاح")}
          </div>
          <h2 className="section-heading">
            {t("Restaurants ", "المطاعم ")}
            <em className="italic-gold">{t("love", "تحب")}</em>
            {t(" Tawla", " طاولة")}
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              marginTop: 14,
            }}
          >
            {t(
              "Real results from real restaurants across MENA.",
              "نتائج حقيقية من مطاعم حقيقية عبر الشرق الأوسط وشمال أفريقيا.",
            )}
          </p>
        </div>
      </div>
      <div
        style={{
          marginTop: 60,
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="testi-track"
          style={{
            display: "flex",
            gap: 20,
            animation: "testi-scroll 35s linear infinite",
            width: "max-content",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          {doubled.map((testi, i) => (
            <div
              key={i}
              style={{
                width: 380,
                flexShrink: 0,
                background: "var(--ink-3)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-xl)",
                padding: 32,
                transition: "all .4s cubic-bezier(0.16,1,0.3,1)",
                cursor: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(94,141,255,.25)";
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 20px 60px rgba(0,0,0,.4)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--line)";
                el.style.transform = "none";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                {[...Array(5)].map((_, j) => (
                  <span
                    key={j}
                    style={{ color: "var(--gold-2)", fontSize: 13 }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  marginBottom: 24,
                  fontStyle: "italic",
                }}
              >
                <span
                  style={{
                    color: "var(--gold-2)",
                    fontSize: 28,
                    lineHeight: 0,
                    verticalAlign: "-.4em",
                    marginRight: 2,
                  }}
                >
                  "
                </span>
                {isAr ? testi.ar : testi.en}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingTop: 20,
                  borderTop: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: testi.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {testi.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {testi.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      marginTop: 1,
                    }}
                  >
                    {testi.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING
   ============================================================ */
export function Pricing() {
  const { t } = useLang();
  const [annual, setAnnual] = useState(true);
  const headerRef = useRevealRef();

  const plans = [
    {
      name: t("STARTER", "مبتدئ"),
      mo: 49,
      yr: 39,
      period: t("per month / location", "شهرياً / لكل موقع"),
      desc: t(
        "Perfect for single-location restaurants starting with digital ordering.",
        "مثالي للمطاعم ذات الموقع الواحد التي تبدأ بالطلب الرقمي.",
      ),
      features: [
        t("QR ordering (30 tables)", "طلب QR (30 طاولة)"),
        t("Kitchen Display System", "نظام عرض المطبخ"),
        t("Basic analytics", "تحليلات أساسية"),
        t("Arabic + English menus", "قوائم عربية + إنجليزية"),
        t("Email support", "دعم البريد الإلكتروني"),
      ],
      cta: t("Get Started", "ابدأ الآن"),
      featured: false,
    },
    {
      name: "PRO",
      mo: 129,
      yr: 99,
      period: t("per month / location", "شهرياً / لكل موقع"),
      desc: t(
        "The complete OS for growing venues that want every advantage.",
        "النظام الكامل لأماكن الطعام المتنامية التي تريد كل ميزة.",
      ),
      features: [
        t("Unlimited tables + NFC", "طاولات غير محدودة + NFC"),
        t("Advanced analytics & reports", "تحليلات وتقارير متقدمة"),
        t("Waiter & admin dashboards", "لوحات تحكم النادل والمدير"),
        t("Smart upsell engine", "محرك البيع الإضافي الذكي"),
        t("Multi-language (5 langs)", "متعدد اللغات (5 لغات)"),
        t("Priority support + onboarding", "دعم أولوي + تهيئة"),
      ],
      cta: t("Book Demo", "احجز عرضاً"),
      featured: true,
    },
    {
      name: t("ENTERPRISE", "مؤسسي"),
      mo: null,
      yr: null,
      period: t("for chains & franchises", "للسلاسل والامتيازات"),
      desc: t(
        "Multi-location control, white-label options, custom integrations, and dedicated account management.",
        "تحكم متعدد المواقع وخيارات العلامة البيضاء والتكاملات المخصصة.",
      ),
      features: [
        t("Everything in Pro", "كل شيء في Pro"),
        t("White-label branding", "العلامة البيضاء"),
        t("Custom POS integrations", "تكاملات POS مخصصة"),
        t("SLA + dedicated CSM", "SLA + مدير نجاح مخصص"),
        t("On-site training & setup", "تدريب وإعداد في الموقع"),
      ],
      cta: t("Contact Sales", "تواصل مع المبيعات"),
      featured: false,
    },
  ];

  return (
    <section
      id="pricing"
      style={{ padding: "160px 0", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(94,141,255,.06) 0%, transparent 70%)",
        }}
      />
      <div className="container">
        <div
          ref={headerRef}
          className="reveal"
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="tag" style={{ marginBottom: 20 }}>
            <span className="tag-dot" />
            {t("Pricing", "الأسعار")}
          </div>
          <h2 className="section-heading">
            {t("Simple, ", "أسعار ")}
            <em className="italic-gold">{t("transparent", "بسيطة وشفافة")}</em>
            {t(" pricing", "")}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--text-secondary)",
              marginTop: 12,
            }}
          >
            {t(
              "No setup fees. No hidden costs. Cancel anytime.",
              "بدون رسوم إعداد. بدون تكاليف خفية. إلغاء في أي وقت.",
            )}
          </p>
        </div>

        {/* Toggle */}
        <div
          className="reveal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 48,
          }}
        >
          <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            {t("Monthly", "شهري")}
          </span>
          <div
            onClick={() => setAnnual(!annual)}
            style={{
              width: 48,
              height: 26,
              borderRadius: 13,
              background: annual ? "rgba(94,141,255,.3)" : "var(--surface-2)",
              border: "1px solid var(--line-2)",
              cursor: "none",
              position: "relative",
              transition: "background .3s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: annual ? "calc(100% - 21px)" : 3,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7aa0ff 0%, #3e67ff 100%)",
                transition: "left .3s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: "0 2px 8px rgba(94,141,255,.4)",
              }}
            />
          </div>
          <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            {t("Annual", "سنوي")}
          </span>
          <span
            style={{
              background: "rgba(34,197,94,.15)",
              border: "1px solid rgba(34,197,94,.2)",
              color: "#22C55E",
              borderRadius: "var(--r-full)",
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {t("Save 20%", "وفّر 20%")}
          </span>
        </div>

        <div
          className="pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`reveal delay-${i + 1}`}
              style={{
                background: plan.featured
                  ? "linear-gradient(160deg, rgba(94,141,255,.12) 0%, rgba(26,22,16,.9) 50%)"
                  : "var(--ink-3)",
                border: `1px solid ${plan.featured ? "rgba(94,141,255,.3)" : "var(--line)"}`,
                borderRadius: "var(--r-xl)",
                padding: 40,
                position: "relative",
                overflow: "hidden",
                boxShadow: plan.featured
                  ? "0 0 0 1px rgba(94,141,255,.1) inset, 0 20px 60px rgba(0,0,0,.4)"
                  : "none",
                transition: "all .4s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow =
                  "0 24px 80px rgba(0,0,0,.5)" +
                  (plan.featured
                    ? ", 0 0 0 1px rgba(94,141,255,.2) inset"
                    : "");
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "none";
                el.style.boxShadow = plan.featured
                  ? "0 0 0 1px rgba(94,141,255,.1) inset, 0 20px 60px rgba(0,0,0,.4)"
                  : "none";
              }}
            >
              {plan.featured && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background:
                      "linear-gradient(135deg, #7aa0ff 0%, #3e67ff 100%)",
                    color: "#fff",
                    borderRadius: "var(--r-full)",
                    padding: "4px 12px",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    marginBottom: 20,
                  }}
                >
                  ✦ Most Popular
                </div>
              )}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: plan.featured ? "var(--gold-2)" : "var(--text-muted)",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {plan.name}
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: plan.mo ? 56 : 40,
                  fontWeight: 900,
                  letterSpacing: "-.04em",
                  lineHeight: 1,
                  color: "var(--text-primary)",
                  marginBottom: 4,
                }}
              >
                {plan.mo ? (
                  <>
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 400,
                        fontFamily: "'DM Sans', sans-serif",
                        color: "var(--text-secondary)",
                        verticalAlign: "middle",
                      }}
                    >
                      $
                    </span>
                    {annual ? plan.yr : plan.mo}
                  </>
                ) : (
                  t("Custom", "مخصص")
                )}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  marginBottom: 20,
                }}
              >
                {plan.period}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  paddingBottom: 24,
                  borderBottom: `1px solid ${plan.featured ? "rgba(94,141,255,.15)" : "var(--line)"}`,
                  marginBottom: 24,
                }}
              >
                {plan.desc}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 13,
                  marginBottom: 32,
                }}
              >
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.4,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--gold-2)",
                        flexShrink: 0,
                        marginTop: 1,
                        fontSize: 13,
                      }}
                    >
                      ✦
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                style={{
                  width: "100%",
                  padding: 15,
                  borderRadius: "var(--r-full)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "none",
                  border: plan.featured ? "none" : "1px solid var(--line-2)",
                  background: plan.featured
                    ? "linear-gradient(135deg, #7aa0ff 0%, #3e67ff 100%)"
                    : "transparent",
                  color: plan.featured ? "#fff" : "var(--text-secondary)",
                  boxShadow: plan.featured
                    ? "0 8px 32px rgba(94,141,255,.3)"
                    : "none",
                  transition: "all .3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = ".85";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "none";
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
export function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  const headerRef = useRevealRef();
  const listRef = useRevealRef();

  const faqs = [
    {
      q: t(
        "Do customers need to download an app?",
        "هل يحتاج العملاء تحميل تطبيق؟",
      ),
      a: t(
        "No — Tawla is 100% browser-based. Scan QR or tap NFC and the menu opens instantly. No app, no account required.",
        "لا — طاولة يعمل بالمتصفح بنسبة 100%. امسح QR أو المس NFC وتفتح القائمة فوراً. بدون تطبيق، بدون حساب.",
      ),
    },
    {
      q: t("How long does setup take?", "كم يستغرق الإعداد؟"),
      a: t(
        "Most restaurants are fully live within 24 hours. We handle menu setup, QR printing, and staff training as part of onboarding.",
        "تعمل معظم المطاعم خلال 24 ساعة. نتولى إعداد القائمة وطباعة QR وتدريب الموظفين.",
      ),
    },
    {
      q: t(
        "Does it work with my existing POS?",
        "هل يعمل مع نظام نقاط البيع الحالي؟",
      ),
      a: t(
        "Yes. Tawla integrates with Foodics, POSRocket, Toast, Square, and more. Enterprise plans include custom integrations.",
        "نعم. يتكامل طاولة مع فوديكس و POSRocket وتوست وسكوير والمزيد.",
      ),
    },
    {
      q: t(
        "Is the platform available in Arabic?",
        "هل المنصة متوفرة بالعربية؟",
      ),
      a: t(
        "Absolutely. Full RTL Arabic support across the customer menu, KDS, waiter app, and admin dashboard. Built for MENA from day one.",
        "بالتأكيد. دعم كامل للعربية RTL عبر قائمة العميل وKDS وتطبيق النادل. مبني لمنطقتنا من اليوم الأول.",
      ),
    },
    {
      q: t(
        "What happens if the internet goes down?",
        "ماذا يحدث إذا انقطع الإنترنت؟",
      ),
      a: t(
        "Tawla includes offline mode that keeps your KDS running and caches recent orders. Everything syncs automatically when connectivity returns.",
        "يتضمن طاولة وضع عدم الاتصال الذي يبقي KDS يعمل. يتزامن كل شيء تلقائياً عند عودة الاتصال.",
      ),
    },
    {
      q: t("Is there a free trial?", "هل هناك تجربة مجانية؟"),
      a: t(
        "Yes! 30-day free trial, no credit card required. We set up a live pilot in your restaurant so you see real results before committing.",
        "نعم! تجربة مجانية 30 يوماً، بدون بطاقة ائتمان. نقوم بإعداد تجربة تجريبية حية في مطعمك.",
      ),
    },
  ];

  return (
    <section id="faq" style={{ padding: "140px 0" }}>
      <div className="container">
        <div ref={headerRef} className="reveal" style={{ textAlign: "center" }}>
          <div className="tag" style={{ marginBottom: 20 }}>
            <span className="tag-dot" />
            {t("FAQ", "الأسئلة الشائعة")}
          </div>
          <h2 className="section-heading">
            {t("Questions, ", "الأسئلة، ")}
            <em className="italic-gold">{t("answered", "مُجابة")}</em>
          </h2>
        </div>
        <div
          ref={listRef}
          className="reveal faq-list"
          style={{
            maxWidth: 740,
            margin: "60px auto 0",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                background: "var(--ink-3)",
                border: `1px solid ${open === i ? "rgba(94,141,255,.2)" : "var(--line)"}`,
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                transition: "border-color .3s",
                cursor: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "24px 30px",
                  fontSize: 15,
                  fontWeight: 500,
                  color: open === i ? "var(--gold-2)" : "var(--text-primary)",
                  gap: 16,
                  transition: "color .2s",
                }}
              >
                <span>{faq.q}</span>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background:
                      open === i ? "var(--gold-pale)" : "var(--surface-2)",
                    border: `1px solid ${open === i ? "rgba(94,141,255,.2)" : "var(--line)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    color: open === i ? "var(--gold-2)" : "var(--text-muted)",
                    transform: `rotate(${open === i ? 135 : 0}deg)`,
                    transition: "all .3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                >
                  +
                </div>
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  maxHeight: open === i ? 360 : 0,
                  overflow: "hidden",
                  padding: open === i ? "10px 30px 26px" : "0 30px",
                  borderTop:
                    open === i
                      ? "1px solid rgba(255,255,255,.08)"
                      : "1px solid transparent",
                  transition:
                    "max-height .4s cubic-bezier(0.16,1,0.3,1), padding .4s cubic-bezier(0.16,1,0.3,1), border-color .3s",
                }}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */
export function CTA() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const contentRef = useRevealRef();

  const handleSubmit = () => {
    if (!nameRef.current.value || !emailRef.current.value) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    setSubmitted(true);
  };

  return (
    <section
      id="demo"
      style={{
        padding: "180px 0",
        position: "relative",
        overflow: "hidden",
        background: "var(--ink-2)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(94,141,255,.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          animation: "orb-breathe 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(110,231,255,.08) 0%, transparent 70%)",
          top: "20%",
          right: "10%",
          pointerEvents: "none",
          animation: "orb-breathe 8s ease-in-out infinite reverse",
        }}
      />

      <div className="container">
        <div
          ref={contentRef}
          className="reveal"
          style={{ position: "relative", zIndex: 2, textAlign: "center" }}
        >
          <div className="tag" style={{ marginBottom: 24 }}>
            <span className="tag-dot" />
            {t("30-Day Free Trial", "تجربة مجانية 30 يوماً")}
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(44px,7vw,88px)",
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: "-.035em",
              color: "var(--text-primary)",
              margin: "24px 0",
            }}
          >
            {t("Ready to ", "هل أنت مستعد ")}
            <em style={{ fontStyle: "italic", color: "var(--gold-2)" }}>
              {t("transform", "لتحويل")}
            </em>
            <br />
            {t("your restaurant?", "مطعمك؟")}
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              maxWidth: 440,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            {t(
              "Join 200+ restaurants already on Tawla. Setup in under 24 hours.",
              "انضم إلى 200+ مطعم على طاولة بالفعل. إعداد في أقل من 24 ساعة.",
            )}
          </p>

          {/* Form */}
          <div
            style={{
              maxWidth: 500,
              margin: "56px auto 0",
              background: "rgba(255,255,255,.04)",
              border: "1px solid var(--line-2)",
              borderRadius: "var(--r-xl)",
              padding: 40,
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-primary)",
                textAlign: "center",
                marginBottom: 28,
              }}
            >
              {t("Book Your Free Demo", "احجز عرضك المجاني")}
            </div>
            {!submitted ? (
              <>
                {[
                  {
                    ref: nameRef,
                    placeholder: t("Restaurant name", "اسم المطعم"),
                    type: "text",
                    id: "f-name",
                  },
                  {
                    ref: emailRef,
                    placeholder: t("Your email", "بريدك الإلكتروني"),
                    type: "email",
                    id: "f-email",
                  },
                  { placeholder: t("Phone number", "رقم الهاتف"), type: "tel" },
                ].map((f, i) => (
                  <input
                    key={i}
                    ref={f.ref}
                    type={f.type}
                    placeholder={f.placeholder}
                    style={{
                      background: "rgba(255,255,255,.06)",
                      border: "1px solid var(--line-2)",
                      borderRadius: "var(--r-full)",
                      padding: "14px 20px",
                      color: "var(--text-primary)",
                      fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif",
                      outline: "none",
                      width: "100%",
                      marginBottom: 10,
                      transition: "border-color .3s, box-shadow .3s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(94,141,255,.4)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(94,141,255,.06)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--line-2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                ))}
                <select
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid var(--line-2)",
                    borderRadius: "var(--r-full)",
                    padding: "14px 20px",
                    color: "rgba(245,239,228,.5)",
                    fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    width: "100%",
                    marginBottom: 10,
                    WebkitAppearance: "none",
                    cursor: "none",
                  }}
                >
                  <option value="">{t("Venue type", "نوع المطعم")}</option>
                  <option>{t("Restaurant", "مطعم")}</option>
                  <option>{t("Café", "مقهى")}</option>
                  <option>{t("Chain / Franchise", "سلسلة / امتياز")}</option>
                  <option>{t("Hotel F&B", "فندق F&B")}</option>
                </select>
                <button
                  onClick={handleSubmit}
                  style={{
                    width: "100%",
                    padding: 16,
                    borderRadius: "var(--r-full)",
                    background: error
                      ? "linear-gradient(135deg,#C83232,#8B1A1A)"
                      : "linear-gradient(135deg,#7aa0ff 0%,#3e67ff 100%)",
                    color: "#fff",
                    border: "none",
                    cursor: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    boxShadow: "0 8px 32px rgba(94,141,255,.3)",
                    transition: "all .3s",
                    marginTop: 4,
                  }}
                >
                  {error
                    ? t(
                        "Please fill required fields",
                        "يرجى تعبئة الحقول المطلوبة",
                      )
                    : t("Request My Free Demo →", "اطلب عرضي المجاني ←")}
                </button>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    textAlign: "center",
                    marginTop: 16,
                  }}
                >
                  {t(
                    "No credit card required · Response within 2 hours",
                    "لا بطاقة ائتمان · رد خلال ساعتين",
                  )}
                </p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  {t("You're all set!", "تم بنجاح!")}
                </div>
                <div style={{ fontSize: 15, color: "var(--text-secondary)" }}>
                  {t(
                    "We'll be in touch within 2 hours.",
                    "سنتواصل معك خلال ساعتين.",
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

export function Footer() {
  const { t } = useLang();
  const cols = [
    {
      head: t("Product", "المنتج"),
      links: [
        t("Features", "الميزات"),
        t("Pricing", "الأسعار"),
        t("Integrations", "التكاملات"),
        t("Changelog", "سجل التغييرات"),
        t("Roadmap", "خارطة الطريق"),
      ],
    },
    {
      head: t("Company", "الشركة"),
      links: [
        t("About", "عن الشركة"),
        t("Blog", "المدونة"),
        t("Careers", "وظائف"),
        t("Press", "إعلام"),
        t("Contact", "تواصل"),
      ],
    },
    {
      head: t("Resources", "الموارد"),
      links: [
        t("Help Center", "مركز المساعدة"),
        "API Docs",
        "FAQ",
        t("Status", "الحالة"),
        t("Community", "المجتمع"),
      ],
    },
  ];
  return (
    <footer
      style={{
        background: "var(--ink)",
        padding: "100px 0 48px",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="container">
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
            gap: 60,
            marginBottom: 72,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                marginBottom: 16,
              }}
            >
              <LogoMark size={38} />
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 700,
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
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              {t(
                "The smart restaurant operating system. QR & NFC ordering, kitchen routing, and analytics — built for MENA.",
                "نظام تشغيل المطعم الذكي. طلب QR و NFC والتوجيه للمطبخ والتحليلات — مبني لمنطقة الشرق الأوسط وشمال أفريقيا.",
              )}
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.head}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: 20,
                }}
              >
                {col.head}
              </div>
              <ul style={{ listStyle: "none" }}>
                {col.links.map((link) => (
                  <li key={link} style={{ marginBottom: 12 }}>
                    <a
                      href="#"
                      style={{
                        fontSize: 14,
                        color: "rgba(245,239,228,.4)",
                        textDecoration: "none",
                        transition: "color .2s",
                        cursor: "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "var(--text-primary)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "rgba(245,239,228,.4)")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {t(
              "© 2026 Tawla Technologies. All rights reserved.",
              "© 2026 طاولة للتكنولوجيا. جميع الحقوق محفوظة.",
            )}
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              t("Privacy", "الخصوصية"),
              t("Terms", "الشروط"),
              t("Cookies", "الكوكيز"),
            ].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color .2s",
                  cursor: "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--text-secondary)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--text-muted)")
                }
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
