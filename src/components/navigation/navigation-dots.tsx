'use client'

import { useRef } from 'react'
import { useCarousel, useCombinedRef } from '../../hooks'
import { emitNavigationEvent } from '../../utils'
import '../../styles.css'
import { useCarouselContext } from '../../context'
import type { NavigationDotsComponent, NavigationDotsProps } from '../../types/navigation-points'
import { cn } from '../../utils/cn'

/**
 * Dot-based slide navigation for `Carousel`.
 *
 * @see NavigationDotsComponent
 */
export const NavigationDots: NavigationDotsComponent = ({ className, ref }: NavigationDotsProps) => {
  const { itemsCount, selectedIndex, visibleItems } = useCarouselContext()
  const baseWrapperRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useCombinedRef(ref, baseWrapperRef)

  const itemsArray = Array(itemsCount).fill(null)

  return (
    <div
      ref={wrapperRef}
      className={cn('absolute left-1/2 -translate-x-1/2 -bottom-10 flex gap-6', className)}
    >
      {itemsArray.map((_, i) => {
        const isSelected = selectedIndex === i || (i >= selectedIndex && i < selectedIndex + visibleItems)
        return <DotButton key={i} index={i} isSelected={isSelected} />
      })}
    </div>
  )
}

interface PointProps {
  index: number
  isSelected: boolean
  ref?: React.RefObject<HTMLButtonElement | null>
}

/**
 * A single navigation dot used by `NavigationDots`.
 *
 * Automatically handles carousel navigation when clicked.
 */
const DotButton = ({ index, isSelected }: PointProps) => {
  const { carouselNavigator } = useCarousel()
  const { elementRef } = useCarouselContext()

  const handleClick = () => {
    carouselNavigator.scrollToIndex(index)
    emitNavigationEvent(elementRef.current)
  }

  const selectedStyle = isSelected
    ? 'active bg-white/90 scale-120'
    : 'not-active bg-white/25 hover:bg-white/40'

  return (
    <button
      onClick={handleClick}
      className={cn('button relative size-4 rounded-full transition', selectedStyle)}
      draggable={false}
    >
      <div className='absolute left-1/2 top-1/2 -translate-1/2 size-[200%] bg-transparent' />
    </button>
  )
}
