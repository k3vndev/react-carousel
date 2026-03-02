'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CarouselContext } from '../context'
import { useCombinedRef } from '../hooks'
import type { CarouselComponent } from '../types'
import '../styles.css'
import { useAutoScroll } from '../hooks/use-auto-scroll'
import { cn } from '../utils/cn'

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
  autoScroll = false,
  ref
}) => {
  // Refs
  const baseWrapperRef = useRef<HTMLElement>(null)
  const wrapperRef = useCombinedRef(ref, baseWrapperRef)

  const scrollRef = useRef<HTMLDivElement>(null)

  // State
  const [tileWidth, setTileWidth] = useState<number>(-1)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const extraDependencies = useMemo(() => [gap, itemsCount, visibleItems], [gap, itemsCount, visibleItems])

  // Tile width calculation
  const refreshWidth = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const totalGap = gap * (visibleItems - 1)
    const width = (el.offsetWidth - totalGap) / visibleItems
    setTileWidth(width)
  }, [visibleItems, ...extraDependencies])

  useAutoScroll(autoScroll)

  useEffect(refreshWidth, [visibleItems, ...extraDependencies])
  useEffect(() => {
    window.addEventListener('resize', refreshWidth)
    return () => window.removeEventListener('resize', refreshWidth)
  }, [refreshWidth])

  // Scroll index tracking
  useEffect(() => {
    const el = scrollRef.current
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
        elementRef: scrollRef,
        gap,
        tileWidth,
        visibleItems,
        itemsCount,
        selectedIndex
      }}
    >
      <section className={cn('relative w-full ', className)} ref={wrapperRef}>
        <div
          ref={scrollRef}
          className='scroll-zone flex overflow-x-scroll max-w-full w-full h-full snap-x snap-mandatory rounded-2xl [&::-webkit-scrollbar]:hidden'
          style={{
            contain: 'layout inline-size',
            gap: `${gap}px`,

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
