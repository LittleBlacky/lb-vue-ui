import { defineConfig } from 'vitepress'
import Guide from '../src/guide'
import Components from '../src/components'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/lb-vue-ui/',
  title: 'lb-vue-ui',
  description: '基于vue3的组件库',
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin)
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/src/guide/introduction' },
    ],

    sidebar: {
      '/': [Guide, Components],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/LittleBlacky/lb-vue-ui' }],
  },
})
