'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from './context/carousel-context'
import { useCombinedRef } from './hooks/useCombinedRef'
import './styles.css'

interface Props {
  /** Total number of items in the carousel. */
  itemsCount: number
  /** Number of items visible at once. Defaults to 1. */
  visibleItems?: number
  /** Gap in pixels between tiles. Defaults to 0. */
  gap?: number
  /** Child `CarouselItem`s. */
  children?: React.ReactNode
  /**
   * The navigation handler component(s) you wanna use.
   *
   * Example: `<NavigationPoints />`, `<NavigationArrows />`, `<NavigationAutomatic />`, or custom.
   */
  navigationHandler?: React.ReactNode

  className?: {
    /** Additional CSS/Tailwind class names for the wrapper component. */
    wrapper?: string
    /** Additional CSS/Tailwind class names for the inner scroll zone. */
    scrollZone?: string
  }
  style?: {
    /** Inline styles for the wrapper component. */
    wrapper?: React.CSSProperties
    /** Inline styles for the inner scroll zone. */
    scrollZone?: React.CSSProperties
  }
  ref?: {
    /** Optional ref for the wrapper element. */
    wrapper?: React.Ref<HTMLElement>
    /** Optional ref for the scrollable inner zone. */
    scrollZone?: React.Ref<HTMLDivElement>
  }
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
 *
 * @returns {JSX.Element} The Carousel component.
 */
export const Carousel = ({
  children,
  itemsCount,
  navigationHandler,
  visibleItems = 1,
  gap = 0,
  className,
  style,
  ref
}: Props) => {
  // Refs
  const baseWrapperRef = useRef<HTMLElement>(null)
  const baseScrollRef = useRef<HTMLDivElement>(null)

  const wrapperRef = useCombinedRef(ref?.wrapper, baseWrapperRef)
  const scrollRef = useCombinedRef(ref?.scrollZone, baseScrollRef)

  // State
  const [tileWidth, setTileWidth] = useState<number>(-1)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const extraDependencies = useMemo(() => [gap, itemsCount, visibleItems], [gap, itemsCount, visibleItems])

  // Tile width calculation
  const refreshWidth = useCallback(() => {
    const el = baseScrollRef.current
    if (!el) return
    const totalGap = gap * (visibleItems - 1)
    const width = (el.offsetWidth - totalGap) / visibleItems
    setTileWidth(width)
  }, [visibleItems, ...extraDependencies])

  useEffect(refreshWidth, [visibleItems, ...extraDependencies])
  useEffect(() => {
    window.addEventListener('resize', refreshWidth)
    return () => window.removeEventListener('resize', refreshWidth)
  }, [refreshWidth])

  // Scroll index tracking
  useEffect(() => {
    const el = baseScrollRef.current
    if (!el) return
    const handleScroll = () => setSelectedIndex(Math.round(el.scrollLeft / tileWidth))
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [tileWidth, ...extraDependencies])

  // Context data
  const widthForTile = tileWidth !== -1 ? `${tileWidth}px` : undefined
  const tileProps = {
    className: 'shrink-0 snap-start',
    style: { width: widthForTile, maxWidth: widthForTile, minWidth: widthForTile }
  }

  return (
    <CarouselContext.Provider
      value={{
        tileProps,
        elementRef: baseScrollRef,
        gap,
        tileWidth,
        visibleItems,
        itemsCount,
        selectedIndex
      }}
    >
      <section
        className={twMerge(`relative w-full ${className?.wrapper ?? ''}`)}
        style={style?.wrapper}
        ref={wrapperRef}
      >
        <div
          ref={scrollRef}
          className={twMerge(`
            flex overflow-x-scroll max-w-full w-full h-full
            snap-x snap-mandatory rounded-2xl [&::-webkit-scrollbar]:hidden
            ${className?.scrollZone ?? ''}
          `)}
          style={{
            contain: 'layout inline-size',
            gap: `${gap}px`,
            ...style?.scrollZone,

            // Hide scrollbar for IE, Edge and Firefox. Chromium browsers handled via Tailwind class above.
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {tileWidth > 0 && children}
        </div>

        {navigationHandler}
      </section>
    </CarouselContext.Provider>
  )
}
