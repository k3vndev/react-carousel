import { useContext, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from '../context/carousel-context'
import { ChevronIcon } from '../icons/Chevron'
import type { ReusableComponent } from '../types'
import { useCarousel } from '../useCarousel'

interface Props {
  left?: ReusableComponent
  right?: ReusableComponent
  both?: ReusableComponent
}

export const NavigationArrows = ({ left, right, both }: Props) => {
  const { elementRef, gap, tileWidth, visibleItems } = useContext(CarouselContext)
  const [buttonVisible, setButtonVisible] = useState({ left: false, right: false })
  const MIN_DIST_FROM_BORDER = 32
  const initialScroll = useRef(true)

  const { navigator } = useCarousel()

  // Initial scroll to the first tile
  useEffect(() => {
    if (buttonVisible.left && initialScroll.current && tileWidth) {
      initialScroll.current = false
    }
  }, [buttonVisible, tileWidth])

  // Handles the visibility of the buttons
  const handleULScroll = () => {
    if (elementRef.current == null || !tileWidth) return

    const itemsWidth = tileWidth * visibleItems + gap * (visibleItems - 1)
    const scrollLeft = elementRef.current.scrollLeft
    const scrollRight = elementRef.current.scrollWidth - itemsWidth - scrollLeft

    setButtonVisible({
      left: scrollLeft > MIN_DIST_FROM_BORDER,
      right: scrollRight > MIN_DIST_FROM_BORDER
    })
  }

  // Handles the scroll event of the ul element
  useEffect(() => {
    handleULScroll()

    elementRef.current?.addEventListener('scroll', handleULScroll)
    return () => elementRef.current?.removeEventListener('scroll', handleULScroll)
  }, [visibleItems, tileWidth])

  return (
    <>
      <Arrow
        className={`left-0 -translate-x-1/2 ${both?.className ?? ''} ${left?.className ?? ''}`}
        onClick={navigator.scrollLeft}
        visible={buttonVisible.left}
        style={{ ...left?.style, ...both?.style }}
        ref={left?.ref ?? both?.ref}
      >
        <ChevronIcon className='rotate-180' />
      </Arrow>

      <Arrow
        className={`right-0 translate-x-1/2 ${both?.className ?? ''} ${right?.className ?? ''}`}
        onClick={navigator.scrollRight}
        visible={buttonVisible.right}
        style={{ ...right?.style, ...both?.style }}
        ref={right?.ref ?? both?.ref}
      >
        <ChevronIcon />
      </Arrow>
    </>
  )
}

interface NavigationButtonsProps extends ReusableComponent {
  children: React.ReactNode
  onClick: () => void
  visible?: boolean
}

const Arrow = ({ className = '', children, onClick, visible, ...props }: NavigationButtonsProps) => {
  const visibility = visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'

  return (
    <div
      className={twMerge(`
        absolute top-1/2 -translate-y-1/2 transition-all duration-200 
        ${visibility} ${className}
      `)}
      {...props}
    >
      <button
        className={`
          p-2 rounded-full bg-gray-60 border border-white/15 text-gray-20
          button shadow-card shadow-black/30 relative bg-black/50 
          backdrop-blur-xl md:*:size-10 *:size-6
        `}
        onClick={onClick}
        disabled={!visible}
      >
        {children}
      </button>
    </div>
  )
}
