/**
 * Public props for `NavigationArrows`.
 */
export interface NavigationArrowsProps {
  className?: string
}

/**
 * Previous/next arrow navigation handler for `Carousel`.
 */
export type NavigationArrowsComponent = (props: NavigationArrowsProps) => React.JSX.Element
