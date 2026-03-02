'use client'

import { useEffect, useRef } from 'react'
import type { CarouselContextType } from '../context'
import { NAVIGATION_EVENT_NAME } from '../utils'
import '../styles.css'
import type { AutoScrollConfig } from '../types'
import { useFreshRefs } from './use-fresh-refs'

export const useAutoScroll = (config: boolean | AutoScrollConfig, context: CarouselContextType) => {
  const timeoutRef = useRef<number | null>(null)
  const refs = useFreshRefs(context)

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

  const startTimeout = (initialTime: number) => {
    stopTimeout()

    timeoutRef.current = setTimeout(() => {
      const { selectedIndex, navigator, itemsCount } = refs.current
      const nextIndex = selectedIndex < itemsCount - 1 ? selectedIndex + 1 : 0

      console.log((navigator as any).tileWidth)

      navigator.scrollToIndex(nextIndex)
      startTimeout(defaultConfig.slideCooldown)
    }, initialTime)
  }

  useEffect(() => {
    if (!configRef.current) return

    const { slideCooldown, slideRestartCooldown, preventStopOnInteraction } = configRef.current
    const { elementRef } = refs.current

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
