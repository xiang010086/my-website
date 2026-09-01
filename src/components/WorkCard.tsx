import { useRef, useState } from "react";
import type { Work } from "../data/content";
import { ClipReveal, Parallax, FadeUp } from "./motion";

/** 点击才开始播放的视频（遵循站内原则：一切由用户触发） */
function VideoCard({ work }: { work: Work }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-ink/15 bg-ink ${
        work.portrait ? "mx-auto aspect-[9/16] max-h-[520px]" : "aspect-video"
      }`}
    >
      <video
        ref={videoRef}
        src={work.media}
        poster={work.poster}
        controls={playing}
        playsInline
        preload="metadata"
        onPause={() => setPlaying(false)}
        className="h-full w-full object-contain"
      />
      {!playing && (
        <button
          onClick={play}
          aria-label="播放演示视频"
          className="group absolute inset-0 flex items-center justify-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-ink bg-sun text-2xl shadow-[0_10px_24px_rgba(38,32,26,0.35)] transition-transform group-hover:scale-110">
            ▶
          </span>
          <span className="absolute bottom-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-cream">
            点击播放
          </span>
        </button>
      )}
    </div>
  );
}

const BADGE_STYLES: Record<string, string> = {
  coral: "bg-coral/10 text-coralText",
  jade: "bg-jade/15 text-jadeText",
  plum: "bg-plum/10 text-plumText",
  sun: "bg-sun/25 text-[#8a5b00]",
};

export default function WorkCard({ work }: { work: Work }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/12 bg-paper shadow-[0_14px_40px_rgba(38,32,26,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(38,32,26,0.14)]">
      {work.kind === "video" ? (
        <div className="p-4 pb-0">
          <ClipReveal>
            <VideoCard work={work} />
          </ClipReveal>
        </div>
      ) : (
        <div className={`overflow-hidden border-b border-ink/10 ${work.id === "xiaoju" ? "max-h-[430px]" : ""}`}>
          <ClipReveal>
            <Parallax amount={22}>
              <img
                src={work.media}
                alt={work.title}
                loading="lazy"
                className="w-full scale-[1.14] object-cover object-top"
              />
            </Parallax>
          </ClipReveal>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <FadeUp>
          <span
            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${BADGE_STYLES[work.badgeAccent] ?? BADGE_STYLES.coral}`}
          >
            {work.badge}
          </span>
        </FadeUp>
        <h3 className="mt-4 text-[1.45rem] font-black tracking-tight">{work.title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/70">{work.desc}</p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-ink/10 pt-5">
          <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-ink/50">我的角色</span>
          <strong className="text-right text-sm font-black text-ink/80">{work.role}</strong>
        </div>
        <p className="mt-5 font-mono text-[10px] font-bold tracking-[0.18em] text-ink/50">使用工具 / 技术</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {work.tech.map((t) => (
            <span key={t} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink/70">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
