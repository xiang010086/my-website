import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { about, experience, profile } from "../data/content";
import { EASE, FadeUp, MaskLines } from "./motion";
import SectionHeading from "./SectionHeading";

type ExperienceEntry = (typeof experience)[number];

/** 单条经历：一行折叠（机构+角色+时间段+加号），点击展开职责清单。对标参考站 Professional Experience。 */
function ExperienceItem({
  item,
  open,
  onToggle,
}: {
  item: ExperienceEntry;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-ink/12">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full flex-wrap items-center gap-x-4 gap-y-2 py-6 text-left md:py-7"
      >
        <span className="min-w-0 flex-1 basis-48">
          <span
            className={`block text-xl font-black tracking-tight transition-colors duration-300 md:text-2xl ${
              open ? "text-coralText" : "group-hover:text-coralText"
            }`}
          >
            {item.org}
          </span>
          <span className="mt-1 block text-sm font-bold text-ink/65">{item.role}</span>
        </span>
        <span className="rounded-full bg-cream px-3.5 py-1 text-xs font-bold text-ink/65">
          {item.era}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-xl leading-none transition-colors duration-300 ${
            open
              ? "border-ink bg-sun text-ink"
              : "border-ink/25 group-hover:border-ink group-hover:bg-sun/60"
          }`}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <ul className="space-y-3 pb-7 md:max-w-3xl md:pl-1">
              {item.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-ink/70">
                  <span className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  // 默认展开第一条（对标参考站首条默认 expanded）
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="about" className="bg-plum/10 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker="关于我" title={["为什么是我"]} desc={about.lead} />

        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <FadeUp>
            <div className="flex flex-row flex-wrap gap-3 md:flex-col">
              {about.chips.map((chip, i) => (
                <span
                  key={chip}
                  className={`w-fit rounded-full border border-ink/20 bg-paper/80 px-5 py-2 text-base font-bold ${
                    i % 2 ? "rotate-1" : "-rotate-1"
                  } ${["text-coralText", "text-ink/80", "text-jadeText", "text-[#704900]"][i % 4]}`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </FadeUp>
          <div className="space-y-6 md:max-w-2xl">
            <MaskLines
              lines={about.highlight}
              className="font-editorial text-[1.35rem] font-bold leading-[1.8] tracking-wide text-ink/85"
              stagger={0.12}
            />
            <FadeUp delay={0.15}>
              <p className="text-[15px] leading-loose text-ink/70">{about.paragraphs[0]}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[15px] leading-loose text-ink/70">{about.paragraphs[1]}</p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="text-[15px] leading-loose text-ink/70">{about.paragraphs[2]}</p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="pt-2 text-sm text-ink/65">
                {profile.name} · {profile.company} · {profile.location}
              </p>
            </FadeUp>
          </div>
        </div>

        {/* 个人经历收纳区：默认折叠，点开才看 */}
        <div className="mt-16 md:mt-24">
          <FadeUp className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-editorial text-[1.7rem] font-black tracking-wide md:text-[2.1rem]">
              个人经历
            </h3>
            <span className="rounded-full border border-ink/20 bg-paper px-4 py-1.5 text-xs font-bold text-ink/65">
              {experience.length} 段 · 点击展开
            </span>
          </FadeUp>
          <FadeUp>
            <div className="border-t border-ink/12">
              {experience.map((item, i) => (
                <ExperienceItem
                  key={item.org}
                  item={item}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
