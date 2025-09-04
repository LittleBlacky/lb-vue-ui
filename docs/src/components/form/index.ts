const root = "/src/components/form";

export default {
  text: "Form 表单",
  collapsed: false,
  items: [
    {
      text: "Checkbox 多选框",
      link: "/checkbox/checkbox",
    },
    // {
    //   text: "ColorPicker 取色器",
    //   link: "/color-picker/color-picker",
    // },
    {
      text: "DatePicker 日期选择器",
      link: "/date-picker/date-picker",
    },
    {
      text: "Form 表单",
      link: "/form/form",
    },
    {
      text: "✅Input 输入框",
      link: "/input/input",
    },
    {
      text: "✅Radio 单选框",
      link: "/radio/radio",
    },
    {
      text: "✅Select 选择框",
      link: "/select/select",
    },
    // {
    //   text: "Slider 滑块",
    //   link: "/slider/slider",
    // },
    {
      text: "Switch 选择器",
      link: "/switch/switch",
    },
    {
      text: "Upload 上传",
      link: "/upload/upload",
    },
  ].map((item) => {
    return {
      ...item,
      link: `${root}${item.link}`,
    };
  }),
};
