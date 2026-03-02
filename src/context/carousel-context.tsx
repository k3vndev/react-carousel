import { createContext, useContext } from 'react'
import type { CarouselNavigator } from '../types/use-carousel'

export interface CarouselContextType {
  tileProps: {
    className: string
    style: React.CSSProperties
  }
  elementRef: React.RefObject<HTMLDivElement | null>
  gap: number
  visibleItems: number
  tileWidth: number
  itemsCount: number
  selectedIndex: number
  navigator: CarouselNavigator
}

export const CarouselContext = createContext<CarouselContextType>({
  tileProps: { className: '', style: {} },
  elementRef: { current: null },
  gap: 0,
  visibleItems: 0,
  tileWidth: 0,
  itemsCount: 0,
  selectedIndex: 0,
  navigator: {
    scrollLeft: () => {},
    scrollRight: () => {},
    scrollToIndex: () => {}
  }
})

export const useCarouselContext = () => useContext(CarouselContext)
