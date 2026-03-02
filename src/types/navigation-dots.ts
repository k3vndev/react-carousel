/**
 * Public props for `NavigationDots`.
 */
export interface NavigationDotsProps {
  className?: string
  ref?: React.RefObject<HTMLDivElement | null>
  noAutoScrollAnimation?: boolean
}

export type NavigationDotsComponent = (props: NavigationDotsProps) => React.JSX.Element
