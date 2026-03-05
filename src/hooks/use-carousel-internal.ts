import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CarouselContextType } from '../context'
import type { CarouselNavigator, CarouselProps } from '../types'
import { useCombinedRef } from './use-combined-ref'

export const useCarouselInternal = ({
  itemsCount,
  visibleItems = 1,
  gap = 0,
  autoScroll = false,
  ref,
  children
}: CarouselProps) => {
  const baseWrapperRef = useRef<HTMLElement>(null)
  const wrapperRef = useCombinedRef(ref, baseWrapperRef)
  const scrollRef = useRef<HTMLDivElement>(null)

  // State
  const [tileWidth, setTileWidth] = useState<number>(-1)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Tile width calculation
  useEffect(() => {
    const refreshWidth = () => {
      const el = scrollRef.current
      if (!el) return

      const totalGap = gap * (visibleItems - 1)
      const calculatedWidth = (el.offsetWidth - totalGap) / visibleItems

      if (calculatedWidth >= 0 && Number.isFinite(calculatedWidth)) {
        setTileWidth(calculatedWidth)
      }
    }
    refreshWidth()

    window.addEventListener('resize', refreshWidth)
    return () => window.removeEventListener('resize', refreshWidth)
  }, [gap, visibleItems, autoScroll])

  // Scroll index tracking
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => setSelectedIndex(Math.round(el.scrollLeft / tileWidth))
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [tileWidth])

  // -- Carousel navigator --

  /** Smoothly scrolls to the given X value. */
  const scroll = (value: number) => {
    scrollRef.current?.scrollTo({
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
  const scrollToDirection = useCallback(
    (isLeft: boolean, itemsDistance?: number) => {
      const newItemsDistance =
        !itemsDistance || Number.isNaN(+itemsDistance) ? visibleItems : Math.round(itemsDistance)

      if (tileWidth > 0 && newItemsDistance > 0 && scrollRef.current) {
        const direction = isLeft ? -1 : 1
        const totalGap = calcTotalGap(newItemsDistance)
        const scrollAmount = (tileWidth * newItemsDistance + totalGap) * direction
        scroll(scrollAmount + scrollRef.current.scrollLeft)
      }
    },
    [tileWidth, visibleItems]
  )

  const calcTotalGap = useCallback((itemsCount: number) => gap * (itemsCount - 1), [gap])

  /**
   * Scrolls directly to a specific item index.
   *
   * @param index - The index of the target item.
   */
  const scrollToIndex = useCallback(
    (index: number) => {
      const scrollAmount = tileWidth * index + calcTotalGap(index)
      scroll(scrollAmount)
    },
    [calcTotalGap, tileWidth]
  )

  /**
   * Object with methods to navigate programmatically.
   */
  const navigator: CarouselNavigator = useMemo(
    () => ({
      scrollLeft: (itemsDistance?: number) => scrollToDirection(true, itemsDistance),
      scrollRight: (itemsDistance?: number) => scrollToDirection(false, itemsDistance),
      scrollToIndex,
      tileWidth
    }),
    [scrollToDirection, scrollToIndex, tileWidth]
  )

  // -- Context data --

  const widthForTile = tileWidth !== -1 ? `${tileWidth}px` : undefined
  const tileProps = {
    className: 'shrink-0 snap-start',
    style: { width: widthForTile, maxWidth: widthForTile, minWidth: widthForTile }
  }

  const calculatedItemsCount = useMemo(() => {
    if (itemsCount !== undefined) {
      if (itemsCount < 0 || !Number.isInteger(itemsCount)) {
        console.warn(
          `[Carousel] Invalid itemsCount value (${itemsCount}). It should be a non-negative integer. Defaulting to 0.`
        )
        return 0
      }
      return itemsCount
    }

    if (children && Array.isArray(children)) {
      return children.length
    }
    return children ? 1 : 0
  }, [children, itemsCount])

  const contextValue: CarouselContextType = useMemo(
    () => ({
      tileProps,
      elementRef: scrollRef,
      gap,
      visibleItems,
      tileWidth,
      itemsCount: calculatedItemsCount,
      selectedIndex,
      navigator,
      autoScroll
    }),
    [tileProps, gap, visibleItems, tileWidth, calculatedItemsCount, selectedIndex, navigator, autoScroll]
  )

  return {
    context: contextValue,
    refs: {
      wrapper: wrapperRef,
      scroll: scrollRef
    }
  }
}
