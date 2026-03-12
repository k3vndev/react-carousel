'use client'

import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BUTTON_CLASS_NAMES } from '../../consts'
import { useCarouselContext } from '../../context'
import { useCarousel, useCombinedRef } from '../../hooks'
import type { NavigationDotsComponent, NavigationDotsProps } from '../../types/navigation-dots'
import { emitNavigationEvent } from '../../utils'
import { cn } from '../../utils/cn'

/**
 * Dot-based navigation handler for `Carousel`.
 *
 * @example
 * ```tsx
 * <NavigationDots className='[&>.dot.active]:bg-yellow-400' />
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
  const { itemsCount } = useCarouselContext()
  const baseWrapperRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useCombinedRef(ref, baseWrapperRef)

  const itemsArray = Array(itemsCount).fill(null)

  return (
    <div
      ref={wrapperRef}
      className={cn('absolute left-1/2 -translate-x-1/2 -bottom-10 flex gap-6', className)}
    >
      {itemsArray.map((_, i) => {
        return (
          <DotButton
            animationConfig={autoScrollAnimationValues}
            animationDisabled={noAutoScrollAnimation}
            key={i}
            index={i}
          />
        )
      })}
    </div>
  )
}

interface DotProps {
  index: number
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
  animationDisabled: noAutoScrollAnimation,
  animationConfig: animationValues
}: DotProps) => {
  const animationAdd = 400 // Compensates for transition duration of the dot
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { carouselNavigator } = useCarousel()
  const { elementRef, autoplayWaitingTime, selectedIndex, visibleItems, itemsCount } = useCarouselContext()

  const isActiveInternal: boolean = useMemo(() => {
    const i = index

    if (visibleItems === 1) {
      return selectedIndex === i
    }

    if (selectedIndex + visibleItems > itemsCount) {
      const overflow = (selectedIndex + visibleItems) % itemsCount
      return i >= selectedIndex || i < overflow
    } else {
      return i >= selectedIndex && i < selectedIndex + visibleItems
    }
  }, [index, selectedIndex, visibleItems, itemsCount])

  const [isActive, setIsActive] = useState(isActiveInternal)
  const previousSelectedIndexRef = useRef(selectedIndex)

  // Set active state immediately when selectedIndex changes, but delay the deactivation to allow the animation to play
  useEffect(() => {
    if (previousSelectedIndexRef.current !== selectedIndex) {
      setIsActive(false)
      previousSelectedIndexRef.current = selectedIndex

      requestAnimationFrame(() => {
        setIsActive(isActiveInternal)
      })
    }
  }, [isActiveInternal, selectedIndex])

  const handleClick = () => {
    carouselNavigator.scrollToIndex(index)
    emitNavigationEvent(elementRef.current)
  }

  const conditionalClassName = isActive
    ? 'active bg-white/90 scale-120 duration-150'
    : 'not-active bg-white/25 hover:bg-white/40 duration-300'

  useEffect(() => {
    const element = buttonRef.current
    if (!element || !isActive || noAutoScrollAnimation || !autoplayWaitingTime) {
      return
    }

    const { scale = 0.25, opacity = 0.1, color = 'white' } = animationValues ?? {}

    const progressAnimation = element.animate(
      [
        {
          opacity: 1
        },
        {
          opacity,
          transform: `scale(${scale})`,
          backgroundColor: color
        }
      ],
      {
        duration: autoplayWaitingTime + animationAdd,
        easing: 'linear',
        fill: 'both'
      }
    )

    return () => progressAnimation.cancel()
  }, [isActive, autoplayWaitingTime, noAutoScrollAnimation, animationValues])

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(
        "dot relative size-4 rounded-full transition after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:size-[200%] after:bg-transparent",
        BUTTON_CLASS_NAMES,
        conditionalClassName
      )}
      draggable={false}
    />
  )
}
