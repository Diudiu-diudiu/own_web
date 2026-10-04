# Starfish 海星自留地

一个以 Markdown 为内容源的个人静态网站，用来记录生活、学习成长与项目作品。网站使用 Astro 构建，不需要服务器或数据库，可直接部署到 GitHub Pages。

> 记录生活，也记录自己的成长。

## 技术栈

- Astro + TypeScript
- Markdown 内容集合与 Front Matter 校验
- 原生 CSS、少量前端 JavaScript
- Astro Sitemap
- GitHub Actions + GitHub Pages

## 本地运行

需要 Node.js 22 或更高版本。

```bash
npm install
npm run dev
```

开发服务器默认地址为 `http://localhost:4321`。

## 构建

```bash
npm run build
```

构建结果位于 `dist/`。`npm run build` 会先运行 Astro 类型与内容检查。

## 部署到 GitHub Pages

1. 把项目推送到 GitHub，并使用 `main` 分支。
2. 打开仓库的 **Settings → Pages**。
3. 在 **Build and deployment** 中，把 Source 设为 **GitHub Actions**。
4. 推送代码后，[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 会自动安装依赖、构建并部署。

工作流会根据仓库名自动设置 GitHub Pages 子路径，因此用户主页仓库和普通项目仓库都能使用。绑定自定义域名时，可在构建环境设置 `SITE_URL` 与 `BASE_PATH`，并按 GitHub Pages 文档添加 `CNAME`。

## 如何新增一篇生活文章

在 [`src/content/life`](src/content/life) 新建 Markdown，例如 `my-new-story.md`：

```markdown
---
title: "一篇新的生活记录"
date: 2026-10-04
category: "日记"
tags: ["日常", "记录"]
cover: "/images/life/my-new-story.jpg"
public: true
description: "一两句话概括这篇文章。"
---

从这里开始写正文。
```

如果暂时没有图片，直接删除 `cover` 这一行即可，页面会自动使用无图布局。

完成后提交：

```bash
git add .
git commit -m "add new life post"
git push
```

GitHub Actions 会自动更新网站。

## 如何添加学习笔记

在 [`src/content/learning`](src/content/learning) 新建 `.md` 文件。字段与生活文章基本相同，另外需要一个学习状态：

```yaml
status: "learning" # 可选 learning / completed / paused
```

## 如何添加项目

在 [`src/content/projects`](src/content/projects) 新建 `.md` 文件：

```yaml
---
title: "项目名称"
date: 2026-10-04
category: "项目类型"
tags: ["AI", "机器人"]
cover: "/images/projects/project-name.webp"
public: true
featured: true
description: "项目简介"
github: "https://github.com/your-name/repository" # 可选
demo: "https://example.com" # 可选
---
```

没有 `github` 或 `demo` 时请删除对应字段，页面不会显示空按钮。

## 如何添加图片

图片目录已经预留：

```text
public/images/
├── life/
├── learning/
└── projects/
```

把 JPG、JPEG、PNG、WebP 或 SVG 文件放入对应目录。文章封面使用 Front Matter：

```yaml
cover: "/images/life/example.jpg"
```

正文图片使用标准 Markdown：

```markdown
![准确描述图片内容的文字](/images/life/example.jpg)
```

图片会自动限制在正文宽度内。构建配置也会自动处理 GitHub Pages 项目子路径。

## Front Matter 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | 字符串 | 标题，必填 |
| `date` | 日期 | 发布时间，必填 |
| `category` | 字符串 | 分类，必填 |
| `tags` | 字符串数组 | 标签 |
| `cover` | 字符串 | `/images/...` 封面路径，可选 |
| `public` | 布尔值 | 只有 `true` 才生成页面 |
| `description` | 字符串 | 摘要和 SEO 描述，必填 |
| `status` | 枚举 | 学习内容专用 |
| `featured` | 布尔值 | 项目内容专用 |
| `github` / `demo` | URL | 项目内容专用，可选 |

分类和学习路线的可维护数据位于 [`src/data/site.ts`](src/data/site.ts)。站点名称、简介和 GitHub 地址也在这里修改。

## 项目结构

```text
src/
├── components/       # 可复用界面组件
├── content/          # Markdown 内容
├── data/site.ts      # 站点文案、导航、分类和学习路线
├── layouts/          # 页面与文章布局
├── pages/            # 静态路由
├── scripts/          # 前端筛选逻辑
└── styles/           # 全局样式
public/
├── images/           # 本地图片
├── favicon.svg
└── robots.txt
```

## 注意事项

`public: false` 只会阻止 Astro 为文章生成公开页面，**它不是私密存储方案**。如果仓库是公开的，Markdown 源文件仍然能被任何人看到。不要把真正私密的日记、个人信息、密钥或其他敏感内容提交到公开 GitHub 仓库。

部署前请在 [`src/data/site.ts`](src/data/site.ts) 中把示例 GitHub 地址替换为自己的地址。`robots.txt` 与 Sitemap 会根据构建时的站点地址和 GitHub 仓库路径自动生成。
