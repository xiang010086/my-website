import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import CursorTrail from "./components/CursorTrail";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IntroStatement from "./components/IntroStatement";
import ThreeBlocks from "./components/ThreeBlocks";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SectionOverlay from "./components/SectionOverlay";
import Works from "./components/Works";
import Hackathons from "./components/Hackathons";
import Community from "./components/Community";
import { DivinationScene } from "./components/Divination";
import { smoothScrollTo } from "./lib/scroll";

type OverlayId = "works" | "hackathons" | "community" | null;

const OVERLAY_META: Record<
  Exclude<OverlayId, null>,
  { kicker: string; title: string; Content: () => React.JSX.Element }
> = {
  works: { kicker: "01", title: "客户交付", Content: Works },
  hackathons: { kicker: "02", title: "黑客松", Content: Hackathons },
  community: { kicker: "03", title: "社区活动", Content: Community },
};

export default function App() {
  const [divOpen, setDivOpen] = useState(false);
  const [overlay, setOverlay] = useState<OverlayId>(null);

  // 全站锚点接管：作品/黑客松/社区 → 打开整页弹层；其余 → 缓动滚动
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
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip">
        <div data-page-shell>
          <a href="#main-content" className="skip-link">跳到主要内容</a>
          <CursorTrail />
          <Navbar onDivine={() => setDivOpen(true)} />
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <IntroStatement />
            <ThreeBlocks onOpen={(id) => setOverlay(id as OverlayId)} />
            <About />
            <Contact />
          </main>
          <Footer />
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
    </MotionConfig>
  );
}
