import { useEffect, useRef } from "react";

export default function GalaxyCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";

      // Spawn trail particle
      spawnTrail(e.clientX, e.clientY);
    };

    const lerp = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      ring.style.left = ringPos.current.x + "px";
      ring.style.top = ringPos.current.y + "px";
      requestAnimationFrame(lerp);
    };
    lerp();

    const onDown = () => {
      dot.style.transform = "translate(-50%,-50%) scale(0.6)";
      ring.style.transform = "translate(-50%,-50%) scale(1.5)";
      ring.style.borderColor = "rgba(34,211,238,0.8)";
    };
    const onUp = () => {
      dot.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.borderColor = "rgba(124,58,237,0.6)";
    };

    const onEnterLink = () => {
      ring.style.transform = "translate(-50%,-50%) scale(1.8)";
      ring.style.borderColor = "rgba(34,211,238,0.9)";
      dot.style.opacity = "0";
    };
    const onLeaveLink = () => {
      ring.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.borderColor = "rgba(124,58,237,0.6)";
      dot.style.opacity = "1";
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  const spawnTrail = (x: number, y: number) => {
    const trail = document.createElement("div");
    trail.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(167,139,250,0.8);
      pointer-events: none;
      z-index: 9997;
      transform: translate(-50%,-50%);
      transition: all 0.6s ease;
    `;
    document.body.appendChild(trail);
    setTimeout(() => {
      trail.style.opacity = "0";
      trail.style.transform = "translate(-50%,-50%) scale(0)";
    }, 50);
    setTimeout(() => trail.remove(), 700);
  };

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #22d3ee, #7c3aed)",
          transform: "translate(-50%,-50%)",
          transition: "transform 0.15s ease, opacity 0.15s ease",
          boxShadow: "0 0 10px rgba(34,211,238,0.8)",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1.5px solid rgba(124,58,237,0.6)",
          transform: "translate(-50%,-50%)",
          transition: "transform 0.3s ease, border-color 0.3s ease",
          boxShadow: "0 0 15px rgba(124,58,237,0.2)",
        }}
      />
    </>
  );
}