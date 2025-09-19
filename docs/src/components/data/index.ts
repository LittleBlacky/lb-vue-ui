const root = "/src/components/data";

export default {
  text: "Data 数据展示",
  collapsed: false,
  items: [
    {
      text: "✅Card 卡片",
      link: "/card/card",
    },
    {
      text: "✅Image 图片",
      link: "/image/image",
    },
    {
      text: "Pagination 分页",
      link: "/pagination/pagination",
    },
    {
      text: "✅Progress 进度条",
      link: "/progress/progress",
    },
    {
      text: "✅Skeleton 骨架屏",
      link: "/skeleton/skeleton",
    },
    {
      text: "Table 表格",
      link: "/table/table",
    },
    {
      text: "Tag 标签",
      link: "/tag/tag",
    },
    {
      text: "Tree 树形控件",
      link: "/tree/tree",
    },
    {
      text: "✅Tour 漫游引导",
      link: "/tour/tour",
    },
  ].map((item) => {
    return {
      ...item,
      link: root + item.link,
    };
  }),
};
