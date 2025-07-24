const root = '/src/components/form'

export default {
  text: 'Form 表单',
  collapsed: false,
  items: [
    {
      text: 'Checkbox 多选框',
      link: '/checkbox'
    },
    {
      text: 'Color Picker 取色器',
      link: '/color-picker'
    },
    {
      text: 'Date Picker 日期选择器',
      link: '/date-picker',
    },
    {
      text: 'Form 表单',
      link: '/form'
    },
    {
      text: 'Input 输入框',
      link: '/input'
    },
    {
      text: 'Select 选择框',
      link: '/select'
    },
    {
      text: 'Upload 上传',
      link: '/upload'
    },
  ].map((item) => {
    return {
      ...item,
      link: `${root}${item.link}`
    }
  })
}
