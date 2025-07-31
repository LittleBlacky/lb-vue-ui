const root = "/src/components/feedback";

export default {
  text: "FeedBack 反馈组件",
  collapsed: false,
  items: [
    {
      text: "Alert 多选框",
      link: "/alert/alert",
    },
    {
      text: "Dialog 对话框",
      link: "/dialog/dialog",
    },
    {
      text: "Drawer 抽屉",
      link: "/drawer/drawer",
    },
    {
      text: "Loading 加载",
      link: "/loading/loading",
    },
    {
      text: "Message 消息提示",
      link: "/message/message",
    },
    {
      text: "MessageBox 消息弹框",
      link: "/messagebox/messagebox",
    },
    {
      text: "PopperOver 弹出层",
      link: "/popperover/popperover",
    },
  ].map((item) => {
    return {
      ...item,
      link: `${root}${item.link}`,
    };
  }),
};
