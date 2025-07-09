const root = '/src/components/basic'

export default {
  text: '基础组件',
  collapsed: false,
  items: [
    {
      text: 'Icon 图标✅',
      link: '/icon',
    },
    {
      text: 'Button 按钮✅',
      link: '/button',
    },
    {
      text: 'Container 布局容器',
      link: '/container',
    },
    {
      text: 'Layout 布局',
      link: '/layout',
    },
  ].map((item) => {
    return {
      ...item,
      link: root + item.link
    }
  }),
}
