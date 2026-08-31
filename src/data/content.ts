/**
 * 全站文案集中在这里改。
 * 标注 [TODO待确认] 的地方是我根据素材推断起草的，需要王思翔本人核实后定稿。
 */

export const profile = {
  name: "王思翔",
  company: "爻联网络",
  titles: ["创业者", "FDE", "AI 应用工程师"],
  slogan: ["连接 AI 的人、方案与可能性，", "让想法真正落地。"],
  sub: "一人公司「爻联网络」主理人。最近 4 个月交付了 5 个 AI 项目，顺手拿了 2 次黑客松奖，还在杭州组织 AI 社区活动。",
  openTo: "AI 项目合作 · FDE",
  phone: "183-9547-3614",
  email: "178600869@qq.com",
  location: "常驻杭州，可远程", // [TODO待确认] 旧资料写的是 杭州/苏州/深圳 三个意向城市
};

/** 首屏之后的宣言段：一句结论，放大呈现 */
export const intro = {
  punch: ["我相信 AI 时代最稀缺的不是想法，", "而是把想法做成产品的人。", "我恰好是那个人。"],
};

export const highlightCards = [
  {
    id: "works",
    no: "01",
    title: "客户交付",
    stat: "5 个",
    statLabel: "AI 项目真实上线",
    desc: "小程序、AI 客服、Agent 工作流——每一个都在真实业务里跑着。",
    accent: "coral",
    image: "/cases/case-workflow.webp",
    cta: "看项目详情",
  },
  {
    id: "hackathons",
    no: "02",
    title: "黑客松",
    stat: "2 次参赛",
    statLabel: "2 次获奖 · 0 次陪跑",
    desc: "具身智能二等奖、最佳商业潜力奖。放出来的，都是拿了奖的。",
    accent: "jade",
    image: "/hackathons/hackathon-embodied.webp",
    cta: "看获奖现场",
  },
  {
    id: "community",
    no: "03",
    title: "社区活动",
    stat: "持续办中",
    statLabel: "把大家聚在一起",
    desc: "生财有术杭州同城聚会组织者，带更多人做出第一个 AI 作品。",
    accent: "plum",
    image: "/community/community-1.webp",
    cta: "看活动现场",
  },
];

export interface Work {
  id: string;
  kind: "image" | "video";
  media: string;
  poster?: string;
  portrait?: boolean;
  badge: string;
  badgeAccent: string;
  title: string;
  desc: string;
  role: string;
  tech: string[];
}

export const works: Work[] = [
  {
    id: "workflow",
    kind: "image",
    media: "/cases/case-workflow.webp",
    badge: "客户项目 · Agent 工作流",
    badgeAccent: "coral",
    title: "企业自媒体文案 Agent 工作流",
    desc: "为自媒体代运营客户搭建的全链路 Agent 流水线：爆款数据采集复盘 → 知识库沉淀 → 飞书选题排期 → AI 生成初稿 → 人工校准 → 多账号分发。AI 负责产能，人负责 taste。",
    role: "独立设计与搭建", // [TODO待确认]
    tech: ["MediaCrawler", "Obsidian", "飞书多维表格", "DeepSeek", "Claude Code"],
  },
  {
    id: "aikefu",
    kind: "image",
    media: "/cases/case-aikefu.webp",
    badge: "客户项目 · AI 客服",
    badgeAccent: "jade",
    title: "听得懂「人话」的公众号 AI 客服",
    desc: "为咖啡品牌公众号接入大模型客服：听懂「不喜欢苦、爱坚果味」这种模糊表达，给出像老店员一样的个性化推荐，常见问题秒回，7×24 在店。",
    role: "从接入到调优全流程", // [TODO待确认]
    tech: ["微信公众号", "大模型", "Prompt 工程"],
  },
  {
    id: "ieagent",
    kind: "video",
    media: "/cases/case-ieagent.mp4",
    poster: "/cases/case-ieagent-poster.webp",
    badge: "创业项目 · AI + 工业",
    badgeAccent: "plum",
    title: "工业 IE Agent",
    desc: "把工业工程（IE）的方法论装进 Agent，让产线效率分析像聊天一样简单。上面是 51 秒演示，完整方案欢迎面聊。",
    role: "发起人 / 产品与交付", // [TODO待确认]
    tech: ["AI Agent", "工业工程", "路演验证"], // [TODO待确认] 技术栈
  },
  {
    id: "xiaoju",
    kind: "image",
    media: "/cases/case-xiaoju.webp",
    badge: "个人作品 · 小程序",
    badgeAccent: "sun",
    title: "小聚集单",
    desc: "聚会怎么选，一张单收齐。从 0 到 1 独立完成设计、开发、上线：选店、点餐、约时间，让每个人都能轻松表达想法，发起人一张单管理全场。",
    role: "独立开发上线",
    tech: ["微信小程序"], // [TODO待确认] 是否用了云开发等技术
  },
  {
    id: "charity",
    kind: "video",
    media: "/cases/case-charity.mp4",
    poster: "/cases/case-charity-poster.webp",
    portrait: true,
    badge: "公益项目 · 小程序",
    badgeAccent: "jade",
    title: "公益小程序",
    desc: "用技术做点有温度的事。公益方向的小程序项目，从需求到上线完整交付，上面是 1 分钟演示。",
    role: "完整交付", // [TODO待确认] 项目名称、服务对象、细节
    tech: ["微信小程序"], // [TODO待确认]
  },
];

export const hackathons = {
  kicker: "2 次参赛 · 2 次获奖 · 0 次陪跑",
  title: "黑客松常客，放出来的都是奖",
  desc: "黑客松是我保持手感和验证想法的方式——用最短的时间，把一个想法打到能演示、能被评委认可的程度。",
  items: [
    {
      award: "二等奖",
      eventName: "青浦科创 · 微成 AI+ 实训营 暨 OPC「超级个体」具身智能长营（一期）",
      note: "具身智能方向 · 奖金 ¥2000", // [TODO待确认] 时间/地点/作品名
      photo: "/hackathons/hackathon-embodied.webp",
    },
    {
      award: "最佳商业潜力奖",
      eventName: "CLab × 效栖湾 seekerone Hackathon",
      note: "「Best Commercial Potential」· 获奖队伍：爱淘汰小分队",
      photo: "/hackathons/hackathon-commercial.webp",
    },
  ],
};

export const community = {
  title: "把大家聚在一起",
  host: "生财有术 · 杭州市同城聚会",
  role: "组织者",
  theme: "「3 小时，用 AI 做出你的第一个作品」",
  desc: "线下带练：让没有技术背景的同学，现场做出第一个能跑起来的 AI 小作品。懂 AI 这件事，一个人会不算会，大家都才会。", // [TODO待确认] 场次/人数/频次
  photos: [
    "/community/community-1.webp",
    "/community/community-2.webp",
    "/community/community-3.webp",
    "/community/community-4.webp",
    "/community/community-5.webp",
  ],
};

export const about = {
  title: "为什么是我",
  chips: ["懂 AI", "会做产品", "能落地交付", "连接社区与资源"],
  lead: "一个人会不算会，大家都才会。我的经历都收在下面的折页里，点一条，展开看看。",
  highlight: ["懂技术的边界，懂工程的落地，", "懂生意的账——三种视角，一个交付。"],
  paragraphs: [
    "简单说，我是一个把 AI 用起来的人。硕士学的是机器人，知道技术能做什么、不能做什么；独立交付过小程序、AI 客服、Agent 工作流，知道工程怎么落地；自己经营一人公司直接对客户负责，知道生意怎么算账。",
    "过去几个月，我把这套打法验证了很多遍：5 个 AI 项目真实上线，2 次黑客松参赛全部获奖，还在杭州持续组织 AI 社区活动，带零基础的同学做出第一个自己的 AI 作品。客户、评委、社区伙伴的正反馈，就是我最好的名片。",
    "接下来想聊的：需要 AI 落地的项目、能独当一面的 FDE，以及一切「想把想法做成产品」的合作。有想法，随时来找我。",
  ],
};

/** 个人经历收纳（手风琴）：默认折叠，点击展开。时间段用「现在/最近/更早」而非虚构日期。 */
export const experience = [
  {
    era: "现在",
    org: "爻联网络 · 一人公司",
    role: "主理人 / FDE",
    bullets: [
      "最近 4 个月交付 5 个 AI 项目：企业自媒体 Agent 工作流、公众号 AI 客服、微信小程序等，全部真实上线。",
      "从需求梳理、方案设计到开发上线独立闭环——一个人就是一支队伍。",
      "客户遍布自媒体、餐饮、工业等行业，擅长把模糊的想法翻译成能跑的系统。",
    ],
  },
  {
    era: "最近",
    org: "黑客松战场",
    role: "2 次参赛 · 2 次获奖",
    bullets: [
      "青浦科创「超级个体」具身智能长营：二等奖，奖金 ¥2000。",
      "CLab × 效栖湾 seekerone Hackathon：最佳商业潜力奖（获奖队伍：爱淘汰小分队）。",
      "用最短时间把想法打到「能演示、能被评委认可」的程度——这是我保持手感的方式。",
    ],
  },
  {
    era: "持续进行",
    org: "生财有术 · 杭州同城聚会",
    role: "组织者 / 线下带练",
    bullets: [
      "主题「3 小时，用 AI 做出你的第一个作品」：带没有技术背景的同学，现场做出第一个能跑起来的 AI 小作品。",
      "懂 AI 这件事，一个人会不算会，大家都才会。",
    ],
  },
  {
    era: "更早",
    org: "机器人工程 · 硕士",
    role: "从硬件到产品",
    bullets: [
      "硬件、算法、产品完整摸过一遍，聊 AI 不飘：知道它真能做什么、不能做什么。",
      "学生时代就把想法做成产品：独立开发上线的「小聚集单」小程序，让聚会选店点餐不再扯皮。",
    ],
  },
];

export type Social = {
  platform: string;
  handle: string;
  action: string;
  url?: string;
  copy?: string;
  qrValue?: string;
};

export const socials: Social[] = [
  {
    platform: "X",
    handle: "@Zoe_Wang_007",
    url: "https://x.com/Zoe_Wang_007",
    action: "去围观",
  },
  {
    platform: "抖音",
    handle: "啊翔超厉害 · 抖音号 dyolb05396p3",
    copy: "dyolb05396p3",
    action: "复制抖音号",
    qrValue: "https://www.douyin.com/search/dyolb05396p3",
  },
  {
    platform: "小红书",
    handle: "啊翔超厉害 · 小红书号 812266630",
    copy: "812266630",
    action: "复制小红书号",
    qrValue: "https://www.xiaohongshu.com/search_result?keyword=812266630",
  },
];

export const divination = {
  heroHint: "点我，摇一卦",
  shakingText: "起卦中……",
  coinsText: "铜钱落定……",
  resultTitle: "今日大吉",
  resultNote: "宜：聊合作 · 启新项目 · 见朋友",
  brand: "爻联网络 · 龟壳认证",
  again: "再摇一次",
  accept: "收下吉签，去加微信",
};
