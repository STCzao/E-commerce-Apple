import { useEffect, useRef, useState } from "react";

const CursorSpotlight = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = ({ clientX: x, clientY: y }) => {
      if (!ref.current) return;
      ref.current.style.left = `${x}px`;
      ref.current.style.top = `${y}px`;
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [visible]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full transition-opacity duration-700"
      style={{
        opacity: visible ? 1 : 0,
        background: "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 60%)",
      }}
    />
  );
};

export default CursorSpotlight;
