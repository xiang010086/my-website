import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/content";
import { EASE, Letters } from "../components/motion";
import IntroStatement from "../components/IntroStatement";
import ThreeBlocks from "../components/ThreeBlocks";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SectionOverlay from "../components/SectionOverlay";
import Works from "../components/Works";
import Hackathons from "../components/Hackathons";
import Community from "../components/Community";
import { DivinationScene } from "../components/Divination";
import { smoothScrollTo } from "../lib/scroll";

type OverlayId = "works" | "hackathons" | "community" | null;

const OVERLAY_META: Record<
  Exclude<OverlayId, null>,
  { kicker: string; title: string; Content: () => ReactNode }
> = {
  works: { kicker: "01", title: "客户交付", Content: Works },
  hackathons: { kicker: "02", title: "黑客松", Content: Hackathons },
  community: { kicker: "03", title: "社区活动", Content: Community },
};

/** H5 专属首屏：竖屏居中，名字是绝对主角 */
function H5Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-md flex-col items-center justify-center px-6 pb-10 pt-20 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="inline-flex items-center gap-2 rounded-full border border-ink/25 bg-paper/80 px-4 py-1.5 text-[12px] font-medium text-ink/80"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-jade" />
        </span>
        {profile.openTo}
      </motion.div>

      {/* 名字是绝对主角 */}
      <h1
        className="mt-6 tracking-tight"
        aria-label={`${profile.name}——${profile.slogan.join("")}`}
      >
        <span className="block text-[4.4rem] font-black leading-none">
          <Letters text={profile.name} delay={0.2} stagger={0.09} />
        </span>
        <span className="mt-5 block text-[1.7rem] font-black leading-[1.5]">
          <span className="block">
            <Letters text={profile.slogan[0]} delay={0.5} stagger={0.03} />
          </span>
          <span className="marker mx-auto block w-fit">
            <Letters text={profile.slogan[1]} delay={0.8} stagger={0.04} />
          </span>
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
        className="mt-5 text-sm leading-loose text-ink/70"
      >
        {profile.sub}
      </motion.p>

      {/* 拍立得头像 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative mt-8 w-44"
      >
        <div className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2">
          <div className="tape" />
        </div>
        <div className="overflow-hidden rounded-[1.6rem] border border-ink/15 bg-paper p-1.5 shadow-[0_20px_50px_rgba(38,32,26,0.14)]">
          <div className="overflow-hidden rounded-[1.3rem]">
            <motion.img
              src="/profile-photo.webp"
              alt="王思翔的头像"
              className="aspect-square w-full object-cover"
              initial={{ scale: 1.18, clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ delay: 1.15, type: "spring", damping: 12 }}
          className="absolute -bottom-3 -left-3 rounded-lg border border-ink/20 bg-sun px-2.5 py-1 text-xs font-bold shadow-[0_6px_16px_rgba(38,32,26,0.18)]"
        >
          逢摇必吉 🪙
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
        className="mt-9 flex w-full max-w-xs flex-col gap-3"
      >
        <a
          href="#works"
          className="rounded-full bg-ink px-6 py-3.5 text-[15px] font-bold text-paper transition-all active:scale-[0.98]"
        >
          看看我交付了什么 →
        </a>
        <a
          href="#contact"
          className="rounded-full border border-ink/30 bg-paper/70 px-6 py-3.5 text-[15px] font-bold transition-all active:scale-[0.98]"
        >
          扫码加微信
        </a>
      </motion.div>
    </section>
  );
}

/** H5 顶栏：站标（点它摇一卦）+ 微信按钮 */
function H5TopBar({ onDivine }: { onDivine: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2.5">
        <button
          onClick={onDivine}
          aria-label="点我，摇一卦"
          className="active:scale-95"
        >
          <img
            src="/shell.webp"
            alt="王思翔的主页"
            className="h-10 w-auto drop-shadow-[0_3px_6px_rgba(38,32,26,0.25)]"
          />
        </button>
        <p className="text-sm font-black tracking-tight">{profile.name}</p>
        <a
          href="#contact"
          className="rounded-full border-2 border-ink bg-sun px-3.5 py-1.5 text-xs font-bold shadow-hardsm active:translate-y-0"
        >
          联系我
        </a>
      </div>
    </header>
  );
}

/** H5 底部快捷导航：作品/获奖/社区 原地翻页，关于/联系 平滑滚动 */
function H5BottomNav({ onOpen }: { onOpen: (id: "works" | "hackathons" | "community") => void }) {
  const items: { id: string; label: string }[] = [
    { id: "works", label: "作品" },
    { id: "hackathons", label: "获奖" },
    { id: "community", label: "社区" },
    { id: "about", label: "关于" },
    { id: "contact", label: "联系" },
  ];
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="快捷导航"
    >
      <div className="mx-auto grid max-w-md grid-cols-5">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => {
              if (it.id === "works" || it.id === "hackathons" || it.id === "community") {
                onOpen(it.id);
              } else {
                smoothScrollTo(it.id);
              }
            }}
            className="py-3 text-[13px] font-bold text-ink/75 transition-colors active:text-coral"
          >
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function H5App() {
  const [divOpen, setDivOpen] = useState(false);
  const [overlay, setOverlay] = useState<OverlayId>(null);

  // 锚点接管：作品/黑客松/社区 → 翻页弹层；其余 → 平滑滚动
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      e.preventDefault();
      if (!id) {
        window.scrollTo(0, 0);
        return;
      }
      if (id === "main-content") {
        document.getElementById(id)?.focus({ preventScroll: true });
        smoothScrollTo(id);
        return;
      }
      if (id === "works" || id === "hackathons" || id === "community") {
        setOverlay(id);
        return;
      }
      smoothScrollTo(id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip pb-16">
      <div data-page-shell>
        <a href="#main-content" className="skip-link">跳到主要内容</a>
        <H5TopBar onDivine={() => setDivOpen(true)} />
        <main id="main-content" tabIndex={-1}>
          <H5Hero />
          <IntroStatement />
          <ThreeBlocks onOpen={(id) => setOverlay(id as OverlayId)} />
          <About />
          <Contact />
        </main>
        <Footer />
        <H5BottomNav onOpen={(id) => setOverlay(id)} />
      </div>

      <AnimatePresence>
        {overlay && (
          <SectionOverlay
            key={overlay}
            kicker={OVERLAY_META[overlay].kicker}
            title={OVERLAY_META[overlay].title}
            onClose={() => setOverlay(null)}
          >
            {(() => {
              const Content = OVERLAY_META[overlay].Content;
              return <Content />;
            })()}
          </SectionOverlay>
        )}
      </AnimatePresence>

      {divOpen && <DivinationScene key="divination" onClose={() => setDivOpen(false)} />}
    </div>
  );
}
