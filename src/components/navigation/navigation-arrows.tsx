'use client'

import { useEffect, useRef, useState } from 'react'
import { BUTTON_CLASS_NAMES } from '../../consts'
import { useCarouselContext } from '../../context'
import { useCarousel } from '../../hooks'
import { ChevronIcon } from '../../icons'
import type { NavigationArrowsComponent, NavigationArrowsProps } from '../../types'
import { emitNavigationEvent } from '../../utils'
import { cn } from '../../utils/cn'

/**
 * Previous/next arrow navigation handler for `Carousel`.
 *
 * @example
 * ```tsx
 * <NavigationArrows className='text-yellow-400 [&>left]:bg-black' />
 * ```
 *
 * @example The rendered HTML structure of the `NavigationArrows` component will look like this:
 * ```tsx
 * <button class="left">
 *   <svg class="rotate-180" />
 * </button>
 * <button class="right">
 *   <svg class="rotate-0" />
 * </button>
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

  return (
    <>
      <ArrowButton
        className={cn('left left-0 -translate-x-1/2', className)}
        onClick={carouselNavigator.scrollLeft}
        visible={buttonVisible.left}
      >
        <ChevronIcon className='rotate-180' />
      </ArrowButton>

      <ArrowButton
        className={cn('right right-0 translate-x-1/2', className)}
        onClick={carouselNavigator.scrollRight}
        visible={buttonVisible.right}
      >
        <ChevronIcon />
      </ArrowButton>
    </>
  )
}

interface ArrowButtonProps {
  className?: string
  children: React.ReactNode
  onClick: () => void
  visible?: boolean
}

const ArrowButton = ({ className = '', children, onClick, visible }: ArrowButtonProps) => {
  const visibility = visible
    ? `visible opacity-100 scale-100 ${BUTTON_CLASS_NAMES} *:cursor-pointer`
    : 'not-visible opacity-0 scale-50'

  const { elementRef } = useCarouselContext()

  const handleClick = () => {
    onClick()
    emitNavigationEvent(elementRef.current)
  }

  return (
    <button
      className={cn(
        'absolute top-1/2 -translate-y-1/2 transition-all duration-200 p-3 rounded-full bg-gray-60 border border-white/20 text-gray-20 shadow-black shadow-2xl bg-black/90 md:[&>svg]:size-10 [&>svg]:size-6 text-white/75 [&>svg]:scale-y-115',
        visibility,
        className
      )}
      onClick={handleClick}
      disabled={!visible}
    >
      {children}
    </button>
  )
}
