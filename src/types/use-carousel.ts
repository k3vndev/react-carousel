/**
 * Read-only data exposed by `useCarousel` for the current carousel state.
 */
export interface CarouselData {
  /** Computed width for each tile in pixels. `-1` means not measured yet. */
  tileWidth: number
  /** Number of tiles visible in the viewport. */
  visibleItems: number
  /** Gap in pixels between tiles. */
  gap: number
  /** Total amount of tiles in the carousel. */
  itemsCount: number
  /** Currently selected tile index based on scroll position. */
  selectedIndex: number
}

/**
 * Programmatic navigation actions exposed by `useCarousel`.
 */
export interface CarouselNavigator {
  /**
   * Scrolls to the left.
   *
   * @param itemsDistance Number of tiles to move. Defaults to `visibleItems`.
   */
  scrollLeft: (itemsDistance?: number) => void

  /**
   * Scrolls to the right.
   *
   * @param itemsDistance Number of tiles to move. Defaults to `visibleItems`.
   */
  scrollRight: (itemsDistance?: number) => void

  /**
   * Scrolls directly to a target tile index.
   *
   * @param index Target tile index.
   */
  scrollToIndex: (index: number) => void
}

/**
 * Return object of `useCarousel`.
 */
export interface UseCarouselReturn {
  /** Navigation actions for imperative carousel control. */
  carouselNavigator: CarouselNavigator
  /** Read-only state data from the current carousel instance. */
  carouselData: CarouselData
}

/**
 * Hook that provides full control over a Carousel instance.
 *
 * It exposes both `carouselData` (read-only state) and `carouselNavigator`
 * (imperative scroll actions), making it easy to build custom navigation UI.
 *
 * @example
 * ```tsx
 * const { carouselNavigator, carouselData } = useCarousel()
 *
 * <button onClick={() => carouselNavigator.scrollRight()}>Next</button>
 * <button onClick={() => carouselNavigator.scrollToIndex(0)}>Go to Start</button>
 * ```
 */
export type UseCarouselHook = () => UseCarouselReturn
