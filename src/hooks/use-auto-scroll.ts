'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { CarouselContextType } from '../context'
import type { AutoScrollConfig } from '../types'
import { NAVIGATION_EVENT_NAME } from '../utils'
import { useFreshRefs } from './use-fresh-refs'

/**
 * A hook that manages the auto-scrolling behavior of the Carousel component.
 * @param config The auto-scroll configuration, which can be a boolean or an object with specific settings.
 * @param context The Carousel context that provides necessary information and navigation methods for the Carousel component.
 * @returns The remaining time (in milliseconds) before the next auto-scroll action occurs, or null if auto-scrolling is disabled.
 */
export const useAutoScroll = (config: boolean | AutoScrollConfig, context: CarouselContextType) => {
  const timeoutRef = useRef<number | null>(null)

  const configInitialValue = config === false ? null : config === true ? {} : config
  const settings = useMemo(
    () => (configInitialValue ? { ...defaultConfig, ...configInitialValue } : null),
    [config]
  )
  const settingsRef = useFreshRefs(settings)

  const [waitingTime, setWaitingTime] = useState<number | null>(null)
  const pointerEnteredRef = useRef(false)
  const pointerFocusingRef = useRef(false)

  const refs = useFreshRefs<CarouselContextType>({ ...context, autoplayWaitingTime: waitingTime })

  // Automatically stops auto-scrolling when the configuration is disabled
  const clearScrollTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setWaitingTime(null)
  }

  // Starts the auto-scroll timeout with the given initial time
  const restartScrollTimeout = () => {
    clearScrollTimeout()

    const settings = settingsRef.current
    if (pointerFocusingRef.current || !settings) {
      return
    }

    const { slideInterval } = settings

    setWaitingTime(slideInterval)
    timeoutRef.current = setTimeout(() => {
      const { selectedIndex, navigator, itemsCount, visibleItems, infiniteScroll } = refs.current

      if (infiniteScroll) {
        // In infinite mode, always move forward one tile to preserve loop continuity.
        navigator.scrollRight(1)
        restartScrollTimeout()
        return
      }

      const nextIndex: number = (() => {
        const maxIndex = itemsCount - visibleItems
        const next = selectedIndex + 1
        return next <= maxIndex ? next : 0
      })()

      navigator.scrollToIndex(nextIndex)
      restartScrollTimeout()
    }, slideInterval)
  }

  // Manages auto-scrolling behavior based on the provided configuration
  useEffect(() => {
    const settings = settingsRef.current
    if (!config || !settings) {
      clearScrollTimeout()
      return
    }

    const { stopOnInteraction } = settings
    const { elementRef } = refs.current
    if (!elementRef.current || !stopOnInteraction) return

    const el = elementRef.current

    // -- Main timeouts --
    restartScrollTimeout()

    // -- Pointer interaction timeouts --
    let pointerInteractionTimeout: number | null = null

    const startPointerInteractionTimeout = () => {
      clearPointerInteractionTimeout()

      pointerInteractionTimeout = setTimeout(() => {
        clearPointerInteractionTimeout()

        // If the pointer is still within the carousel after the timeout, we keep auto-scrolling paused until they leave
        if (pointerEnteredRef.current) {
          pointerFocusingRef.current = true
          clearScrollTimeout()
        }
      }, POINTER_MOVE_MIN_TIME)
    }
    const clearPointerInteractionTimeout = () => {
      if (pointerInteractionTimeout) {
        clearTimeout(pointerInteractionTimeout)
        pointerInteractionTimeout = null
      }
    }

    // -- Pointer interactions event handlers --
    const handlePointerEnter = () => {
      pointerEnteredRef.current = true
      startPointerInteractionTimeout()
    }

    const handlePointerMove = () => {
      if (pointerEnteredRef.current) {
        startPointerInteractionTimeout()
      }
    }

    const handlePointerLeave = () => {
      pointerEnteredRef.current = false
      pointerFocusingRef.current = false

      clearPointerInteractionTimeout()

      if (!refs.current.autoplayWaitingTime) {
        restartScrollTimeout()
      }
    }

    const handleScroll = () => {
      clearScrollTimeout()
    }

    const handleScrollEnd = () => {
      restartScrollTimeout()
    }

    // Set up event listeners
    el.addEventListener('pointerenter', handlePointerEnter)
    el.addEventListener('pointerdown', restartScrollTimeout)
    el.addEventListener('pointermove', handlePointerMove)
    el.addEventListener('pointerleave', handlePointerLeave)
    el.addEventListener('scroll', handleScroll)
    el.addEventListener('scrollend', handleScrollEnd)
    el.addEventListener(NAVIGATION_EVENT_NAME, restartScrollTimeout)

    return () => {
      // Clean up listeners and timeouts on unmount or config change
      clearScrollTimeout()
      clearPointerInteractionTimeout()

      el.removeEventListener('pointerenter', handlePointerEnter)
      el.removeEventListener('pointerdown', restartScrollTimeout)
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerleave', handlePointerLeave)
      el.removeEventListener('scroll', handleScroll)
      el.removeEventListener('scrollend', handleScrollEnd)
      el.removeEventListener(NAVIGATION_EVENT_NAME, restartScrollTimeout)
    }
  }, [config])

  return waitingTime
}

const defaultConfig = {
  slideInterval: 2000,
  stopOnInteraction: true
} satisfies AutoScrollConfig

const POINTER_MOVE_MIN_TIME = 100
