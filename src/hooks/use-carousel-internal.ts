import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CarouselContextType } from '../context'
import type { CarouselNavigator, CarouselProps } from '../types'
import { useCombinedRef } from './use-combined-ref'
import { useFreshRefs } from './use-fresh-refs'

interface Params extends CarouselProps {
  setChildren: React.Dispatch<React.SetStateAction<React.ReactNode>>
}

export const useCarouselInternal = ({
  itemsCount,
  visibleItems = 1,
  gap = 0,
  autoScroll = false,
  infiniteScroll = false,
  ref,
  children,
  setChildren
}: Params) => {
  const baseWrapperRef = useRef<HTMLElement>(null)
  const wrapperRef = useCombinedRef(ref, baseWrapperRef)
  const scrollRef = useRef<HTMLDivElement>(null)

  // State
  const [tileWidth, setTileWidth] = useState<number>(-1)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const currentGroupRef = useRef<0 | 1 | 2>(1) // 0 = first, 1 = middle, 2 = last

  const initialItemsCountRef = useRef(-1)
  const initialDuplicateSetRef = useRef(false) // To track if children have been duplicated for infinite scroll
  const isSwitchingGroupRef = useRef(false) // Prevents reentrant jumps while normalizing groups
  const settleSwitchTimeoutRef = useRef<number | null>(null)
  const forcedSwitchTimeoutRef = useRef<number | null>(null)
  const latestRawIndexRef = useRef(0)

  const calcTotalGap = useCallback((itemsCount: number) => gap * itemsCount, [gap])

  const getVirtualIndexFromScrollLeft = useCallback(
    (scrollLeft: number) => {
      if (tileWidth <= 0) return 0
      return scrollLeft / (tileWidth + gap)
    },
    [tileWidth, gap]
  )

  const getScrollLeftFromVirtualIndex = useCallback(
    (virtualIndex: number) => tileWidth * virtualIndex + calcTotalGap(virtualIndex),
    [calcTotalGap, tileWidth]
  )

  const normalizeIndex = useCallback((index: number, count: number) => {
    if (count <= 0) return 0
    return ((index % count) + count) % count
  }, [])

  const clearGroupSwitchTimeouts = useCallback(() => {
    if (settleSwitchTimeoutRef.current) {
      clearTimeout(settleSwitchTimeoutRef.current)
      settleSwitchTimeoutRef.current = null
    }

    if (forcedSwitchTimeoutRef.current) {
      clearTimeout(forcedSwitchTimeoutRef.current)
      forcedSwitchTimeoutRef.current = null
    }
  }, [])

  const getGroupFromRawIndex = useCallback((rawIndex: number, count: number): 0 | 1 | 2 => {
    if (count <= 0) return 1

    if (rawIndex < count) return 0
    if (rawIndex < count * 2) return 1
    return 2
  }, [])

  const jumpToMiddleGroup = useCallback(
    (rawIndex: number) => {
      const { itemsCount, infiniteScroll } = refs.current

      if (!infiniteScroll || !scrollRef.current || tileWidth <= 0 || itemsCount <= 0) return
      if (isSwitchingGroupRef.current) return

      const group = getGroupFromRawIndex(rawIndex, itemsCount)
      if (group === 1) {
        currentGroupRef.current = 1
        clearGroupSwitchTimeouts()
        return
      }

      // Keep the same logical item position, but place it in the middle (second) group.
      const indexInsideGroup = rawIndex - group * itemsCount
      const targetVirtualIndex = itemsCount + indexInsideGroup
      const targetLeft = getScrollLeftFromVirtualIndex(targetVirtualIndex)

      isSwitchingGroupRef.current = true
      scrollRef.current.scrollTo({ left: targetLeft, behavior: 'auto' })
      currentGroupRef.current = 1
      clearGroupSwitchTimeouts()

      requestAnimationFrame(() => {
        isSwitchingGroupRef.current = false
      })
    },
    [clearGroupSwitchTimeouts, getGroupFromRawIndex, getScrollLeftFromVirtualIndex, tileWidth]
  )

  const scheduleMiddleGroupNormalization = useCallback(
    (rawIndex: number) => {
      const { itemsCount, infiniteScroll } = refs.current
      if (!infiniteScroll || itemsCount <= 0) return

      latestRawIndexRef.current = rawIndex
      const group = getGroupFromRawIndex(rawIndex, itemsCount)
      currentGroupRef.current = group

      if (group === 1) {
        clearGroupSwitchTimeouts()
        return
      }

      // Preferred path: wait for scrolling to settle, then jump to middle group.
      if (settleSwitchTimeoutRef.current) {
        clearTimeout(settleSwitchTimeoutRef.current)
      }

      settleSwitchTimeoutRef.current = window.setTimeout(() => {
        jumpToMiddleGroup(latestRawIndexRef.current)
      }, GROUP_SWITCH_SETTLE_DELAY_MS)

      // Fallback: if settling never happens, force the jump.
      if (!forcedSwitchTimeoutRef.current) {
        forcedSwitchTimeoutRef.current = window.setTimeout(() => {
          jumpToMiddleGroup(latestRawIndexRef.current)
        }, GROUP_SWITCH_FORCE_DELAY_MS)
      }
    },
    [clearGroupSwitchTimeouts, getGroupFromRawIndex, jumpToMiddleGroup]
  )

  useEffect(() => {
    if (infiniteScroll && tileWidth > 0 && !initialDuplicateSetRef.current) {
      // Duplicate children for infinite scroll effect when infiniteScroll is enabled
      setChildren(prev => {
        if (!prev) return prev
        const childArray = React.Children.toArray(prev)
        if (childArray.length <= 0) return prev

        initialDuplicateSetRef.current = true
        const duplicated = [...childArray, ...childArray, ...childArray]

        // Set keys
        return duplicated.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { key: `carousel-dup-${index}` })
          }
          return child
        })
      })

      // Reset to the start of the middle (second) group.
      requestAnimationFrame(() => {
        const { itemsCount, tileWidth } = refs.current
        if (!scrollRef.current || !itemsCount || !tileWidth) return

        const scrollAmount = getScrollLeftFromVirtualIndex(itemsCount)
        currentGroupRef.current = 1

        requestAnimationFrame(() => {
          scrollRef.current?.scrollTo({ left: scrollAmount, behavior: 'auto' })
        })
      })
    }
  }, [getScrollLeftFromVirtualIndex, infiniteScroll, setChildren, tileWidth])

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
    const scrollElement = scrollRef.current
    if (!scrollElement || tileWidth <= 0) return

    // Calculate the selected index based on scroll position and considering infinite scroll duplication
    const handleScroll = () => {
      const { itemsCount } = refs.current
      if (itemsCount <= 0) return

      const rawIndex = getVirtualIndexFromScrollLeft(scrollElement.scrollLeft)
      const roundedIndex = Math.round(rawIndex)
      const index = normalizeIndex(roundedIndex, itemsCount)

      scheduleMiddleGroupNormalization(rawIndex)
      setSelectedIndex(index)
    }
    handleScroll() // Set initial index on mount

    // Handle scroll events to update selected index
    scrollElement.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll)
      clearGroupSwitchTimeouts()
    }
  }, [
    clearGroupSwitchTimeouts,
    getVirtualIndexFromScrollLeft,
    normalizeIndex,
    scheduleMiddleGroupNormalization,
    tileWidth
  ])

  // -- Carousel navigator --

  /** Smoothly scrolls to the given X value. */
  const scroll = (value: number) => {
    scrollRef.current?.scrollTo({ left: value, behavior: 'smooth' })
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
    [calcTotalGap, tileWidth, visibleItems]
  )

  /**
   * Scrolls directly to a specific item index.
   *
   * @param index - The index of the target item.
   */
  const scrollToIndex = useCallback(
    (index: number) => {
      const { itemsCount, infiniteScroll } = refs.current
      const normalizedIndex = normalizeIndex(index, itemsCount)
      const virtualIndex = infiniteScroll ? itemsCount + normalizedIndex : normalizedIndex
      const scrollAmount = getScrollLeftFromVirtualIndex(virtualIndex)
      scroll(scrollAmount)
    },
    [getScrollLeftFromVirtualIndex, normalizeIndex]
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
    if (initialItemsCountRef.current < 0) {
      initialItemsCountRef.current = 0

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

          initialItemsCountRef.current = children.length
          return children.length
        }
        // Return 1 if there's a single child element
        initialItemsCountRef.current = 1
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
    if (!initialItemsCountRef.current) {
      warnMessage(
        'Unable to determine items count. Please ensure that the carousel has child elements or provide the itemsCount prop explicitly.'
      )
      return 0
    }
    return initialItemsCountRef.current
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
      autoScroll,
      infiniteScroll
    }),
    [
      tileProps,
      gap,
      visibleItems,
      tileWidth,
      computedItemsCount,
      selectedIndex,
      navigator,
      autoScroll,
      infiniteScroll
    ]
  )

  const refs = useFreshRefs(contextValue)

  return {
    context: contextValue,
    refs: {
      wrapper: wrapperRef,
      scroll: scrollRef
    }
  }
}

const GROUP_SWITCH_SETTLE_DELAY_MS = 120
const GROUP_SWITCH_FORCE_DELAY_MS = 900
