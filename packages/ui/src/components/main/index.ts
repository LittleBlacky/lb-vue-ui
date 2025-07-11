import MainComponent from './main.vue';
import { withInstall } from '@/utils/install';

const Main = withInstall(MainComponent);

export default Main;

export * from './types';