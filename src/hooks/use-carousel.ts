import { useCarouselContext } from '../context'
import type { CarouselData, UseCarouselHook, UseCarouselReturn } from '../types'

/**
 * Hook that exposes carousel state and navigation helpers.
 *
 * @see UseCarouselHook
 */
export const useCarousel: UseCarouselHook = (): UseCarouselReturn => {
  const ctx = useCarouselContext()

  const { navigator } = ctx

  const data: CarouselData = {
    gap: ctx.gap,
    itemsCount: ctx.itemsCount,
    selectedIndex: ctx.selectedIndex,
    tileWidth: ctx.tileWidth,
    visibleItems: ctx.visibleItems
  }

  return { carouselNavigator: navigator, carouselData: data }
}
