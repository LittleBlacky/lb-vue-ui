import SplitterBarComponent from './splitter-bar.vue';
import { withInstall } from '@/utils/install.ts';
const SplitterBar = withInstall(SplitterBarComponent);
export default SplitterBar;
// 导出类型
export * from './types';
