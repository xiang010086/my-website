import { Cpu, Code, Brain, Award, GraduationCap, Briefcase, User, Mail, Phone, MapPin } from "lucide-react";

export const personalInfo = {
  name: "王思翔",
  title: "AI产品经理",
  phone: "183-9547-3614",
  email: "178600869@qq.com",
  locations: ["杭州", "苏州", "深圳"],
  status: "2026届硕士应届生",
  summary: "具备从底层硬件到上层算法完整系统认知的AI产品经理。拥有机器人工程硕士背景，熟练掌握嵌入式开发与电路设计，深刻理解'AI驱动硬件'技术逻辑。热衷于前沿工具探索（Vibe Coding），具备快速将新技术转化为生产力的能力。拥有从需求挖掘到产品落地的完整项目经验，曾主导省级二等奖硬件项目。",
};

export const highlights = [
  {
    title: "硬件工程背景",
    icon: Cpu,
    description: "机器人工程硕士，熟练使用 Keil、嘉立创EDA 进行嵌入式开发与电路设计，具备完整系统认知。",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "前沿工具探索",
    icon: Code,
    description: "热衷于新技术实践，使用 Vibe Coding 探索AI辅助编程与自动化工作流，快速上手新工具。",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "产品落地能力",
    icon: Briefcase,
    description: "拥有从需求挖掘、方案设计到原型落地的完整项目经验，具备优秀的数据分析与跨团队协作能力。",
    color: "bg-purple-50 text-purple-600",
  },
];

export const education = [
  {
    school: "西京学院",
    major: "机械设计制造及其自动化",
    degree: "硕士",
    period: "2023.09 - 2026.01",
    details: ["主修课程：机器学习、机器人学、人工智能应用技术"],
  },
  {
    school: "西京学院",
    major: "机器人工程",
    degree: "本科",
    period: "2019.09 - 2023.06",
    details: [],
  },
];

export const projects = [
  {
    id: "drone-project",
    title: "辅助盲人出行的多模态交互飞行器",
    subtitle: "智能硬件",
    role: "项目负责人",
    period: "中国研究生电子设计竞赛陕西省二等奖",
    description: "针对视障人士传统出行工具痛点，开发一款集语音交互、视觉避障、智能跟随于一体的辅助飞行器。",
    videoUrl: "/drone-demo1.mp4",
    tags: ["STM32", "MPU6050", "LD2450", "PID控制", "卡尔曼滤波"],
    details: [
      {
        subtitle: "需求挖掘与产品定位",
        content: "分析传统盲杖局限性，明确产品'便捷、安全、智能'定位。定义了语音控制、定位追踪、智能跟随三大核心功能。",
      },
      {
        subtitle: "硬件与算法方案设计",
        content: "统筹系统设计，负责 STM32F103 主控选型及传感器整合。利用 Keil 进行嵌入式开发，设计卡尔曼滤波与PID控制算法。",
      },
      {
        subtitle: "电路设计与系统测试",
        content: "使用嘉立创EDA完成电路图绘制与PCB设计。组织多场景测试，实现语音识别率 98.5%、悬停精度 ±4.2cm。",
      },
      {
        subtitle: "成果沉淀",
        content: "统筹团队完成赛事全流程，撰写技术论文，斩获中国研究生电子设计竞赛省级二等奖。",
      },
    ],
  },
  {
    id: "child-translator",
    title: "'童年翻译器' AI亲子沟通助手",
    subtitle: "AI for Good 公益黑客松",
    role: "产品负责人",
    period: "黑客松参赛项目 (Demo阶段)",
    description: "参与公益黑客松，利用AI技术解决亲子沟通障碍，打造温暖的沟通桥梁。",
    videoUrl: "", // Placeholder
    tags: ["Axure", "Figma", "AI文生图", "情绪分析"],
    details: [
      {
        subtitle: "需求洞察与场景定义",
        content: "聚焦'家长不懂孩子'痛点，设计了'情绪表达小交互、亲子对话提示词、匿名情绪信箱'三大核心场景。",
      },
      {
        subtitle: "产品原型与方案设计",
        content: "主导产品原型搭建，设计适配家长与孩子的双端交互流程。结合AI特性输出'沟通桥梁'的产品逻辑方案。",
      },
      {
        subtitle: "跨团队协同与演示",
        content: "协同技术与设计团队明确开发优先级，解决需求分歧。负责最终赛事演示，获评委好评。",
      },
    ],
  },
];

export const skills = {
  hardware: {
    category: "硬件与开发",
    items: [
      "Keil 嵌入式软件开发",
      "嘉立创EDA 电路原理图与PCB设计",
      "Python 编程",
      "Vibe Coding 辅助编程",
    ],
    icon: Cpu,
  },
  product: {
    category: "产品与工具",
    items: [
      "Axure / Figma 原型设计",
      "Jira / Trello 需求管理",
      "SQL 数据处理与分析",
    ],
    icon: Briefcase,
  },
  ai: {
    category: "AI认知",
    items: [
      "AI预测模型",
      "智能硬件控制系统",
      "Prompt Engineering",
      "大模型交互逻辑",
    ],
    icon: Brain,
  },
};

export const awards = [
  "省级二等奖 | 第20届中国研究生电子设计竞赛（队长）",
  "省级三等奖 | 第19届中国研究生电子设计竞赛",
  "省级铜奖 | 中国国际“互联网+”大学生创新创业大赛",
  "省级一等奖 | 全国大学生数学建模竞赛",
  "学术成果：第一作者发表EI会议论文1篇；授权实用新型专利2项",
];
