export interface LbSkeletonProps {
  animated?: boolean
  rows?: number
  count?: number
  loading?: boolean
  throttle?: number
  duration?: number
  variant?: 'text' | 'circle' | 'rect' | 'image' | 'button'
}
export interface LbSkeletonContext {
  animated: boolean
  duration: number
}