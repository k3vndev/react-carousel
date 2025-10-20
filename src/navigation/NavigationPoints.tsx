import { useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from '../context/carousel-context'
import type { ReusableComponent } from '../types'
import { useCarousel } from '../useCarousel'

interface Props extends ReusableComponent {
  itemsCount: number
}

export const NavigationPoints = ({ itemsCount, className = '', ...props }: Props) => {
  const itemsArray = Array(itemsCount).fill(null)
  const { tileWidth, elementRef, gap } = useContext(CarouselContext)
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
        flex gap-6 ${className}
      `)}
      {...props}
    >
      {itemsArray.map((_, i) => (
        <Point index={i} key={i} isSelected={selected === i} />
      ))}
    </div>
  )
}

interface PointProps {
  index: number
  isSelected: boolean
}

const Point = ({ index, isSelected }: PointProps) => {
  const { navigator } = useCarousel()

  const handleClick = () => {
    navigator.scrollToIndex(index)
  }

  const selectedStyle = isSelected ? 'bg-white/75 scale-110' : 'bg-white/35 button'

  return (
    <button
      onClick={handleClick}
      className={`
        size-4 rounded-full ${selectedStyle} transition
      `}
    />
  )
}
