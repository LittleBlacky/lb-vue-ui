
import ContainerComponent from './container.vue';
import { withInstall } from '../../utils/install.ts';
const Container = withInstall(ContainerComponent);
export default Container;
// 导出类型
export * from './types';
