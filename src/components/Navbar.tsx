import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { divination } from "../data/content";

const LINKS = [
  { href: "#works", label: "作品" },
  { href: "#hackathons", label: "获奖" },
  { href: "#community", label: "社区" },
  { href: "#about", label: "关于" },
];

export default function Navbar({ onDivine }: { onDivine: () => void }) {
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.2 });

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5 md:pt-4">
      <nav className="pointer-events-auto relative mx-auto flex max-w-6xl items-center justify-between overflow-hidden rounded-[1.35rem] border border-ink/10 bg-paper/80 px-3 py-2 shadow-[0_12px_40px_rgba(38,32,26,0.09)] backdrop-blur-xl md:px-4">
        <div className="flex items-center gap-2.5">
          <motion.button
            onClick={onDivine}
            aria-label={divination.heroHint}
            title={divination.heroHint}
            className="grid h-10 w-10 place-items-center rounded-xl bg-ink outline-none"
            whileHover={{ rotate: -12, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <img src="/shell.webp" alt="" className="h-8 w-8 object-contain" />
          </motion.button>
          <a href="#top" className="leading-none">
            <span className="block text-sm font-black tracking-tight">王思翔</span>
            <span className="mt-1 block font-mono text-[8px] font-bold tracking-[0.18em] text-ink/65">AI DELIVERY</span>
          </a>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${isActive ? "text-paper" : "text-ink/65 hover:text-ink"}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-xl bg-coral px-4 py-2.5 text-sm font-black text-ink shadow-[inset_0_-2px_0_rgba(0,0,0,0.16)] transition-transform hover:-translate-y-0.5"
        >
          联系合作 <span className="transition-transform group-hover:translate-x-1">↗</span>
        </a>
        <motion.span className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-coral" style={{ scaleX: progress }} aria-hidden />
      </nav>
    </header>
  );
}
