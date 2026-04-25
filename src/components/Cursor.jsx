import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onEnter = (e) => {
      const el = e.target;
      if (
        el.closest(
          'a, button, [data-cursor="hover"], .feat-card, .testi-card, .price-card, .step, .faq-item, .phone-frame',
        )
      ) {
        setHovering(true);
      }
    };
    const onLeave = () => setHovering(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const dotStyle = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9999,
    transform: `translate(-50%, -50%) scale(${clicking ? 0.7 : 1})`,
    width: hovering ? "6px" : "12px",
    height: hovering ? "6px" : "12px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7aa0ff 0%, #6ee7ff 100%)",
    transition:
      "width 0.3s var(--ease), height 0.3s var(--ease), transform 0.15s",
    left: 0,
    top: 0,
  };
  const ringStyle = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9998,
    transform: "translate(-50%, -50%)",
    width: hovering ? "60px" : "40px",
    height: hovering ? "60px" : "40px",
    borderRadius: "50%",
    border: `1px solid ${hovering ? "rgba(94,141,255,0.3)" : "rgba(94,141,255,0.5)"}`,
    transition:
      "width 0.5s var(--ease), height 0.5s var(--ease), border-color 0.3s",
    left: 0,
    top: 0,
  };

  return (
    <>
      <div ref={dotRef} style={dotStyle} />
      <div ref={ringRef} style={ringStyle} />
    </>
  );
}
