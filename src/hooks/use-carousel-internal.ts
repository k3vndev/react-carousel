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

  const initialItemsCount = useRef(-1)

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

  /** Warns with a prefixed message */
  const warnMessage = (message: string) => console.warn(`[Carousel] ${message}`)

  const computedItemsCount = useMemo(() => {
    // If itemsCount is not provided, attempt to count children on initial render
    if (initialItemsCount.current < 0) {
      initialItemsCount.current = 0

      if (itemsCount === undefined) {
        if (!children) {
          warnMessage(
            'itemsCount is not provided and no children found. Please ensure that the carousel has child elements or provide the itemsCount prop explicitly.'
          )
          return 0
        }

        const isArray = Array.isArray(children)

        if (isArray) {
          if (children.length <= 0) {
            warnMessage(
              'No items found in children. Please ensure that the carousel has child elements or provide the itemsCount prop explicitly.'
            )
            return 0
          }

          initialItemsCount.current = children.length
          return children.length
        }
        // Return 1 if there's a single child element
        initialItemsCount.current = 1
        return 1
      }
    }

    // If itemsCount is provided, try to use it directly
    if (itemsCount !== undefined) {
      if (itemsCount <= 0) {
        warnMessage(
          'itemsCount is provided but is not a positive number. Please provide a valid itemsCount value greater than 0.'
        )
        return 0
      }
      return itemsCount
    }

    // If itemsCount is not provided and children were counted on initial render, use that value
    if (!initialItemsCount.current) {
      warnMessage(
        'Unable to determine items count. Please ensure that the carousel has child elements or provide the itemsCount prop explicitly.'
      )
      return 0
    }
    return initialItemsCount.current
  }, [children, itemsCount])

  const contextValue: CarouselContextType = useMemo(
    () => ({
      tileProps,
      elementRef: scrollRef,
      gap,
      visibleItems,
      tileWidth,
      itemsCount: computedItemsCount,
      selectedIndex,
      navigator,
      autoScroll
    }),
    [tileProps, gap, visibleItems, tileWidth, computedItemsCount, selectedIndex, navigator, autoScroll]
  )

  return {
    context: contextValue,
    refs: {
      wrapper: wrapperRef,
      scroll: scrollRef
    }
  }
}
