import { createContext } from 'react'

interface CarouselContextType {
  tileProps: {
    className: string
    style: React.CSSProperties
  }
  elementRef: React.RefObject<HTMLDivElement | null>
  gap: number
  visibleItems: number
  tileWidth: number
  itemsCount: number
}

export const CarouselContext = createContext<CarouselContextType>({
  tileProps: { className: '', style: {} },
  elementRef: { current: null },
  gap: 0,
  visibleItems: 0,
  tileWidth: 0,
  itemsCount: 0
})
