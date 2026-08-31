import { FadeUp, MaskLines } from "./motion";

/**
 * 版块标题：大号横排，描述用大一号的字。
 * （旧版的竖排侧标签 + 小字描述已按反馈移除。）
 */
export default function SectionHeading({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string[];
  desc?: string;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <FadeUp>
        <span className="font-mono text-xs font-bold tracking-[0.3em] text-coralText md:text-sm">
          {kicker}
        </span>
      </FadeUp>
      <MaskLines
        as="h2"
        lines={title}
        className="mt-3 text-[2.2rem] font-black leading-[1.25] tracking-tight md:mt-4 md:text-[3.1rem]"
        delay={0.05}
      />
      {desc && (
        <FadeUp delay={0.2}>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-loose text-ink/75 md:text-lg">
            {desc}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
