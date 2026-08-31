import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { WordFill } from "./motion";

const STATS = [
  { no: "05", label: "真实项目上线", color: "bg-coral" },
  { no: "02", label: "黑客松奖项", color: "bg-jade" },
  { no: "01", label: "一人公司闭环", color: "bg-plum" },
];

export default function IntroStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const topY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);
  const bottomY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-45, 55]);

  return (
    <section ref={ref} className="relative min-h-[122svh] bg-ink text-paper">
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden py-24">
        <motion.div style={{ y: topY }} className="absolute -right-16 top-16 font-mono text-[12rem] font-black leading-none text-paper/[0.025] md:text-[22rem]" aria-hidden>
          AI
        </motion.div>
        <motion.div style={{ y: bottomY }} className="absolute -left-24 bottom-8 h-72 w-72 rounded-full border border-coral/25" aria-hidden />

        <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-7 flex items-center gap-3 font-mono text-xs font-bold tracking-[0.28em] text-[#ff8067]">
              <span className="h-px w-10 bg-coral" />
              MY WORKING BELIEF
            </p>
            <div className="max-w-[56rem]">
              {["我相信 AI 时代，", "最稀缺的不是想法，", "而是把想法做成产品的人。", "我恰好是那个人。"].map((line) => (
                <WordFill key={line} text={line} className="text-[1.9rem] font-black leading-[1.45] tracking-[-0.035em] sm:text-[3.1rem] md:text-[3.8rem]" />
              ))}
            </div>
            <p className="mt-8 max-w-xl text-sm font-medium leading-loose text-paper/50 md:text-base">
              从需求、方案、开发到上线，我习惯把模糊问题压成可执行的下一步。不是展示概念，而是交付能运行、能验证、能继续迭代的产品。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:w-52 md:grid-cols-1">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.no}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group flex items-center gap-4 rounded-2xl border border-paper/10 bg-paper/[0.045] p-4 backdrop-blur"
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${stat.color} font-mono text-sm font-black text-paper`}>{stat.no}</span>
                <span className="text-sm font-bold text-paper/70 transition-colors group-hover:text-paper">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
