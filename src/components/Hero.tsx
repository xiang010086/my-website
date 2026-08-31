import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/content";
import { Letters } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32">
      <div className="hero-grid absolute inset-0 opacity-70" aria-hidden />
      <motion.div
        className="absolute -right-[18vw] top-[14%] h-[58vw] w-[58vw] rounded-full bg-coral/10 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.08, 1], x: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.08fr_.92fr] md:gap-12">
        <div className="relative z-10">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mb-7 flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.2em] text-ink/65"
          >
            <span className="h-px w-9 bg-coral" />
            WANG SIXIANG · FDE / AI 应用工程师
          </motion.p>

          <h1 className="tracking-[-0.055em]" aria-label="把 AI 的可能性，做成真正落地的产品。">
            <span className="block text-[3.25rem] font-black leading-[0.98] sm:text-[4.4rem] md:whitespace-nowrap md:text-[5rem]">
              <Letters text="把 AI 的可能性，" delay={0.16} stagger={0.035} />
            </span>
            <span className="mt-2 block text-[3.25rem] font-black leading-[0.98] text-coral sm:text-[4.4rem] md:whitespace-nowrap md:text-[5rem]">
              <Letters text="做成真的。" delay={0.48} stagger={0.055} />
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78, ease: EASE }}
            className="mt-8 max-w-[38rem] text-base font-medium leading-[1.9] text-ink/65 md:text-lg"
          >
            {profile.sub}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.92, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#works" className="magnetic-button group bg-ink text-paper">
              看真实交付 <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </a>
            <a href="#contact" className="magnetic-button border border-ink/20 bg-paper/70 text-ink hover:border-ink/50">扫码聊合作</a>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12 flex items-center gap-4 text-xs font-bold text-ink/65"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-ink/15">↓</span>
            向下滚动，看我如何把想法做成产品
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
          className="relative mx-auto w-full max-w-[29rem]"
        >
          <div className="absolute inset-[-9%] rounded-full border border-dashed border-ink/15" aria-hidden />
          <motion.div
            className="absolute inset-[-3%] rounded-full border border-coral/25"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            aria-hidden
          >
            <span className="absolute left-[8%] top-[12%] h-3 w-3 rounded-full bg-coral shadow-[0_0_0_8px_rgba(255,90,56,.12)]" />
            <span className="absolute bottom-[8%] right-[18%] h-2.5 w-2.5 rounded-full bg-jade shadow-[0_0_0_7px_rgba(47,168,140,.14)]" />
          </motion.div>

          <div className="relative overflow-hidden rounded-[2.6rem] border border-ink/10 bg-paper p-3 shadow-[0_30px_90px_rgba(38,32,26,0.16)]">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#eadbc8]">
              <motion.img
                src="/profile-photo.webp"
                alt="王思翔的头像"
                className="aspect-[4/4.35] w-full object-cover object-top"
                initial={reduce ? false : { scale: 1.13, clipPath: "inset(100% 0 0 0)" }}
                animate={{ scale: 1, clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/65 to-transparent px-5 pb-5 pt-16 text-paper">
                <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-paper/60">ONE-PERSON STUDIO</p>
                <p className="mt-1 text-xl font-black">爻联网络 · 王思翔</p>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -bottom-4 right-0 rounded-2xl border border-ink/15 bg-sun px-4 py-3 shadow-[0_12px_30px_rgba(38,32,26,.14)] md:-right-7"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="block font-mono text-[9px] font-bold tracking-[0.18em] text-ink/65">LAST 4 MONTHS</span>
            <span className="mt-1 block text-lg font-black">5 个项目 · 全部上线</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
