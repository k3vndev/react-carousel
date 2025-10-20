'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from './context/carousel-context'
import type { ReusableComponent } from './types'

interface Props extends ReusableComponent {
  visibleItems?: number
  gap?: number
  children?: React.ReactNode

  navigation: React.ReactNode
}

export const Carousel = ({
  children,
  navigation,
  visibleItems = 1,
  gap = 0,
  className = '',
  ...props
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
    <CarouselContext.Provider value={{ tileProps, elementRef, gap, tileWidth, visibleItems }}>
      <section className={twMerge(`relative ${className}`)} {...props}>
        <div
          ref={elementRef}
          className={`
            flex overflow-x-scroll w-full max-w-full
            scrollbar-hide snap-x snap-mandatory rounded-[1.25rem]
          `}
          style={{ contain: 'layout inline-size', gap: `${gap}px` }}
        >
          {children}
        </div>

        {navigation}
      </section>
    </CarouselContext.Provider>
  )
}
