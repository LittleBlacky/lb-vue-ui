// https://vitepress.dev/guide/custom-theme
import DefaultTheme from "vitepress/theme";
import "./style.css";
import LbUI from "@littleblacky/lb-vue-ui";
import "@littleblacky/lb-vue-ui/style";
import {
  ElementPlusContainer,
} from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(LbUI)
  },
};
