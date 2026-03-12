import type { AutoScrollConfig } from './use-auto-scroll'

/**
 * Public props for the `Carousel` component.
 */
export interface CarouselProps {
  /**
   * Total number of tiles rendered in the carousel. Optional, but recommended for better performance and reliability.
   *
   * If not provided, the carousel will attempt to count the number of child elements ONLY on the initial render. This means that if the number of children changes dynamically after the first render, the carousel may not update correctly.
   */
  itemsCount?: number

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

  /** Child `CarouselItem` elements. */
  children?: React.ReactNode

  /**
   * Navigation component(s) rendered inside the carousel wrapper.
   *
   * Examples: `<NavigationPoints />`, `<NavigationArrows />`, or any custom navigation UI.
   */
  navigationHandler?: React.ReactNode

  className?: string

  ref?: React.Ref<HTMLElement>

  /**
   * Configuration for automatic scrolling behavior.
   * Enable by setting to `true` or provide a config object for custom settings.
   *
   * @default false
   * */
  autoScroll?: boolean | AutoScrollConfig

  /**
   * Enables infinite scrolling behavior when true. When enabled, the carousel will seamlessly loop back to the beginning after reaching the end, and vice versa.
   *
   * @default false
   */
  infiniteScroll?: boolean
}

export type CarouselComponent = (props: CarouselProps) => React.JSX.Element
