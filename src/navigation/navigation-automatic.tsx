'use client'

import { useContext, useEffect, useRef } from 'react'
import { CarouselContext } from '../context'
import { useCarousel, useFreshRefs } from '../hooks'
import type { NavigationAutomaticComponent, NavigationAutomaticProps } from '../types'
import { NAVIGATION_EVENT_NAME } from '../utils'
import '../styles.css'

/**
 * Automatic carousel navigation (autoplay).
 *
 * @see NavigationAutomaticComponent
 */
export const NavigationAutomatic: NavigationAutomaticComponent = ({
  slideCooldown = 2000,
  slideRestartCooldown = 4000,
  preventStopOnInteraction = false
}: NavigationAutomaticProps) => {
  const { elementRef, itemsCount, selectedIndex } = useContext(CarouselContext)
  const { carouselNavigator } = useCarousel()
  const timeoutRef = useRef<number | null>(null)

  const refs = useFreshRefs({ selectedIndex, carouselNavigator })

  const stopTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const startTimeout = (time: number) => {
    stopTimeout()

    timeoutRef.current = window.setTimeout(() => {
      const { selectedIndex, carouselNavigator } = refs.current
      const nextIndex = selectedIndex < itemsCount - 1 ? selectedIndex + 1 : 0

      carouselNavigator.scrollToIndex(nextIndex)
      startTimeout(time)
    }, time)
  }

  useEffect(() => {
    startTimeout(slideCooldown)
    if (!elementRef.current || preventStopOnInteraction) return

    const restart = () => startTimeout(slideRestartCooldown)

    elementRef.current.addEventListener('pointerenter', stopTimeout)
    elementRef.current.addEventListener('pointerleave', restart)
    elementRef.current.addEventListener('touchstart', stopTimeout)
    elementRef.current.addEventListener('touchend', restart)
    elementRef.current.addEventListener('touchcancel', restart)
    elementRef.current.addEventListener('scroll', restart)
    elementRef.current.addEventListener(NAVIGATION_EVENT_NAME, restart)

    return () => {
      stopTimeout()
      elementRef.current?.removeEventListener('pointerenter', stopTimeout)
      elementRef.current?.removeEventListener('pointerleave', restart)
      elementRef.current?.removeEventListener('touchstart', stopTimeout)
      elementRef.current?.removeEventListener('touchend', restart)
      elementRef.current?.removeEventListener('touchcancel', restart)
      elementRef.current?.removeEventListener('scroll', restart)
      elementRef.current?.removeEventListener(NAVIGATION_EVENT_NAME, restart)
    }
  }, [])

  return null
}
