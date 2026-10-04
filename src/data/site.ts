export const siteConfig = {
  name: 'Starfish',
  chineseName: '海星自留地',
  title: 'Starfish 海星自留地',
  description: '记录生活，也记录自己的成长。关于旅行、学习、作品与日常的个人空间。',
  intro: '这里收集沿途的光、未完成的想法，以及一步一步长成自己的过程。',
  github: 'https://github.com/',
  author: 'Starfish',
};

export const navigation = [
  { label: '首页', href: '/' },
  { label: '生活', href: '/life/' },
  { label: '学习成长', href: '/learning/' },
  { label: '项目', href: '/projects/' },
  { label: '关于我', href: '/about/' },
];

export const lifeCategories = ['全部', '旅行', '游戏', '电影', '音乐', '美食', '趣事', '大学', '比赛', '照片', '碎碎念', '日记'];

export const learningPath = [
  { name: 'Java', note: '语言基础与工程思维' },
  { name: 'Spring Boot', note: 'Web 服务与 REST API' },
  { name: 'MyBatis', note: '数据访问与持久化' },
  { name: 'MySQL / PostgreSQL', note: '关系数据库' },
  { name: 'Vue', note: '现代前端开发' },
  { name: 'Linux', note: '服务器与命令行' },
  { name: 'Docker', note: '环境与容器化' },
  { name: '项目部署', note: '让作品真正上线' },
];

export const formatDate = (date: Date) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Shanghai'
}).format(date);

export const pathWithBase = (path: string, base = import.meta.env.BASE_URL) => {
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${path.replace(/^\//, '')}`;
};
