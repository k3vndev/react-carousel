import { useContext } from 'react'
import { CarouselContext } from '../context'
import type { CarouselData, CarouselNavigator, UseCarouselHook, UseCarouselReturn } from '../types'

/**
 * Hook that exposes carousel state and navigation helpers.
 *
 * @see UseCarouselHook
 */
export const useCarousel: UseCarouselHook = () => {
  const { elementRef, tileWidth, visibleItems, gap, itemsCount, selectedIndex } = useContext(CarouselContext)

  /** Smoothly scrolls to the given X value. */
  const scroll = (value: number) => {
    elementRef.current?.scrollTo({
      left: value,
      behavior: 'smooth'
    })
  }

  /**
   * Scrolls the carousel horizontally.
   *
   * @param isLeft - Direction to scroll (`true` for left, `false` for right).
   * @param itemsDistance - Number of items to move. Defaults to `visibleItems`.
   */
  const scrollToDirection = (isLeft: boolean, itemsDistance?: number) => {
    const newItemsDistance =
      !itemsDistance || Number.isNaN(+itemsDistance) ? visibleItems : Math.round(itemsDistance)

    if (tileWidth > 0 && newItemsDistance > 0 && elementRef.current) {
      const direction = isLeft ? -1 : 1
      const totalGap = calcTotalGap(newItemsDistance)
      const scrollAmount = (tileWidth * newItemsDistance + totalGap) * direction
      scroll(scrollAmount + elementRef.current.scrollLeft)
    }
  }

  /** Calculates total horizontal spacing for a given number of items. */
  const calcTotalGap = (itemsCount: number) => gap * (itemsCount - 1)

  /**
   * Scrolls directly to a specific item index.
   *
   * @param index - The index of the target item.
   */
  const scrollToIndex = (index: number) => {
    const scrollAmount = tileWidth * index + calcTotalGap(index)
    scroll(scrollAmount)
  }

  /**
   * Read-only data about the current carousel instance.
   */
  const carouselData: CarouselData = {
    tileWidth,
    visibleItems,
    gap,
    itemsCount,
    selectedIndex
  }

  /**
   * Object with methods to navigate programmatically.
   */
  const carouselNavigator: CarouselNavigator = {
    scrollLeft: (itemsDistance?: number) => scrollToDirection(true, itemsDistance),
    scrollRight: (itemsDistance?: number) => scrollToDirection(false, itemsDistance),
    scrollToIndex
  }

  const result: UseCarouselReturn = { carouselNavigator, carouselData }
  return result
}
