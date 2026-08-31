import { motion } from "framer-motion";
import { highlightCards } from "../data/content";
import { FadeUp, MaskLines, Parallax } from "./motion";

const ACCENTS: Record<string, { text: string; bg: string; wash: string }> = {
  coral: { text: "text-coralText", bg: "bg-coral", wash: "bg-coral/10" },
  jade: { text: "text-jadeText", bg: "bg-jade", wash: "bg-jade/10" },
  plum: { text: "text-plumText", bg: "bg-plum", wash: "bg-plum/10" },
};

export default function ThreeBlocks({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 grid gap-5 md:mb-20 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <FadeUp>
              <p className="font-mono text-xs font-bold tracking-[0.28em] text-coralText">SELECTED PROOF · 01—03</p>
            </FadeUp>
            <MaskLines
              as="h2"
              lines={["少讲一点概念，", "多看一点结果。"]}
              className="mt-4 text-[2.6rem] font-black leading-[1.12] tracking-[-0.045em] md:text-[4.4rem]"
            />
          </div>
          <FadeUp delay={0.15}>
            <p className="max-w-sm text-sm font-medium leading-loose text-ink/65 md:text-right">
              三类现场，三种证明。点击任何一张，进入完整案例与真实素材。
            </p>
          </FadeUp>
        </div>

        <div className="space-y-10 md:space-y-16">
          {highlightCards.map((card, index) => {
            const accent = ACCENTS[card.accent] ?? ACCENTS.coral;
            const reverse = index % 2 === 1;
            return (
              <article key={card.id} id={card.id} className="scroll-mt-32">
                <FadeUp y={38}>
                  <motion.button
                    onClick={() => onOpen(card.id)}
                    whileHover="hover"
                    whileTap={{ scale: 0.992 }}
                    className="group grid w-full overflow-hidden rounded-[2rem] border border-ink/10 bg-paper text-left shadow-[0_18px_55px_rgba(38,32,26,.08)] md:min-h-[31rem] md:grid-cols-[1.14fr_.86fr]"
                  >
                    <div className={`relative min-h-[18rem] overflow-hidden ${reverse ? "md:order-2" : ""}`}>
                      <div className="absolute inset-[-30px]">
                        <Parallax amount={24} className="h-full">
                          <motion.img
                            src={card.image}
                            alt={`${card.title}现场`}
                            loading="lazy"
                            className="h-[calc(100%+60px)] w-full object-cover"
                            variants={{ hover: { scale: 1.035 } }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </Parallax>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full border border-paper/30 bg-ink/55 px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-paper backdrop-blur">
                        CASE / {card.no}
                      </span>
                      <motion.span
                        className="absolute bottom-5 right-5 grid h-14 w-14 place-items-center rounded-full bg-paper text-xl font-black text-ink shadow-lg"
                        variants={{ hover: { rotate: -12, scale: 1.08 } }}
                      >
                        ↗
                      </motion.span>
                    </div>

                    <div className={`relative flex flex-col justify-between overflow-hidden p-7 sm:p-9 md:p-11 ${accent.wash}`}>
                      <span className={`absolute -right-7 -top-8 font-mono text-[8rem] font-black leading-none opacity-[0.06] md:text-[11rem] ${accent.text}`} aria-hidden>
                        {card.no}
                      </span>
                      <div className="relative">
                        <p className={`font-mono text-xs font-bold tracking-[0.2em] ${accent.text}`}>REAL-WORLD DELIVERY</p>
                        <h3 className="mt-5 text-[2.2rem] font-black tracking-[-0.04em] md:text-[3rem]">{card.title}</h3>
                        <div className="mt-8 flex items-end gap-3">
                          <span className={`text-[3rem] font-black leading-none md:text-[4rem] ${accent.text}`}>{card.stat}</span>
                          <span className="pb-1 text-sm font-bold text-ink/65">{card.statLabel}</span>
                        </div>
                        <p className="mt-7 max-w-md text-[15px] font-medium leading-[1.9] text-ink/65">{card.desc}</p>
                      </div>
                      <p className="relative mt-10 flex items-center justify-between border-t border-ink/10 pt-5 text-sm font-black">
                        {card.cta}
                        <span className={`h-2.5 w-2.5 rounded-full ${accent.bg}`} />
                      </p>
                    </div>
                  </motion.button>
                </FadeUp>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
