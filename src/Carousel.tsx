'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from './context'
import { useCombinedRef } from './hooks'
import type { CarouselComponent } from './types'
import './styles.css'

/**
 * Horizontal scrollable carousel component.
 *
 * @see CarouselComponent
 */
export const Carousel: CarouselComponent = ({
  children,
  itemsCount,
  navigationHandler,
  visibleItems = 1,
  gap = 0,
  className,
  style,
  ref
}) => {
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
