import { useContext } from 'react'
import { CarouselContext } from './context/carousel-context'

export const useCarousel = () => {
  const { elementRef, tileWidth, visibleItems, gap, itemsCount } = useContext(CarouselContext)

  const scroll = (value: number) => {
    elementRef.current?.scrollTo({
      left: value,
      behavior: 'smooth'
    })
  }

  // Handles the scroll to the left or right
  const scrollToDirection = (isLeft: boolean, itemsDistance?: number) => {
    const newItemsDistance =
      !itemsDistance || Number.isNaN(+itemsDistance) ? visibleItems : Math.round(itemsDistance)

    if (tileWidth > 0 && newItemsDistance > 0 && elementRef.current) {
      const direction = isLeft ? -1 : 1
      const totalGap = calcTotalGap(newItemsDistance)
      const scrollAmount = (tileWidth * newItemsDistance + totalGap) * direction

      scroll(scrollAmount + elementRef.current.scrollLeft)
    }
  }

  const calcTotalGap = (itemsCount: number) => gap * (itemsCount - 1)

  const scrollToIndex = (index: number) => {
    const scrollAmount = tileWidth * index + calcTotalGap(index)
    scroll(scrollAmount)
  }

  const carouselData = {
    tileWidth,
    visibleItems,
    gap,
    itemsCount
  }

  const carouselNavigator = {
    scrollLeft: (itemsDistance?: number) => scrollToDirection(true, itemsDistance),
    scrollRight: (itemsDistance?: number) => scrollToDirection(false, itemsDistance),
    scrollToIndex
  }

  return { carouselNavigator, carouselData }
}
