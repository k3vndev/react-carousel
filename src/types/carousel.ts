/**
 * Class name slots for the `Carousel` root structure.
 */
export interface CarouselClassName {
  /** Additional CSS/Tailwind class names for the outer wrapper element (`section`). */
  wrapper?: string
  /** Additional CSS/Tailwind class names for the scrollable inner element (`div`). */
  scrollZone?: string
}

/**
 * Inline style slots for the `Carousel` root structure.
 */
export interface CarouselStyle {
  /** Inline styles for the outer wrapper element (`section`). */
  wrapper?: React.CSSProperties
  /** Inline styles for the scrollable inner element (`div`). */
  scrollZone?: React.CSSProperties
}

/**
 * Optional refs exposed by `Carousel`.
 */
export interface CarouselRef {
  /** Optional ref for the outer wrapper element (`section`). */
  wrapper?: React.Ref<HTMLElement>
  /** Optional ref for the scrollable inner element (`div`). */
  scrollZone?: React.Ref<HTMLDivElement>
}

/**
 * Public props for the `Carousel` component.
 */
export interface CarouselProps {
  /**
   * Total number of tiles rendered in the carousel.
   *
   * This value is used by navigation handlers and index calculations.
   */
  itemsCount: number

  /**
   * Number of items visible in the viewport at once.
   *
   * @default 1
   */
  visibleItems?: number

  /**
   * Horizontal gap in pixels between items.
   *
   * @default 0
   */
  gap?: number

  /** Child `CarouselItem` elements (or custom tile nodes). */
  children?: React.ReactNode

  /**
   * Navigation component(s) rendered inside the carousel wrapper.
   *
   * Examples: `<NavigationPoints />`, `<NavigationArrows />`,
   * `<NavigationAutomatic />`, or any custom navigation UI.
   */
  navigationHandler?: React.ReactNode

  /** Class name slots for wrapper and scroll zone. */
  className?: CarouselClassName

  /** Inline style slots for wrapper and scroll zone. */
  style?: CarouselStyle

  /** Optional refs to access wrapper and scroll zone DOM nodes. */
  ref?: CarouselRef
}

/**
 * A horizontal scrollable Carousel component.
 *
 * Displays a set of items in a scrollable horizontal layout.
 * Handles snapping, tile sizing, and exposes tile info via `CarouselContext`.
 *
 * @example
 * ```tsx
 * <Carousel
 *   itemsCount={3}
 *   visibleItems={1}
 *   gap={16}
 *   className={{ wrapper: 'max-w-xl' }}
 *   navigationHandler={<NavigationPoints />}
 * >
 *   <CarouselItem>Item 1</CarouselItem>
 *   <CarouselItem>Item 2</CarouselItem>
 *   <CarouselItem>Item 3</CarouselItem>
 * </Carousel>
 * ```
 */
export type CarouselComponent = (props: CarouselProps) => React.JSX.Element
