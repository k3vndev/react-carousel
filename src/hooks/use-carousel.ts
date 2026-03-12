import { useMemo } from 'react'
import { useCarouselContext } from '../context'
import type { CarouselData, UseCarouselHook, UseCarouselReturn } from '../types'

/**
 * Hook that exposes carousel state and navigation helpers.
 *
 * @see UseCarouselHook
 */
export const useCarousel: UseCarouselHook = (): UseCarouselReturn => {
  const ctx = useCarouselContext()

  const data: CarouselData = useMemo(
    () => ({
      gap: ctx.gap,
      itemsCount: ctx.itemsCount,
      selectedIndex: ctx.selectedIndex,
      tileWidth: ctx.tileWidth,
      visibleItems: ctx.visibleItems
    }),
    [ctx.gap, ctx.itemsCount, ctx.selectedIndex, ctx.tileWidth, ctx.visibleItems]
  )

  return { carouselNavigator: ctx.navigator, carouselData: data }
}
