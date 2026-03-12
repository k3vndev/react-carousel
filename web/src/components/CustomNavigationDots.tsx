import { NavigationDots } from '@k3vndev/react-carousel'

export const CustomNavigationDots = () => (
  <NavigationDots
    className='[&>.dot.active]:bg-yellow-400'
    autoScrollAnimationValues={{ color: 'oklch(85.2% 0.199 91.936)' }}
  />
)
