import { useEffect, useRef } from "react";

const CursorSpotlight = () => {
  const ref = useRef(null);

  useEffect(() => {
    const move = ({ clientX: x, clientY: y }) => {
      if (!ref.current) return;
      ref.current.style.left = `${x}px`;
      ref.current.style.top = `${y}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 65%)",
      }}
    />
  );
};

export default CursorSpotlight;
