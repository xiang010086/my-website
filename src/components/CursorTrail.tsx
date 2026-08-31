import { useEffect, useRef } from "react";

const PALETTE = ["#FF5A38", "#FFB930", "#2FA88C", "#7C5CFF", "#FF8FA3"];

type Point = { x: number; y: number; life: number; color: string };

/** 鼠标长尾：canvas 上的彩色彗星拖尾（对标 leoparpeix.com 的效果） */
export default function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pts: Point[] = [];
    let last = { x: -999, y: -999 };
    let colorIdx = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < 16) return;
      last = { x: e.clientX, y: e.clientY };
      // 快速移动时多补几个点，尾巴更顺滑
      const extra = Math.min(2, Math.floor(Math.sqrt(dist2) / 40));
      for (let i = 0; i <= extra; i++) {
        const t = i / (extra + 1);
        pts.push({
          x: last.x - dx * t,
          y: last.y - dy * t,
          life: 1,
          color: PALETTE[colorIdx % PALETTE.length],
        });
      }
      colorIdx++;
      if (pts.length > 110) pts.splice(0, pts.length - 110);
      if (!raf && !document.hidden) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    function tick() {
      raf = 0;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = pts.length - 1; i >= 0; i--) {
        pts[i].life -= 0.022;
        if (pts[i].life <= 0) {
          pts.splice(i, 1);
        }
      }
      const n = pts.length;
      for (let i = 0; i < n; i++) {
        const p = pts[i];
        const t = i / Math.max(1, n - 1); // 0 老 → 1 新
        const r = 1 + t * t * 9 * p.life;
        ctx.globalAlpha = p.life * 0.75;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (pts.length && !document.hidden) raf = requestAnimationFrame(tick);
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      } else if (pts.length && !raf) {
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-50 hidden md:block"
      aria-hidden
    />
  );
}
