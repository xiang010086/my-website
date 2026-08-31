import { works } from "../data/content";
import { FadeUp } from "./motion";
import SectionHeading from "./SectionHeading";
import WorkCard from "./WorkCard";

/** 作品完整内容：放在整页弹层里展示（首页只留三个入口块） */
export default function Works() {
  const [workflow, aikefu, ieagent, xiaoju, charity] = works;
  return (
    <>
      <SectionHeading
        kicker="客户交付"
        title={["交付的都不是 Demo，", "是跑在业务里的东西"]}
        desc="最近 4 个月的交付：客户的项目、个人的作品、创业的方向。每一个都从想法走到了上线。"
      />
      <FadeUp className="mb-8">
        <WorkCard work={workflow} />
      </FadeUp>
      {/* 两列独立堆叠：高矮卡片错开配对，避免行对齐留空洞 */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <FadeUp>
            <WorkCard work={aikefu} />
          </FadeUp>
          <FadeUp delay={0.05}>
            <WorkCard work={ieagent} />
          </FadeUp>
        </div>
        <div className="flex flex-col gap-8">
          <FadeUp delay={0.1}>
            <WorkCard work={charity} />
          </FadeUp>
          <FadeUp delay={0.15}>
            <WorkCard work={xiaoju} />
          </FadeUp>
        </div>
      </div>
    </>
  );
}
