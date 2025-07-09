import { defineConfig } from 'vitepress';
import Guide from '../src/guide'
import Components from '../src/components'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'lb-vue-ui',
  description: '基于vue3的组件库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/src/guide/introduction' },
    ],

    sidebar: {
      '/': [
        Guide,
        Components,
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
