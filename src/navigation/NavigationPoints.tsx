'use client'

import { useContext, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from '../context/carousel-context'
import { useCombinedRef } from '../hooks/useCombinedRef'
import { dispatchNavigationActionEvent } from '../lib/dispatchNavigationActionEvent'
import type { ReusableComponent } from '../types'
import { useCarousel } from '../useCarousel'
import '../styles.css'

interface Props {
  /** Additional CSS/Tailwind class names for the wrapper and points components. */
  className?: {
    /** Extra classes for the wrapper element. */
    wrapper?: string
    /**
     * Extra classes for each point element.
     * You can use `[&.active]:` and `[&.not-active]:` with Tailwind to style the active points.
     *
     * @example
     * ```tsx
     * className={{ points: '[&.active]:bg-yellow-400' }}
     * ```
     */
    points?: string
  }

  /** Optional inline styles for wrapper and points. */
  style?: {
    /** Styles for the wrapper element. */
    wrapper?: React.CSSProperties
    /** Styles for each point element. */
    points?: React.CSSProperties
  }

  ref?: {
    /** Ref to the wrapper element containing all navigation points. */
    wrapper?: React.RefObject<HTMLDivElement | null>
    /** Ref to the individual point elements. */
    points?: React.RefObject<HTMLButtonElement | null>
  }
}

/**
 * `NavigationPoints` renders a row of circular buttons to represent and navigate between carousel slides.
 *
 * It syncs automatically with the current carousel state via `CarouselContext`.
 *
 * @example
 * ```tsx
 * <Carousel
 *   navigationHandler={<NavigationPoints />}
 *   itemsCount={3}
 * >
 *   <CarouselItem>Slide 1</CarouselItem>
 *   <CarouselItem>Slide 2</CarouselItem>
 *   <CarouselItem>Slide 3</CarouselItem>
 * </Carousel>
 * ```
 *
 * @param {Props} props - The props for NavigationPoints.
 * @returns {JSX.Element} The rendered navigation component.
 */
export const NavigationPoints = ({ className, style, ref }: Props) => {
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
    dispatchNavigationActionEvent(elementRef.current)
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
