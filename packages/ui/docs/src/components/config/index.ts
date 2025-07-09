const root = '/src/components/config'
export default {
  text: '配置组件',
  collapsed: false,
  items: [
    {
      text: 'Config Provider 配置',
      link: '/configProvider',
    },
  ].map((item) => {
    return {
      ...item,
      link: root + item.link,
    }
  }),
}
