import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { divination } from "../data/content";
import { smoothScrollTo } from "../lib/scroll";
import { useModalFocus } from "../lib/modal";

type Phase = "shaking" | "coins" | "slip" | "done";

const COIN_SPINS = [1080, 1440, 900]; // 上下翻转，落定正面朝上
const CHARMS = ["爻", "联", "通", "宝"];

/** 三枚铜钱在正中央上下翻转；滑向签阶段时自行淡出 */
function Coins({ leaving }: { leaving: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center gap-5"
      animate={leaving ? { opacity: 0, scale: 0.6, y: 14 } : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {COIN_SPINS.map((spin, i) => (
        <motion.div
          key={i}
          className="coin h-14 w-14 md:h-16 md:w-16"
          initial={{ rotateX: 0, y: -26, opacity: 0, scale: 0.6 }}
          animate={{ rotateX: spin, y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.12, duration: 1.05, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {CHARMS.map((c, j) => (
            <span
              key={c}
              className={
                "coin-char text-[11px] leading-none " +
                ["left-1/2 top-0.5 -translate-x-1/2", "right-0.5 top-1/2 -translate-y-1/2", "bottom-0.5 left-1/2 -translate-x-1/2", "left-0.5 top-1/2 -translate-y-1/2"][j]
              }
            >
              {c}
            </span>
          ))}
          <div className="coin-hole" />
        </motion.div>
      ))}
    </motion.div>
  );
}

/** 竹木签：今日大吉，竖排四个大字 */
function FortuneSlip() {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-10"
      initial={{ x: "-50%", y: "-16%", opacity: 0, scale: 0.35, rotate: -8 }}
      animate={{ x: "-50%", y: "-54%", opacity: 1, scale: 1, rotate: -2 }}
      transition={{ type: "spring", damping: 12, stiffness: 160, mass: 0.9 }}
    >
      <div
        className="flex h-[380px] w-[112px] flex-col items-center justify-between rounded-2xl border-2 border-ink px-2.5 py-3 shadow-hardlg"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(139,94,38,0.12) 0 1.5px, transparent 1.5px 9px), linear-gradient(180deg, #F8EDCB 0%, #F0DCA6 55%, #E2C689 100%)",
        }}
      >
        {/* 竹节：顶 */}
        <div className="flex w-full flex-col items-center">
          <div className="h-2 w-full rounded-t-lg border-b border-[#8B5E26]/30 bg-[#D9B878]/80" />
          <div className="mt-2 h-3.5 w-3.5 rounded-full border-2 border-ink bg-seal" />
        </div>
        {/* 竖排大字 */}
        <div className="flex flex-col items-center gap-3">
          {divination.resultTitle.split("").map((c) => (
            <span key={c} className="font-kai text-[3rem] font-bold leading-none text-seal drop-shadow-[0_1px_0_rgba(139,94,38,0.35)]">
              {c}
            </span>
          ))}
        </div>
        {/* 竹节：底 + 字 + 流苏 */}
        <div className="flex w-full flex-col items-center gap-1.5">
          <span className="text-[13px] font-bold tracking-[0.25em] text-[#6B4A1E]">爻联吉签</span>
          <div className="mt-0.5 flex gap-1">
            <span className="h-4 w-[3px] rounded-b bg-seal/80" />
            <span className="h-5 w-[3px] rounded-b bg-seal/80" />
            <span className="h-4 w-[3px] rounded-b bg-seal/80" />
          </div>
          <div className="h-2 w-full rounded-b-lg border-t border-[#8B5E26]/30 bg-[#D9B878]/80" />
        </div>
      </div>
    </motion.div>
  );
}

const BURSTS = [
  { x: -150, y: -50, delay: 0 },
  { x: 150, y: -80, delay: 0.22 },
  { x: 0, y: -140, delay: 0.44 },
];
const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const angle = (i / 30) * Math.PI * 2;
  const r = 85 + ((i * 53) % 75);
  const strip = i % 3 !== 2;
  const colors = ["#FF5A38", "#FFB930", "#CE2B18", "#2FA88C", "#7C5CFF"];
  return {
    dx: Math.cos(angle) * r,
    dy: Math.sin(angle) * r * 0.8,
    rot: (i * 47) % 360,
    color: colors[i % colors.length],
    cls: strip ? "h-4 w-2 rounded-sm" : "h-2.5 w-2.5 rounded-full",
  };
});

/** 签出现时的烟花 */
function Fireworks({ runId }: { runId: number }) {
  return (
    <div key={runId} className="pointer-events-none absolute inset-0 z-20">
      {BURSTS.map((b, bi) => (
        <div
          key={bi}
          className="absolute left-1/2 top-1/2"
          style={{ transform: `translate(${b.x}px, ${b.y}px)` }}
        >
          {PARTICLES.slice(bi * 10, bi * 10 + 10).map((p, i) => (
            <motion.span
              key={i}
              className={`absolute ${p.cls}`}
              style={{ backgroundColor: p.color }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.35, rotate: p.rot }}
              transition={{ duration: 1, delay: b.delay + i * 0.025, ease: [0.16, 0.84, 0.44, 1] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** 全屏起卦场景：龟壳摇动退场 → 三枚铜钱中央翻转后消失 → 竹木签升起 + 烟花 */
export function DivinationScene({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("shaking");
  const [runId, setRunId] = useState(0);
  const timers = useRef<number[]>([]);
  const { dialogRef, closeRef } = useModalFocus(onClose);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    clearTimers();
    if (reduce) {
      setPhase("done");
      return clearTimers;
    }
    setPhase("shaking");
    timers.current.push(window.setTimeout(() => setPhase("coins"), 1150));
    timers.current.push(window.setTimeout(() => setPhase("slip"), 2550));
    timers.current.push(window.setTimeout(() => setPhase("done"), 3450));
    return clearTimers;
  }, [reduce, runId]);

  // 打开时锁滚动；焦点约束与 ESC 由共享 modal hook 管理。
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const replay = () => setRunId((n) => n + 1);

  const accept = () => {
    onClose();
    window.setTimeout(() => smoothScrollTo("contact"), 80);
  };

  const shaking = phase === "shaking";
  const showCoins = phase === "coins";
  const showSlip = phase === "slip" || phase === "done";

  return (
    <div
      ref={dialogRef}
      className="paper-bg fixed inset-0 z-[60] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="divination-title"
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="关闭"
        className="absolute right-5 top-5 z-30 grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-paper text-lg font-bold shadow-hardsm transition-transform hover:rotate-90"
      >
        ✕
      </button>

      <div className="flex min-h-full flex-col items-center justify-center px-5 py-14">
        {/* 标题 */}
        <h2 id="divination-title" className="text-3xl font-black tracking-tight md:text-4xl">
          {phase === "done" ? divination.resultTitle : "起 卦"}
        </h2>

        {/* 舞台 */}
        <div className="relative mt-6 flex h-[440px] w-full max-w-[340px] items-center justify-center md:h-[500px] md:max-w-[420px]">
          {/* 龟壳：摇完缩小淡出退场 */}
          {(shaking || phase === "coins") && (
            <motion.img
              key={`shell-${runId}`}
              src="/shell.webp"
              alt=""
              className="relative z-0 w-48 md:w-56 drop-shadow-[0_18px_30px_rgba(38,32,26,0.3)]"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={
                shaking
                  ? { opacity: 1, scale: 1, y: [0, -46, 0, -38, 0, -30, 0, -18, 0], rotate: [0, -5, 5, -4, 4, -2, 2, 0] }
                  : { opacity: 0, scale: 0.55, y: 46 }
              }
              transition={
                shaking
                  ? { duration: 1.15, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
            />
          )}

          {/* 摇晃时的火星子 */}
          {shaking && (
            <div key={`spark-${runId}`} className="pointer-events-none absolute inset-0 z-10">
              {[
                { c: "-left-1 top-16", d: 0 },
                { c: "-right-2 top-24", d: 0.18 },
                { c: "left-8 -top-2", d: 0.32 },
                { c: "right-10 bottom-16", d: 0.45 },
              ].map((s, i) => (
                <motion.span
                  key={i}
                  className={`absolute ${s.c} text-2xl`}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.4, 1.15, 0.5] }}
                  transition={{ duration: 0.5, delay: s.d, repeat: 2, repeatDelay: 0.12 }}
                >
                  ✦
                </motion.span>
              ))}
            </div>
          )}

          {/* 铜钱：中央翻转 */}
          {showCoins && <Coins leaving={false} />}

          {/* 竹木签 */}
          {showSlip && <FortuneSlip key={`slip-${runId}`} />}

          {/* 烟花 */}
          {showSlip && !reduce && <Fireworks runId={runId} />}
        </div>

        {/* 状态与结果 */}
        <div role="status" aria-live="polite" aria-atomic="true" className="mt-2 flex min-h-[120px] flex-col items-center justify-start gap-4">
          {phase === "done" ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-base font-bold md:text-lg">{divination.resultNote}</p>
              <p className="text-xs text-ink/65">{divination.brand}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={replay}
                  className="rounded-full border-2 border-ink bg-paper px-5 py-2.5 text-sm font-bold shadow-hardsm transition-transform hover:-translate-y-0.5"
                >
                  {divination.again}
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    accept();
                  }}
                  className="rounded-full border-2 border-ink bg-coral px-5 py-2.5 text-sm font-bold text-ink shadow-hardsm transition-transform hover:-translate-y-0.5"
                >
                  {divination.accept} →
                </a>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-ink/65">
              {shaking ? divination.shakingText : divination.coinsText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
