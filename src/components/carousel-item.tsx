'use client'

import { useRef } from 'react'
import { useCarouselContext } from '../context'
import { useCombinedRef } from '../hooks'
import type { CarouselItemComponent } from '../types'
import '../styles.css'
import { cn } from '../utils/cn'

/**
 * Single tile item to be rendered inside `Carousel`.
 *
 * Its width is determined by the `Carousel` component based on the number of visible items and the gap between them. It's not recommended to manually set its width.
 *
 * @example The rendered HTML structure of the `CarouselItem` component will look like this:
 * ```tsx
 * <div class="h-full max-h-100">
 *   <!-- Carousel item content will be rendered here -->
 * </div>
 * ```
 */
export const CarouselItem: CarouselItemComponent = ({ children, className = '', ...props }) => {
  const { tileProps } = useCarouselContext()

  const localRef = useRef<HTMLDivElement>(null)
  const combinedRef = useCombinedRef(props.ref, localRef)

  return (
    <div
      className={cn('h-full max-h-100 rounded-2xl bg-gray-700', tileProps.className, className)}
      style={{ ...tileProps.style }}
      ref={combinedRef}
    >
      {children}
    </div>
  )
}
