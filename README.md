# 王思翔个人网站

这是王思翔（啊翔）的个人作品集网站，用来介绍我的经历、AI 项目交付、黑客松获奖和社区活动。

我是一名创业者、FDE / AI 应用工程师，也是杭州爻联网络科技有限责任公司的主理人。相比展示概念，这个网站更关注一件事：如何把想法真正做成可以运行、验证和持续迭代的产品。

## 在线访问

- [电脑端主页](https://opal-kappa-62.vercel.app/)
- [手机端 H5](https://opal-kappa-62.vercel.app/h5)
- [GitHub 仓库](https://github.com/xiang010086/my-website)

## 网站里有什么

- 个人定位、经历和能力介绍
- 已经真实上线的 AI 项目案例
- 黑客松获奖项目与现场素材
- 杭州 AI 社区活动记录
- 微信、抖音和小红书二维码联系入口
- 滚动揭示、卡片展开、彩色气泡和起卦彩蛋等互动效果
- 独立适配的电脑端页面与手机端 H5 页面

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- qrcode.react
- Vercel

## 本地运行

需要先安装 Node.js 18 或更高版本。

```bash
npm install
npm run dev
```

启动后可以访问：

- 电脑端：`http://localhost:5173/`
- 手机端 H5：`http://localhost:5173/h5.html`

## 检查与构建

```bash
# 代码检查
npm run lint

# TypeScript 检查和生产构建
npm run build

# 本地预览构建结果
npm run preview
```

生产文件会生成在 `dist/` 目录中。

## 项目结构

```text
public/                 图片、视频和二维码等静态素材
src/components/         电脑端与共用页面组件
src/data/content.ts     网站主要文案和项目数据
src/h5/                 手机端 H5 入口与布局
src/App.tsx             电脑端页面入口
index.html              电脑端 HTML 入口
h5.html                 H5 HTML 入口
vercel.json             Vercel 构建与路由配置
```

## 修改网站内容

- 修改个人介绍、项目文案或联系方式：编辑 `src/data/content.ts`
- 更换头像、二维码、项目图片或视频：替换 `public/` 中对应文件
- 修改电脑端页面结构：从 `src/App.tsx` 和 `src/components/` 开始
- 修改手机端页面：从 `src/h5/H5App.tsx` 开始

替换静态资源时尽量保持原文件名，可以减少额外的代码修改。

## 部署方式

网站使用 Vercel 部署，并连接此 GitHub 仓库的 `main` 分支。提交并推送到 `main` 后，Vercel 会自动构建和发布新版本。

```bash
git add .
git commit -m "Update website"
git push origin main
```

部署前建议先运行 `npm run lint` 和 `npm run build`。
