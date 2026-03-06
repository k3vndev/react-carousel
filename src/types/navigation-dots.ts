/**
 * Public props for `NavigationDots`.
 */
export interface NavigationDotsProps {
  className?: string
  ref?: React.RefObject<HTMLDivElement | null>

  /** Disables the auto-scroll animation when true in the Carousel component. */
  noAutoScrollAnimation?: boolean

  /** Values for the auto-scroll animation when enabled (ignored if `noAutoScrollAnimation` is true) */
  autoScrollAnimationValues?: {
    /**
     * The scale value for the auto-scroll animation (0 to 1).
     *
     * @default 0.2
     */
    scale?: number
    /**
     * The opacity value for the auto-scroll animation (0 to 1).
     *
     * @default 0.05
     */
    opacity?: number
    /**
     * The color value for the auto-scroll animation (any valid CSS color).
     *
     * @default 'white'
     */
    color?: string
  }
}

export type NavigationDotsComponent = (props: NavigationDotsProps) => React.JSX.Element
