'use client'

import { useContext, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from '../context'
import { useCarousel, useCombinedRef } from '../hooks'
import type { NavigationPointsComponent, NavigationPointsProps, ReusableComponent } from '../types'
import { emitNavigationEvent } from '../utils'
import '../styles.css'

/**
 * Dot-based slide navigation for `Carousel`.
 *
 * @see NavigationPointsComponent
 */
export const NavigationPoints: NavigationPointsComponent = ({
  className,
  style,
  ref
}: NavigationPointsProps) => {
  const { itemsCount, selectedIndex } = useContext(CarouselContext)
  const baseWrapperRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useCombinedRef(ref?.wrapper, baseWrapperRef)

  const itemsArray = Array(itemsCount).fill(null)

  return (
    <div
      ref={wrapperRef}
      className={twMerge(`
        absolute left-1/2 -translate-x-1/2 -bottom-10
        flex gap-6 ${className?.wrapper ?? ''}
      `)}
      style={style?.wrapper}
    >
      {itemsArray.map((_, i) => (
        <Point
          key={i}
          index={i}
          isSelected={selectedIndex === i}
          className={className?.points ?? ''}
          style={style?.points}
          ref={ref?.points}
        />
      ))}
    </div>
  )
}

interface PointProps extends ReusableComponent {
  index: number
  isSelected: boolean
  ref?: React.RefObject<HTMLButtonElement | null>
}

/**
 * A single navigation point (dot) used by `NavigationPoints`.
 *
 * Automatically handles carousel navigation when clicked.
 */
const Point = ({ index, isSelected, className = '', style, ref }: PointProps) => {
  const { carouselNavigator } = useCarousel()
  const { elementRef } = useContext(CarouselContext)
  const baseRef = useRef<HTMLButtonElement>(null)
  const buttonRef = useCombinedRef(ref, baseRef)

  const handleClick = () => {
    carouselNavigator.scrollToIndex(index)
    emitNavigationEvent(elementRef.current)
  }

  const selectedStyle = isSelected
    ? 'active bg-white/90 scale-120'
    : 'not-active button bg-white/25 hover:bg-white/40'

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={twMerge(`
        relative size-4 rounded-full transition ${selectedStyle} ${className}
      `)}
      style={style}
    >
      <div className='absolute left-1/2 top-1/2 -translate-1/2 size-[200%] bg-transparent' />
    </button>
  )
}
