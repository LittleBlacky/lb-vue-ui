const root = "/src/components/basic";

export default {
  text: "基础组件",
  collapsed: false,
  items: [
    {
      text: "✅Icon 图标",
      link: "/icon/icon",
    },
    {
      text: "✅Button 按钮",
      link: "/button/button",
    },
    {
      text: "✅Container 布局容器",
      link: "/container/container",
    },
    {
      text: "✅Layout 布局",
      link: "/layout/layout",
    },
    {
      text: "✅Splitter 分隔面板",
      link: "/splitter/splitter",
    },
  ].map((item) => {
    return {
      ...item,
      link: root + item.link,
    };
  }),
};
