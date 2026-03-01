/**
 * Class name slots for `NavigationPoints`.
 */
export interface NavigationPointsClassName {
  /** Extra classes for the wrapper element. */
  wrapper?: string
  /**
   * Extra classes for each point element.
   * Supports `[&.active]:...` and `[&.not-active]:...` selectors.
   */
  points?: string
}

/**
 * Inline style slots for `NavigationPoints`.
 */
export interface NavigationPointsStyle {
  /** Inline styles for the wrapper element. */
  wrapper?: React.CSSProperties
  /** Inline styles for each point element. */
  points?: React.CSSProperties
}

/**
 * Optional refs for `NavigationPoints` elements.
 */
export interface NavigationPointsRef {
  /** Ref to the wrapper element containing all navigation points. */
  wrapper?: React.RefObject<HTMLDivElement | null>
  /** Ref to each point button element. */
  points?: React.RefObject<HTMLButtonElement | null>
}

/**
 * Public props for `NavigationPoints`.
 */
export interface NavigationPointsProps {
  /** Class names for wrapper and points. */
  className?: NavigationPointsClassName
  /** Inline styles for wrapper and points. */
  style?: NavigationPointsStyle
  /** Optional refs for wrapper and points. */
  ref?: NavigationPointsRef
}

/**
 * Dot-based navigation handler for `Carousel`.
 */
export type NavigationPointsComponent = (props: NavigationPointsProps) => React.JSX.Element
