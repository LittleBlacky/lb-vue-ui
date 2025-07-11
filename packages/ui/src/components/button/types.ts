export interface LbButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'medium' | 'small' | 'large';
  disabled?: boolean;
  round?: boolean;
  circle?: boolean;
  loading?: boolean;
  plain?: boolean;
  text?: boolean;
  link?: boolean;
}