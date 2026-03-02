/**
 * Public props for `NavigationDots`.
 */
export interface NavigationDotsProps {
  className?: string
  ref?: React.RefObject<HTMLDivElement | null>
}

/**
 * Dot-based navigation handler for `Carousel`.
 */
export type NavigationDotsComponent = (props: NavigationDotsProps) => React.JSX.Element
