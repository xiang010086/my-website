import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { profile, socials } from "../data/content";
import { FadeUp, MaskLines } from "./motion";

function CopyRail({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = label === "邮箱" ? `mailto:${value}` : `tel:${value.replace(/-/g, "")}`;
    }
  };

  return (
    <button onClick={copy} className="contact-rail group">
      <span className="flex items-center gap-4">
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-paper/55">{label}</span>
        <span className="text-sm font-bold text-paper/80 md:text-base">{value}</span>
      </span>
      <span role="status" aria-live="polite" className={`text-xs font-black transition-colors ${copied ? "text-[#6EE7C8]" : "text-paper/60 group-hover:text-sun"}`}>
        {copied ? "已复制 ✓" : "复制 ↗"}
      </span>
    </button>
  );
}

type QrPreviewRailProps = {
  id: string;
  title: string;
  triggerLabel: string;
  buttonClassName: string;
  children: ReactNode;
  qr: ReactNode;
};

function QrPreviewRail({ id, title, triggerLabel, buttonClassName, children, qr }: QrPreviewRailProps) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const suppressFocusOpen = useRef(false);
  const open = hovered || pinned;
  const closePreview = (restoreFocus = false) => {
    setHovered(false);
    setPinned(false);
    if (!restoreFocus) return;
    suppressFocusOpen.current = true;
    window.setTimeout(() => {
      triggerRef.current?.focus();
      window.setTimeout(() => {
        suppressFocusOpen.current = false;
      }, 0);
    }, 0);
  };
  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => {
        if (!suppressFocusOpen.current) setHovered(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          closePreview();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closePreview(true);
        }
      }}
    >
      <button
        ref={triggerRef}
        onClick={() => setPinned((value) => !value)}
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${triggerLabel}，打开二维码预览`}
        className={`${buttonClassName} ${open ? "border-paper/30 bg-paper/[0.1]" : ""}`}
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[calc(100%+0.75rem)] right-0 z-30 w-[12rem] max-w-[calc(100vw-2rem)] origin-bottom-right rounded-[1.55rem] border border-paper/15 bg-paper p-3 text-ink shadow-[0_28px_90px_rgba(0,0,0,.42)]"
          >
            <div className="flex items-center justify-between gap-2 px-1 pb-2">
              <p className="text-sm font-black">{title}</p>
              <button
                type="button"
                aria-label={`关闭${title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  closePreview(true);
                }}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink/[0.08] text-sm font-black text-ink/65 transition-colors hover:bg-ink hover:text-paper"
              >
                ×
              </button>
            </div>
            {qr}
            <span className="absolute -bottom-2 right-12 h-4 w-4 rotate-45 border-b border-r border-paper/15 bg-paper" aria-hidden />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WeChatRail() {
  return (
    <QrPreviewRail
      id="wechat-qr-preview"
      title="微信扫码加我"
      triggerLabel="微信扫码聊合作"
      buttonClassName="contact-rail group border-jade/40 bg-jade/[0.09]"
      qr={<img src="/wechat-qr.jpg" alt="王思翔的微信二维码" className="aspect-square w-full rounded-[1.25rem] border border-ink/10 object-cover" />}
    >
      <span className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-jade text-sm font-black text-ink">微</span>
          <span className="min-w-0 flex-1 text-left">
            <span className="block text-base font-black text-paper">微信 · 扫码聊合作</span>
          </span>
      </span>
      <span className="hidden shrink-0 rounded-full bg-paper/10 px-3 py-1.5 text-xs font-black text-paper/70 transition-colors group-hover:bg-paper group-hover:text-ink min-[350px]:inline-flex">扫码预览 ↑</span>
      <span className="shrink-0 text-lg font-black text-paper/70 min-[350px]:hidden">↑</span>
    </QrPreviewRail>
  );
}

function SocialRail({ social }: { social: (typeof socials)[number] }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!social.copy) return;
    try {
      await navigator.clipboard.writeText(social.copy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  const className = "group flex w-full min-w-0 items-center justify-between gap-2 rounded-2xl border border-paper/10 bg-paper/[0.045] px-4 py-3.5 text-left transition-[transform,border-color,background-color] hover:-translate-y-1 hover:border-paper/25 hover:bg-paper/[0.075]";
  const inner = <><span className="min-w-0"><span className="block font-mono text-[9px] font-bold tracking-[0.18em] text-paper/55">{social.platform}</span><span className="mt-1 block truncate text-xs font-bold text-paper/75">{social.handle}</span></span><span className="shrink-0 text-paper/55 transition-transform group-hover:-translate-y-1 group-hover:text-sun">{social.qrValue ? "↑" : "↗"}</span></>;
  if (social.qrValue) {
    const previewId = `${social.platform === "抖音" ? "douyin" : "xiaohongshu"}-qr-preview`;
    return (
      <QrPreviewRail
        id={previewId}
        title={`${social.platform}扫码找我`}
        triggerLabel={`${social.platform}账号 ${social.handle}`}
        buttonClassName={className}
        qr={
          <div className="overflow-hidden rounded-[1.25rem] border border-ink/10 bg-white p-2">
            <QRCodeSVG
              value={social.qrValue}
              size={168}
              level="M"
              marginSize={2}
              title={`扫码在${social.platform}搜索王思翔`}
              className="aspect-square h-auto w-full"
            />
          </div>
        }
      >
        {inner}
      </QrPreviewRail>
    );
  }
  if (social.url) return <a className={className} href={social.url} target="_blank" rel="noreferrer">{inner}</a>;
  return <button className={className} onClick={copy}>{copied ? <span role="status" aria-live="polite" className="text-sm font-black text-[#6EE7C8]">已复制，去搜索 ✓</span> : inner}</button>;
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-visible bg-ink pb-24 pt-24 text-paper md:pb-40 md:pt-64">
      <div className="absolute -right-28 top-8 h-80 w-80 rounded-full bg-plum/20 blur-[90px]" aria-hidden />
      <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-coral/15 blur-[90px]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid gap-12 md:grid-cols-[.86fr_1.14fr] md:gap-20">
          <div>
            <FadeUp><p className="font-mono text-xs font-bold tracking-[0.28em] text-sun">LET'S MAKE IT REAL</p></FadeUp>
            <MaskLines as="h2" lines={["有想法，", "就让它落地。"]} className="mt-5 text-[3.2rem] font-black leading-[1.08] tracking-[-0.05em] md:text-[4.2rem]" />
            <FadeUp delay={0.16}>
              <p className="mt-7 max-w-md text-base font-medium leading-loose text-paper/50">AI 项目合作、FDE，或者一个还没想清楚但值得聊聊的方向。加微信请备注来意，看到就会回。</p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1} className="self-end">
            <div className="space-y-3">
              <WeChatRail />
              <CopyRail label="邮箱" value={profile.email} />
              <CopyRail label="电话" value={profile.phone} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {socials.map((social) => <SocialRail key={social.platform} social={social} />)}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
