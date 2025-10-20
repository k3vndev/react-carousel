import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from './context/carousel-context'
import type { ReusableComponentWithRef } from './types'

interface Props extends ReusableComponentWithRef {
  children?: React.ReactNode
}

export const CarouselItem = ({ children, className = '', ...props }: Props) => {
  const { tileProps } = useContext(CarouselContext)

  return (
    <div
      className={twMerge(`h-64 rounded-2xl bg-gray-700 ${tileProps.className} ${className}`)}
      style={{ ...tileProps.style, ...props.style }}
      ref={props.ref}
    >
      {children}
    </div>
  )
}
