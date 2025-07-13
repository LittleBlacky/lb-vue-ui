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
import type { App } from 'vue';

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
