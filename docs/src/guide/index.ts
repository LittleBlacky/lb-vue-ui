const root = '/src/guide'

export default {
  text: '指南',
  items: [
    { text: '介绍', link: '/introduction' },
    { text: '安装', link: '/install' },
    { text: '项目引入', link: '/import' },
  ].map((item) => {
    return {
      ...item,
      link: root + item.link
    }
  })
}
