import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const [repositoryOwner = '', repository = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const owner = repositoryOwner || 'starfish';
const projectBase = repository && !repository.endsWith('.github.io') ? `/${repository}` : '/';
const base = process.env.BASE_PATH ?? projectBase;
const site = process.env.SITE_URL ?? `https://${owner}.github.io`;

function remarkBasePath() {
  return (tree) => {
    const walk = (node) => {
      if ((node.type === 'image' || node.type === 'link') && node.url?.startsWith('/')) {
        node.url = `${base === '/' ? '/' : `${base}/`}${node.url.slice(1)}`;
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkBasePath],
    shikiConfig: { theme: 'github-light' }
  }
});
