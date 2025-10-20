import { useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from '../context/carousel-context'
import type { ReusableComponent } from '../types'
import { useCarousel } from '../useCarousel'

interface Props {
  className?: {
    wrapper?: string
    points?: string
  }
  style?: {
    wrapper?: React.CSSProperties
    points?: React.CSSProperties
  }
}

export const NavigationPoints = ({ className, style }: Props) => {
  const { tileWidth, elementRef, gap, itemsCount } = useContext(CarouselContext)
  const itemsArray = Array(itemsCount).fill(null)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return
      const { scrollLeft } = elementRef.current
      setSelected(Math.round(scrollLeft / tileWidth))
    }

    elementRef.current.addEventListener('scroll', handleScroll)
    return () => elementRef.current?.removeEventListener('scroll', handleScroll)
  }, [tileWidth, gap])

  return (
    <div
      className={twMerge(`
        absolute left-1/2 -translate-x-1/2 -bottom-10
        flex gap-6 ${className?.wrapper ?? ''}
      `)}
      style={style?.wrapper}
    >
      {itemsArray.map((_, i) => (
        <Point
          index={i}
          key={i}
          isSelected={selected === i}
          style={style?.points}
          className={className?.points}
        />
      ))}
    </div>
  )
}

interface PointProps extends ReusableComponent {
  index: number
  isSelected: boolean
}

const Point = ({ index, isSelected, className = '', style }: PointProps) => {
  const { carouselNavigator } = useCarousel()

  const handleClick = () => {
    carouselNavigator.scrollToIndex(index)
  }

  const selectedStyle = isSelected ? 'bg-white/75 scale-110' : 'bg-white/35 button'

  return (
    <button
      onClick={handleClick}
      className={twMerge(`
        size-4 rounded-full ${selectedStyle} transition
        ${className}
      `)}
      style={style}
    />
  )
}
