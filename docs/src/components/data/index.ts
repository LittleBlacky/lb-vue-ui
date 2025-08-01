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
      text: "Image 图片",
      link: "/image/image",
    },
    {
      text: "Infinite Scroll 无限滚动",
      link: "/infinite-scroll/infinite-scroll",
    },
    {
      text: "Pagination 分页",
      link: "/pagination/pagination",
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
      text: "Tree 树形控件",
      link: "/tree/tree",
    },
    {
      text: "Tour 漫游引导",
      link: "/tour/tour",
    },
  ].map((item) => {
    return {
      ...item,
      link: root + item.link,
    };
  }),
};
