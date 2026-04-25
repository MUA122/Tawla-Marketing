export default function LogoMark({ size = 38 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(10, Math.round(size * 0.28)),
        background:
          "linear-gradient(135deg, rgba(12,18,30,.98) 0%, rgba(6,10,18,.98) 100%)",
        border: "1px solid rgba(135,175,255,.22)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow:
          "0 10px 28px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.08)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 28%, rgba(122,160,255,.38) 0%, transparent 48%), radial-gradient(circle at 78% 70%, rgba(110,231,255,.22) 0%, transparent 42%)",
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        style={{ position: "relative", zIndex: 1 }}
      >
        <defs>
          <linearGradient
            id="twalaLogoRing"
            x1="10"
            y1="8"
            x2="54"
            y2="56"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#8fb0ff" />
            <stop offset="52%" stopColor="#5e8dff" />
            <stop offset="100%" stopColor="#d36cff" />
          </linearGradient>
          <linearGradient
            id="twalaLogoFill"
            x1="20"
            y1="18"
            x2="44"
            y2="52"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#d9e5ff" />
            <stop offset="55%" stopColor="#8aa8ff" />
            <stop offset="100%" stopColor="#c46fff" />
          </linearGradient>
        </defs>
        <path
          d="M22 14h20c6.6 0 12 5.4 12 12v14c0 6.6-5.4 12-12 12H22c-6.6 0-12-5.4-12-12V26c0-6.6 5.4-12 12-12Z"
          stroke="url(#twalaLogoRing)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <rect
          x="7.5"
          y="20"
          width="16"
          height="16"
          rx="3.5"
          fill="rgba(9,14,24,.95)"
          stroke="rgba(198,214,255,.78)"
          strokeWidth="1.6"
        />
        <rect x="10.2" y="22.7" width="3" height="3" rx="0.8" fill="#cfe0ff" />
        <rect x="14.2" y="22.7" width="3" height="3" rx="0.8" fill="#5e8dff" />
        <rect x="18.2" y="22.7" width="3" height="3" rx="0.8" fill="#d36cff" />
        <rect x="10.2" y="26.7" width="3" height="3" rx="0.8" fill="#5e8dff" />
        <rect x="14.2" y="26.7" width="3" height="3" rx="0.8" fill="#cfe0ff" />
        <rect x="18.2" y="26.7" width="3" height="3" rx="0.8" fill="#5e8dff" />
        <path
          d="M32 22c3.8 0 6.8 3 6.8 6.8H25.2c0-3.8 3-6.8 6.8-6.8Z"
          fill="url(#twalaLogoFill)"
        />
        <path
          d="M26 29.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
          stroke="url(#twalaLogoRing)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M32 17.3c2.8 0 5.1 1 6.8 2.6"
          stroke="url(#twalaLogoRing)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M28.2 18.7c1.1-.6 2.4-1 3.8-1s2.7.4 3.8 1"
          stroke="rgba(198,214,255,.88)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="32" cy="18.1" r="1.6" fill="#d9e5ff" />
        <path
          d="M19 39h26"
          stroke="url(#twalaLogoRing)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M24 39v10c0 3.3 2.7 6 6 6h4c3.3 0 6-2.7 6-6V39"
          fill="url(#twalaLogoFill)"
          opacity="0.95"
        />
        <path
          d="M30.2 39v16"
          stroke="rgba(7,11,18,.92)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M28.1 51h7.8"
          stroke="rgba(7,11,18,.88)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
