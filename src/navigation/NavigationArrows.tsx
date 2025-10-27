'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from '../context/carousel-context'
import { useCombinedRef } from '../hooks/useCombinedRef'
import { ChevronIcon } from '../icons/Chevron'
import { dispatchNavigationActionEvent } from '../lib/dispatchNavigationActionEvent'
import type { ReusableComponent } from '../types'
import { useCarousel } from '../useCarousel'

interface Props {
  /**
   * Custom class names for each arrow button or both.
   * You can use `[&.visible]:` and `[&.not-visible]:` with Tailwind to style the arrow buttons.
   *
   * @example
   * ```tsx
   * className={{ left: '[&.visible]:bg-yellow-400', right: '[&.visible]:bg-red-400' }}
   * ```
   */
  className?: {
    /** Extra classes for the left navigation arrow. */
    left?: string
    /** Extra classes for the right navigation arrow. */
    right?: string
    /** Classes applied to both arrows. */
    both?: string
  }

  /** Optional inline styles for arrows. */
  style?: {
    /** Inline style for the left arrow. */
    left?: React.CSSProperties
    /** Inline style for the right arrow. */
    right?: React.CSSProperties
    /** Inline style applied to both arrows. */
    both?: React.CSSProperties
  }

  ref?: {
    /** Ref for the left arrow wrapper element. */
    left?: React.RefObject<HTMLDivElement | null>
    /** Ref for the right arrow wrapper element. */
    right?: React.RefObject<HTMLDivElement | null>
  }
}

/**
 * `NavigationArrows` provides previous/next buttons for the Carousel.
 *
 * Buttons automatically appear and hide depending on scroll position.
 *
 * @example
 * ```tsx
 * <Carousel
 *   navigationHandler={<NavigationArrows />}
 *   itemsCount={5}
 * >
 *   <CarouselItem>Slide 1</CarouselItem>
 *   <CarouselItem>Slide 2</CarouselItem>
 *   <CarouselItem>Slide 3</CarouselItem>
 *   <CarouselItem>Slide 4</CarouselItem>
 *   <CarouselItem>Slide 5</CarouselItem>
 * </Carousel>
 * ```
 *
 * @param {Props} props - Component props for `NavigationArrows`.
 * @returns {JSX.Element} The rendered navigation arrows.
 */
export const NavigationArrows = ({ className, style, ref }: Props) => {
  const { elementRef, gap, tileWidth, visibleItems } = useContext(CarouselContext)
  const [buttonVisible, setButtonVisible] = useState({ left: false, right: false })
  const MIN_DIST_FROM_BORDER = 32
  const initialScroll = useRef(true)
  const { carouselNavigator } = useCarousel()

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
    handleULScroll()
    elementRef.current?.addEventListener('scroll', handleULScroll)
    return () => elementRef.current?.removeEventListener('scroll', handleULScroll)
  }, [visibleItems, tileWidth])

  const baseLeftRef = useRef<HTMLDivElement>(null)
  const baseRightRef = useRef<HTMLDivElement>(null)
  const leftRef = useCombinedRef(ref?.left, baseLeftRef)
  const rightRef = useCombinedRef(ref?.right, baseRightRef)

  return (
    <>
      <Arrow
        ref={leftRef as any}
        className={`left-0 -translate-x-1/2 ${className?.both ?? ''} ${className?.left ?? ''}`}
        onClick={carouselNavigator.scrollLeft}
        visible={buttonVisible.left}
        style={{ ...style?.left, ...style?.both }}
      >
        <ChevronIcon className='text-white/50 rotate-180' />
      </Arrow>

      <Arrow
        ref={rightRef as any}
        className={`right-0 translate-x-1/2 ${className?.both ?? ''} ${className?.right ?? ''}`}
        onClick={carouselNavigator.scrollRight}
        visible={buttonVisible.right}
        style={{ ...style?.right, ...style?.both }}
      >
        <ChevronIcon className='text-white/50' />
      </Arrow>
    </>
  )
}

interface NavigationButtonsProps extends ReusableComponent {
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
  const visibility = visible ? 'visible opacity-100 scale-100' : 'not-visible opacity-0 scale-50'
  const { elementRef } = useContext(CarouselContext)
  const baseRef = useRef<HTMLDivElement>(null)
  const combinedRef = useCombinedRef(ref, baseRef)

  const handleClick = () => {
    onClick()
    dispatchNavigationActionEvent(elementRef.current)
  }

  return (
    <div
      ref={combinedRef}
      className={twMerge(`
        absolute top-1/2 -translate-y-1/2 transition-all duration-200 
        ${visibility} ${className}
      `)}
      {...props}
    >
      <button
        className={twMerge(`
          p-2 rounded-full bg-gray-60 border border-white/25 text-gray-20
          button shadow-black shadow-2xl relative bg-black/85 
          backdrop-blur-xl md:*:size-10 *:size-6
        `)}
        onClick={handleClick}
        disabled={!visible}
      >
        {children}
      </button>
    </div>
  )
}
