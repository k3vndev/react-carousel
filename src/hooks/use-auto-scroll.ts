'use client'

import { useContext, useEffect, useRef } from 'react'
import { CarouselContext } from '../context'
import { NAVIGATION_EVENT_NAME } from '../utils'
import { useCarousel, useFreshRefs } from '.'
import '../styles.css'
import type { AutoScrollConfig } from '../types'

export const useAutoScroll = (config: boolean | AutoScrollConfig) => {
  const { elementRef, itemsCount, selectedIndex } = useContext(CarouselContext)
  const { carouselNavigator } = useCarousel()
  const timeoutRef = useRef<number | null>(null)

  const refs = useFreshRefs({ selectedIndex, carouselNavigator })

  const defaultConfig = {
    slideCooldown: 2000,
    slideRestartCooldown: 4000,
    preventStopOnInteraction: false
  } satisfies AutoScrollConfig

  const configInitialValue = config === false ? null : config === true ? {} : config
  const configRef = useRef(configInitialValue ? { ...defaultConfig, ...configInitialValue } : null)

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
    if (!configRef.current) return
    const { slideCooldown, slideRestartCooldown, preventStopOnInteraction } = configRef.current

    startTimeout(slideCooldown)
    const restart = () => startTimeout(slideRestartCooldown)

    if (!elementRef.current || preventStopOnInteraction) return

    const element = elementRef.current
    element.addEventListener('pointerenter', stopTimeout)
    element.addEventListener('pointerleave', restart)
    element.addEventListener('touchstart', stopTimeout)
    element.addEventListener('touchend', restart)
    element.addEventListener('touchcancel', restart)
    element.addEventListener('scroll', restart)
    element.addEventListener(NAVIGATION_EVENT_NAME, restart)

    return () => {
      stopTimeout()
      element.removeEventListener('pointerenter', stopTimeout)
      element.removeEventListener('pointerleave', restart)
      element.removeEventListener('touchstart', stopTimeout)
      element.removeEventListener('touchend', restart)
      element.removeEventListener('touchcancel', restart)
      element.removeEventListener('scroll', restart)
      element.removeEventListener(NAVIGATION_EVENT_NAME, restart)
    }
  }, [])
}
