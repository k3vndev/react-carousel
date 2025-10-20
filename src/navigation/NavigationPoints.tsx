'use client'

import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from '../context/carousel-context'
import { dispatchNavigationActionEvent } from '../lib/dispatchNavigationActionEvent'
import type { ReusableComponent } from '../types'
import { useCarousel } from '../useCarousel'

interface Props {
  className?: {
    wrapper?: string
    points?: string
    selectedPoint?: string
  }
  style?: {
    wrapper?: React.CSSProperties
    points?: React.CSSProperties
  }
}

export const NavigationPoints = ({ className, style }: Props) => {
  const { itemsCount, selectedIndex } = useContext(CarouselContext)
  const itemsArray = Array(itemsCount).fill(null)

  return (
    <div
      className={twMerge(`
        absolute left-1/2 -translate-x-1/2 -bottom-10
        flex gap-6 ${className?.wrapper ?? ''}
      `)}
      style={style?.wrapper}
    >
      {itemsArray.map((_, i) => {
        const isSelected = selectedIndex === i
        const className_ = `${isSelected ? (className.selectedPoint ?? '') : ''} ${className?.points ?? ''}`

        return (
          <Point index={i} key={i} isSelected={isSelected} style={style?.points} className={className_} />
        )
      })}
    </div>
  )
}

interface PointProps extends ReusableComponent {
  index: number
  isSelected: boolean
}

const Point = ({ index, isSelected, className = '', style }: PointProps) => {
  const { carouselNavigator } = useCarousel()
  const { elementRef } = useContext(CarouselContext)

  const handleClick = () => {
    carouselNavigator.scrollToIndex(index)
    dispatchNavigationActionEvent(elementRef.current)
  }

  const selectedStyle = isSelected ? 'bg-white/75 scale-120' : 'bg-white/35 button'

  return (
    <button
      onClick={handleClick}
      className={twMerge(`
        relative size-4 rounded-full ${selectedStyle} transition ${className}
      `)}
      style={style}
    >
      <div className='absolute left-1/2 top-1/2 -translate-1/2 size-[200%] bg-transparent' />
    </button>
  )
}
