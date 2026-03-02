'use client'

import { useEffect, useRef, useState } from 'react'
import type { CarouselContextType } from '../context'
import { NAVIGATION_EVENT_NAME } from '../utils'
import '../styles.css'
import type { AutoScrollConfig } from '../types'
import { useFreshRefs } from './use-fresh-refs'

export const useAutoScroll = (config: boolean | AutoScrollConfig, context: CarouselContextType) => {
  const timeoutRef = useRef<number | null>(null)
  const refs = useFreshRefs(context)

  const configInitialValue = config === false ? null : config === true ? {} : config
  const configRef = useRef(configInitialValue ? { ...defaultConfig, ...configInitialValue } : null)

  const [waitingTime, setWaitingTime] = useState<number | null>(null)

  const stopTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setWaitingTime(null)
  }

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
    if (!configRef.current) return

    const { slideInterval, slideResetDelay, stopOnInteraction } = configRef.current
    const { elementRef } = refs.current

    startTimeout(slideInterval)
    const restart = () => startTimeout(slideResetDelay)

    if (!elementRef.current || !stopOnInteraction) return

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

  return waitingTime
}

const defaultConfig = {
  slideInterval: 2000,
  slideResetDelay: 4000,
  stopOnInteraction: true
} satisfies AutoScrollConfig
