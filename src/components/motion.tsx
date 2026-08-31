import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 进视口揭示标记：IntersectionObserver 触发 + 1.2s 超时兜底。
 * 弹层、被 transform 的祖先等场景下 IO 偶发不回调，兜底保证内容永不卡在隐藏态。
 */
function useReveal(amount = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  return { ref, shown: inView };
}

/** 逐字遮罩揭示：字符一个个从遮罩里升起（首屏大标题用，对标参考站逐字母入场） */
export function Letters({
  text,
  className,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="inline" aria-hidden>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${className ?? ""}`}
            initial={reduce ? false : { y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease: EASE }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** 逐字填充：文字随滚动从浅灰一个个「点亮」（对标参考站滚动逐词显影） */
function FillChar({
  ch,
  range,
  progress,
  className,
}: {
  ch: string;
  range: [number, number];
  progress: MotionValue<number>;
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.5, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${className ?? ""}`}>
      {ch}
    </motion.span>
  );
}

export function WordFill({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.45"],
  });

  if (reduce) {
    return (
      <p ref={ref} className={`relative ${className ?? ""}`}>
        {text}
      </p>
    );
  }

  const chars = Array.from(text);
  return (
    <p ref={ref} className={`relative ${className ?? ""}`}>
      {chars.map((ch, i) => {
        const start = i / chars.length;
        const end = Math.min(1, start + 2 / chars.length);
        return <FillChar key={i} ch={ch} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
}

/**
 * 文字逐行遮罩揭示：每行包一层 overflow-hidden，内部从 115% 升起。
 * 参考站手法：文字块进视口约 15% 才触发，读起来「是有意的」。
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  as: Tag = "div",
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p";
}) {
  const Component = Tag as "div";
  const reduce = useReducedMotion();
  const { ref, shown } = useReveal(0.25);
  return (
    <Component ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block will-change-transform ${lineClassName ?? ""}`}
            initial={reduce ? false : { y: "118%" }}
            animate={shown ? { y: "0%" } : undefined}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

/**
 * 硬边 clip-mask 图片揭示：图片一露头就开始，自下而上展开 + 轻微缩放沉降。
 * 参考站手法：素材用 clip-mask、一进入就触发（threshold ~0）。
 */
export function ClipReveal({
  children,
  className,
  delay = 0,
  scaleFrom = 1.18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  scaleFrom?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, shown } = useReveal(0.1);
  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className ?? ""}`}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      animate={shown ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      transition={{ duration: 1, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.div
        initial={reduce ? false : { scale: scaleFrom }}
        animate={shown ? { scale: 1 } : undefined}
        transition={{ duration: 1.2, delay, ease: EASE }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * scroll-driven 微视差：元素随滚动在 ±amount px 内反向漂移。
 * rAF 逐帧读滚动位置写 transform，参考站的核心手法。
 */
export function Parallax({
  children,
  className,
  amount = 36,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [amount, -amount]);
  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <motion.div style={{ y }} className="h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/** 淡入上移（正文块的「subtle reveal」） */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, shown } = useReveal(0.12);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
