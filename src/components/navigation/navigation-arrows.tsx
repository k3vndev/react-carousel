'use client'

import { useEffect, useRef, useState } from 'react'
import { useCarouselContext } from '../../context'
import { useCarousel, useCombinedRef } from '../../hooks'
import { ChevronIcon } from '../../icons'
import type { NavigationArrowsComponent, NavigationArrowsProps } from '../../types'
import { emitNavigationEvent } from '../../utils'
import '../../styles.css'
import { cn } from '../../utils/cn'

/**
 * Previous/next arrow navigation for `Carousel`.
 *
 * @see NavigationArrowsComponent
 */
export const NavigationArrows: NavigationArrowsComponent = ({ className }: NavigationArrowsProps) => {
  const { elementRef, gap, tileWidth, visibleItems } = useCarouselContext()
  const [buttonVisible, setButtonVisible] = useState({ left: false, right: false })
  const MIN_DIST_FROM_BORDER = 32
  const initialScroll = useRef(true)
  const { carouselNavigator } = useCarousel()

  const isFirstRender = useRef(true)

  // Initial scroll behavior
  useEffect(() => {
    if (buttonVisible.left && initialScroll.current && tileWidth) {
      initialScroll.current = false
    }
  }, [buttonVisible, tileWidth])

  // Toggle button visibility depending on scroll position
  const handleULScroll = () => {
    if (!elementRef.current || !tileWidth) return

    const itemsWidth = tileWidth * visibleItems + gap * (visibleItems - 1)
    const scrollLeft = elementRef.current.scrollLeft
    const scrollRight = elementRef.current.scrollWidth - itemsWidth - scrollLeft

    setButtonVisible({
      left: scrollLeft > MIN_DIST_FROM_BORDER,
      right: scrollRight > MIN_DIST_FROM_BORDER
    })
  }

  useEffect(() => {
    // Delay the first scroll event to give some time for layout calculations
    if (isFirstRender.current) {
      isFirstRender.current = false
      setTimeout(handleULScroll, 300)
    }

    elementRef.current?.addEventListener('scroll', handleULScroll)
    return () => elementRef.current?.removeEventListener('scroll', handleULScroll)
  }, [visibleItems, tileWidth])

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Arrow
        ref={leftRef}
        className={cn('left-0 -translate-x-1/2', className)}
        onClick={carouselNavigator.scrollLeft}
        visible={buttonVisible.left}
      >
        <ChevronIcon className='text-white/50 rotate-180' />
      </Arrow>

      <Arrow
        ref={rightRef}
        className={cn('right-0 translate-x-1/2', className)}
        onClick={carouselNavigator.scrollRight}
        visible={buttonVisible.right}
      >
        <ChevronIcon className='text-white/50' />
      </Arrow>
    </>
  )
}

interface NavigationButtonsProps {
  className?: string
  children: React.ReactNode
  onClick: () => void
  visible?: boolean
  ref?: React.RefObject<HTMLDivElement | null>
}

/**
 * Internal component for each navigation arrow.
 * Handles click actions and visibility transitions.
 */
const Arrow = ({ className = '', children, onClick, visible, ref, ...props }: NavigationButtonsProps) => {
  const visibility = visible
    ? 'visible opacity-100 scale-100 button *:cursor-pointer'
    : 'not-visible opacity-0 scale-50'

  const { elementRef } = useCarouselContext()
  const baseRef = useRef<HTMLDivElement>(null)
  const combinedRef = useCombinedRef(ref, baseRef)

  const handleClick = () => {
    onClick()
    emitNavigationEvent(elementRef.current)
  }

  return (
    <div
      ref={combinedRef}
      className={cn('absolute top-1/2 -translate-y-1/2 transition-all duration-200', visibility, className)}
      {...props}
    >
      <button
        className={cn(
          'p-2 rounded-full bg-gray-60 border border-white/25 text-gray-20 shadow-black shadow-2xl relative bg-black/85 backdrop-blur-xl md:*:size-10 *:size-6'
        )}
        onClick={handleClick}
        disabled={!visible}
      >
        {children}
      </button>
    </div>
  )
}
