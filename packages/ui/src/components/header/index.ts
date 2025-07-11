import HeaderComponent from './header.vue';
import { withInstall } from '@/utils/install';

const Header = withInstall(HeaderComponent);

export default Header;

export * from './types';