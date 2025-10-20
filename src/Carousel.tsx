'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from './context/carousel-context'

interface Props {
  itemsCount: number
  visibleItems?: number
  gap?: number
  children?: React.ReactNode
  navigationHandler?: React.ReactNode

  className?: {
    wrapper?: string
    scrollZone?: string
  }
  style?: {
    wrapper?: React.CSSProperties
    scrollZone?: React.CSSProperties
  }
}

export const Carousel = ({
  children,
  itemsCount,
  navigationHandler,
  visibleItems = 1,
  gap = 0,
  className,
  style
}: Props) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [tileWidth, setTileWidth] = useState<number>(-1)

  // Calculate the width of the tile based on the screen size
  const refreshWidth = useCallback(() => {
    if (!elementRef.current) return

    const { offsetWidth } = elementRef.current
    const totalGap = gap * (visibleItems - 1)
    const width = (offsetWidth - totalGap) / visibleItems
    setTileWidth(width)
  }, [visibleItems, gap])

  useEffect(refreshWidth, [visibleItems, gap])
  useEffect(() => {
    window.addEventListener('resize', refreshWidth)
    return () => window.removeEventListener('resize', refreshWidth)
  }, [visibleItems, gap])

  const widthForTile = tileWidth !== -1 ? `${tileWidth}px` : undefined

  const tileProps = {
    className: 'shrink-0 snap-start',
    style: { width: widthForTile, maxWidth: widthForTile, minWidth: widthForTile }
  }

  return (
    <CarouselContext.Provider value={{ tileProps, elementRef, gap, tileWidth, visibleItems, itemsCount }}>
      <section className={twMerge(`relative w-full ${className?.wrapper ?? ''}`)} style={style?.wrapper}>
        <div
          ref={elementRef}
          className={`
            flex overflow-x-scroll max-w-full w-full
            scrollbar-hide snap-x snap-mandatory rounded-2xl
            ${className?.scrollZone ?? ''}
          `}
          style={{
            contain: 'layout inline-size',
            gap: `${gap}px`,
            ...style?.scrollZone
          }}
        >
          {tileWidth > 0 && children}
        </div>

        {navigationHandler}
      </section>
    </CarouselContext.Provider>
  )
}
