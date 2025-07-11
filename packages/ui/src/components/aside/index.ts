import AsideComponent from './aside.vue';
import { withInstall } from '@/utils/install';

const Aside = withInstall(AsideComponent);

export default Aside;

export * from './types';