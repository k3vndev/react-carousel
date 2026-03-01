/**
 * Class name slots for `NavigationArrows`.
 */
export interface NavigationArrowsClassName {
  /** Extra classes for the left navigation arrow. */
  left?: string
  /** Extra classes for the right navigation arrow. */
  right?: string
  /** Classes applied to both arrows. */
  both?: string
}

/**
 * Inline style slots for `NavigationArrows`.
 */
export interface NavigationArrowsStyle {
  /** Inline styles for the left navigation arrow. */
  left?: React.CSSProperties
  /** Inline styles for the right navigation arrow. */
  right?: React.CSSProperties
  /** Inline styles applied to both arrows. */
  both?: React.CSSProperties
}

/**
 * Optional refs for `NavigationArrows` elements.
 */
export interface NavigationArrowsRef {
  /** Ref for the left arrow wrapper element. */
  left?: React.RefObject<HTMLDivElement | null>
  /** Ref for the right arrow wrapper element. */
  right?: React.RefObject<HTMLDivElement | null>
}

/**
 * Public props for `NavigationArrows`.
 */
export interface NavigationArrowsProps {
  /**
   * Class names for each arrow or both.
   *
   * Supports `[&.visible]:...` and `[&.not-visible]:...` selectors.
   */
  className?: NavigationArrowsClassName
  /** Optional inline styles for arrows. */
  style?: NavigationArrowsStyle
  /** Optional refs for left/right arrow wrappers. */
  ref?: NavigationArrowsRef
}

/**
 * Previous/next arrow navigation handler for `Carousel`.
 */
export type NavigationArrowsComponent = (props: NavigationArrowsProps) => React.JSX.Element
