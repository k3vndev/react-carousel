'use client'

import { useContext, useEffect, useRef } from 'react'
import { CarouselContext } from '../context/carousel-context'
import { useFreshRefs } from '../hooks/useFreshRefs'
import { NAVIGATION_EVENT_NAME } from '../lib/dispatchNavigationActionEvent'
import { useCarousel } from '../useCarousel'
import '../styles.css'

interface Props {
  /**
   * Time (in milliseconds) between each automatic slide.
   * @default 2000
   */
  slideCooldown?: number

  /**
   * Delay (in milliseconds) before resuming automatic sliding after user interaction interrupts it.
   * @default 4000
   */
  slideRestartCooldown?: number

  /**
   * If `true`, prevents pausing automatic navigation on user interactions (tap, hold, hover, etc).
   * @default false
   */
  preventStopOnInteraction?: boolean
}

/**
 * `NavigationAutomatic` enables automatic carousel navigation (auto-sliding).
 *
 * It moves to the next item after a specified cooldown and loops back to the first one.
 * It automatically pauses when the user interacts (scroll, hover, touch), unless disabled via `preventStopOnInteraction`.
 *
 * We recommend combining it with `NavigationPoints`.
 *
 * @example
 * ```tsx
 * <Carousel
 *   navigationHandler={<>
 *     <NavigationAutomatic />
 *     <NavigationPoints />
 *   </>}
 *   visibleItems={1}
 *   itemsCount={3}
 * >
 *   <CarouselItem>Slide 1</CarouselItem>
 *   <CarouselItem>Slide 2</CarouselItem>
 *   <CarouselItem>Slide 3</CarouselItem>
 * </Carousel>
 * ```
 *
 * @param {Props} props - The automatic navigation configuration.
 * @returns {null} This component doesn’t render any DOM elements.
 */
export const NavigationAutomatic = ({
  slideCooldown = 2000,
  slideRestartCooldown = 4000,
  preventStopOnInteraction = false
}: Props) => {
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
