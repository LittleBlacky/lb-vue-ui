import LbButton from './components/button';
import LbInput from './components/input';
import LbIcon from './components/icon';
import LbRow from './components/row';
import LbCol from './components/col';
import LbContainer from './components/container';
import LbHeader from './components/header';
import LbAside from './components/aside';
import LbMain from './components/main';
import LbFooter from './components/footer';
import LbSplitter from './components/splitter';
import LbSplitterPanel from './components/splitter-panel';
import main from './APP.vue';
import './styles/index.scss';
import { type App, createApp } from 'vue';

const app = createApp(main);

app.use(LbSplitter);
app.use(LbSplitterPanel);

app.mount('#app');

const components = {
  LbButton,
  LbInput,
  LbIcon,
  LbRow,
  LbCol,
  LbContainer,
  LbHeader,
  LbAside,
  LbMain,
  LbFooter,
  LbSplitter,
  LbSplitterPanel,
};

export default {
  name: 'LbUI',
  ...components,
  install: (app: App) => {
    Object.values(components).forEach((component) => {
      app.component(component.name as string, component);
    });
  },
};
