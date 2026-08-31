import { hackathons } from "../data/content";
import { FadeUp, ClipReveal, Parallax } from "./motion";
import SectionHeading from "./SectionHeading";

/** 黑客松完整内容：放在整页弹层里展示 */
export default function Hackathons() {
  return (
    <>
      <SectionHeading
        kicker="黑客松"
        title={["黑客松常客，", "放出来的都是奖"]}
        desc="黑客松是我保持手感和验证想法的方式——用最短的时间，把一个想法打到能演示、能被评委认可的程度。"
      />

      <FadeUp className="mb-10">
        <span className="inline-block rounded-full border border-ink/25 bg-paper px-5 py-2 text-sm font-bold">
          {hackathons.kicker}
        </span>
      </FadeUp>

      <div className="grid gap-8 md:grid-cols-2">
        {hackathons.items.map((item, i) => (
          <FadeUp key={item.eventName} delay={0.08 * i}>
            <article className="group h-full overflow-hidden rounded-3xl border border-ink/12 bg-paper shadow-[0_14px_40px_rgba(38,32,26,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(38,32,26,0.14)]">
              <div className="overflow-hidden border-b border-ink/10">
                <ClipReveal delay={0.1 * i}>
                  <Parallax amount={18}>
                    <img
                      src={item.photo}
                      alt={item.eventName}
                      loading="lazy"
                      className="aspect-[16/9] w-full scale-[1.12] object-cover"
                    />
                  </Parallax>
                </ClipReveal>
              </div>
              <div className="p-6 md:p-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-sun/25 px-3 py-1 text-sm font-black text-[#8a5b00]">
                  🏆 {item.award}
                </span>
                <h3 className="mt-4 text-lg font-black leading-snug md:text-xl">{item.eventName}</h3>
                <p className="mt-2 text-sm text-ink/65">{item.note}</p>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </>
  );
}
