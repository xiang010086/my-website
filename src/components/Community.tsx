import { community } from "../data/content";
import { FadeUp, Parallax } from "./motion";
import SectionHeading from "./SectionHeading";

const ROTATIONS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-3"];

/** 社区活动完整内容：放在整页弹层里展示 */
export default function Community() {
  return (
    <>
      <SectionHeading
        kicker="社区活动"
        title={["把大家聚在一起"]}
        desc={`${community.host} · ${community.role} · 主题 ${community.theme}。${community.desc}`}
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
        {community.photos.map((photo, i) => (
          <FadeUp
            key={photo}
            delay={0.06 * i}
            className={i < 2 ? "md:col-span-3" : "md:col-span-2"}
          >
            <Parallax amount={i % 2 ? 14 : -14}>
              <figure
                className={`relative bg-paper p-3 pb-5 shadow-[0_14px_36px_rgba(38,32,26,0.1)] transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.03] ${ROTATIONS[i % ROTATIONS.length]}`}
              >
                <img
                  src={photo}
                  alt={`${community.host}活动现场 ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full border border-ink/10 object-cover"
                />
                <figcaption className="mt-2 text-center text-xs font-medium text-ink/65">
                  {community.host} · 活动现场
                </figcaption>
              </figure>
            </Parallax>
          </FadeUp>
        ))}
      </div>
    </>
  );
}
