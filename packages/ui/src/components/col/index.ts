
import ColComponent from './col.vue';
import { withInstall } from '../../utils/install.ts';
const Col = withInstall(ColComponent);
export default Col;
// 导出类型
export * from './types';
