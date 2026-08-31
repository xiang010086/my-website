import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink py-8 text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 text-xs text-paper/55 md:flex-row md:items-center md:justify-between">
        <p>© 2026 {profile.name} · 杭州爻联网络科技有限责任公司</p>
        <p className="font-mono tracking-[0.16em]">BUILT WITH AI · FINISHED WITH TASTE</p>
        <a href="#top" className="inline-flex min-h-11 w-fit items-center font-black text-paper/75 transition-colors hover:text-sun">回到顶部 ↑</a>
      </div>
    </footer>
  );
}
