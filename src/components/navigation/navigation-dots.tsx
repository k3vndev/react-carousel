'use client'

import type React from 'react'
import { useMemo, useRef } from 'react'
import { useCarousel, useCombinedRef } from '../../hooks'
import { emitNavigationEvent } from '../../utils'
import '../../styles.css'
import { useCarouselContext } from '../../context'
import type { NavigationDotsComponent, NavigationDotsProps } from '../../types/navigation-dots'
import { cn } from '../../utils/cn'

/**
 * Dot-based navigation handler for `Carousel`.
 *
 * @example
 * ```tsx
 * <NavigationDots className='[&>button.active]:bg-yellow-400' />
 * ```
 *
 * @example The rendered HTML structure of the `NavigationDots` component will look like this:
 * ```tsx
 * <div class="absolute">
 *   <button class="dot active" />
 *   <button class="dot not-active" />
 *   <button class="dot not-active" />
 * </div>
 */
export const NavigationDots: NavigationDotsComponent = ({
  className,
  ref,
  noAutoScrollAnimation = false,
  autoScrollAnimationValues
}: NavigationDotsProps) => {
  const { itemsCount, selectedIndex, visibleItems } = useCarouselContext()
  const baseWrapperRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useCombinedRef(ref, baseWrapperRef)

  const itemsArray = Array(itemsCount).fill(null)

  return (
    <div
      ref={wrapperRef}
      className={cn('absolute left-1/2 -translate-x-1/2 -bottom-10 flex gap-6', className)}
    >
      {itemsArray.map((_, i) => {
        const isActive = selectedIndex === i || (i >= selectedIndex && i < selectedIndex + visibleItems)

        return (
          <DotButton
            animationConfig={autoScrollAnimationValues}
            animationDisabled={noAutoScrollAnimation}
            isActive={isActive}
            key={i}
            index={i}
          />
        )
      })}
    </div>
  )
}

interface PointProps {
  index: number
  isActive: boolean
  ref?: React.RefObject<HTMLButtonElement | null>
  animationDisabled?: boolean
  animationConfig: NavigationDotsProps['autoScrollAnimationValues']
}

/**
 * A single navigation dot used by `NavigationDots`.
 *
 * Automatically handles carousel navigation when clicked.
 */
const DotButton = ({
  index,
  isActive,
  animationDisabled: noAutoScrollAnimation,
  animationConfig: animationValues
}: PointProps) => {
  const { carouselNavigator } = useCarousel()
  const { elementRef, autoplayWaitingTime } = useCarouselContext()

  const animationAdd = 400 // Compensates for transition duration of the dot

  const handleClick = () => {
    carouselNavigator.scrollToIndex(index)
    emitNavigationEvent(elementRef.current)
  }

  const conditionalClassName = isActive
    ? 'active bg-white/90 scale-120 duration-100'
    : 'not-active bg-white/25 hover:bg-white/40 duration-600'

  const style = useMemo(() => {
    const { scale = 0.2, opacity = 0.05, color = 'white' } = animationValues ?? {}

    const mainValues = {
      '--auto-scroll-scale': scale,
      '--auto-scroll-opacity': opacity,
      '--auto-scroll-color': color
    }

    if (!isActive || noAutoScrollAnimation || !autoplayWaitingTime) {
      return mainValues
    }

    return {
      animation: 'navigation-dots-autoplay-progress linear both',
      animationDuration: `${autoplayWaitingTime + animationAdd}ms`,
      ...mainValues
    }
  }, [isActive, autoplayWaitingTime, noAutoScrollAnimation, animationValues])

  return (
    <button
      onClick={handleClick}
      className={cn(
        "dot button relative size-4 rounded-full transition after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:size-[200%] after:bg-transparent",
        conditionalClassName
      )}
      draggable={false}
      style={style as React.CSSProperties}
    />
  )
}
