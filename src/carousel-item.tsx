'use client'

import { useContext, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from './context'
import { useCombinedRef } from './hooks'
import type { CarouselItemComponent } from './types'
import './styles.css'

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
      className={twMerge(`h-full rounded-2xl bg-gray-700 ${tileProps.className} ${className}`)}
      style={{ ...tileProps.style, ...props.style }}
      ref={combinedRef}
    >
      {children}
    </div>
  )
}
