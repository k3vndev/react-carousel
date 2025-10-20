'use client'

import { useContext, useEffect, useRef } from 'react'
import { CarouselContext } from '../context/carousel-context'
import { useFreshRefs } from '../hooks/useFreshRefs'
import { NAVIGATION_EVENT_NAME } from '../lib/dispatchNavigationActionEvent'
import { useCarousel } from '../useCarousel'

type Props = {
  slideCooldown?: number
  slideRestartCooldown?: number
  preventStopOnInteraction?: boolean
}

export const NavigationAutomatic = ({
  slideCooldown = 2500,
  slideRestartCooldown = 5000,
  preventStopOnInteraction = false
}: Props) => {
  const { elementRef, itemsCount, selectedIndex } = useContext(CarouselContext)
  const { carouselNavigator } = useCarousel()
  const timeoutRef = useRef<number | null>(null)

  const refs = useFreshRefs({ selectedIndex, carouselNavigator })

  const stopTimeout = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
    timeoutRef.current = null
  }

  const startTimeout = (time: number) => {
    stopTimeout()

    timeoutRef.current = setTimeout(() => {
      const { selectedIndex, carouselNavigator } = refs.current

      const nextIndex = selectedIndex < itemsCount - 1 ? selectedIndex + 1 : 0
      carouselNavigator.scrollToIndex(nextIndex)

      startTimeout(time)
    }, time)
  }

  useEffect(() => {
    startTimeout(slideCooldown)
    if (!elementRef.current || preventStopOnInteraction) return

    const restart = () => {
      startTimeout(slideRestartCooldown)
    }

    elementRef.current.addEventListener('pointerenter', stopTimeout)
    elementRef.current.addEventListener('pointerleave', restart)
    elementRef.current.addEventListener('touchstart', stopTimeout)
    elementRef.current.addEventListener('touchend', restart)
    elementRef.current.addEventListener('touchcancel', restart)
    elementRef.current.addEventListener(NAVIGATION_EVENT_NAME, restart)

    return () => {
      stopTimeout()
      elementRef.current?.removeEventListener('pointerenter', stopTimeout)
      elementRef.current?.removeEventListener('pointerleave', restart)
      elementRef.current?.removeEventListener('touchstart', stopTimeout)
      elementRef.current?.removeEventListener('touchend', restart)
      elementRef.current?.removeEventListener('touchcancel', restart)
      elementRef.current?.removeEventListener(NAVIGATION_EVENT_NAME, restart)
    }
  }, [])

  return null
}
