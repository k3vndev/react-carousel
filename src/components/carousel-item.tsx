'use client'

import { useContext, useRef } from 'react'
import { CarouselContext } from '../context'
import { useCombinedRef } from '../hooks'
import type { CarouselItemComponent } from '../types'
import '../styles.css'
import { cn } from '../utils/cn'

/**
 * Single tile item to be rendered inside `Carousel`.
 *
 * @see CarouselItemComponent
 */
export const CarouselItem: CarouselItemComponent = ({ children, className = '', ...props }) => {
  const { tileProps } = useContext(CarouselContext)

  const localRef = useRef<HTMLDivElement>(null)
  const combinedRef = useCombinedRef(props.ref, localRef)

  return (
    <div
      className={cn('h-full rounded-2xl bg-gray-700', tileProps.className, className)}
      style={{ ...tileProps.style }}
      ref={combinedRef}
    >
      {children}
    </div>
  )
}
