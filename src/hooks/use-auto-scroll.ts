'use client'

import { useEffect, useRef, useState } from 'react'
import type { CarouselContextType } from '../context'
import { NAVIGATION_EVENT_NAME } from '../utils'
import '../styles.css'
import type { AutoScrollConfig } from '../types'
import { useFreshRefs } from './use-fresh-refs'

/**
 * A hook that manages the auto-scrolling behavior of the Carousel component.
 * @param config The auto-scroll configuration, which can be a boolean or an object with specific settings.
 * @param context The Carousel context that provides necessary information and navigation methods for the Carousel component.
 * @returns The remaining time (in milliseconds) before the next auto-scroll action occurs, or null if auto-scrolling is disabled.
 */
export const useAutoScroll = (config: boolean | AutoScrollConfig, context: CarouselContextType) => {
  const timeoutRef = useRef<number | null>(null)
  const refs = useFreshRefs(context)

  const configInitialValue = config === false ? null : config === true ? {} : config
  const configRef = useRef(configInitialValue ? { ...defaultConfig, ...configInitialValue } : null)

  const [waitingTime, setWaitingTime] = useState<number | null>(null)

  // Automatically stops auto-scrolling when the configuration is disabled
  const stopTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setWaitingTime(null)
  }

  // Starts the auto-scroll timeout with the given initial time
  const startTimeout = (initialTime: number) => {
    stopTimeout()

    setWaitingTime(initialTime)
    timeoutRef.current = setTimeout(() => {
      const { selectedIndex, navigator, itemsCount, visibleItems } = refs.current

      const nextIndex: number = (() => {
        const maxIndex = itemsCount - visibleItems
        const next = selectedIndex + 1
        return next <= maxIndex ? next : 0
      })()

      navigator.scrollToIndex(nextIndex)
      startTimeout(defaultConfig.slideInterval)
    }, initialTime)
  }

  useEffect(() => {
    if (!config || !configRef.current) {
      stopTimeout()
      return
    }

    const { slideInterval, slideResetDelay, stopOnInteraction } = configRef.current
    const { elementRef } = refs.current

    startTimeout(slideInterval)
    const restart = () => startTimeout(slideResetDelay)

    // Do not attach interaction listeners if `stopOnInteraction` is false or element ref is not available
    if (!elementRef.current || !stopOnInteraction) return

    const el = elementRef.current
    el.addEventListener('pointerenter', stopTimeout)
    el.addEventListener('pointerleave', restart)
    el.addEventListener('touchstart', stopTimeout)
    el.addEventListener('touchend', restart)
    el.addEventListener('touchcancel', restart)
    el.addEventListener('scroll', restart)
    el.addEventListener(NAVIGATION_EVENT_NAME, restart)

    return () => {
      // Clean up listeners and timeouts on unmount or config change
      stopTimeout()
      el.removeEventListener('pointerenter', stopTimeout)
      el.removeEventListener('pointerleave', restart)
      el.removeEventListener('touchstart', stopTimeout)
      el.removeEventListener('touchend', restart)
      el.removeEventListener('touchcancel', restart)
      el.removeEventListener('scroll', restart)
      el.removeEventListener(NAVIGATION_EVENT_NAME, restart)
    }
  }, [config])

  return waitingTime
}

const defaultConfig = {
  slideInterval: 2000,
  slideResetDelay: 4000,
  stopOnInteraction: true
} satisfies AutoScrollConfig
