import { useContext, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselContext } from './context/carousel-context'
import { useCombinedRef } from './hooks/useCombinedRef'
import type { ReusableComponent } from './types'

interface Props extends ReusableComponent {
  /** The content to be displayed inside the carousel item */
  children?: React.ReactNode

  /** An optional ref to the component */
  ref?: React.Ref<HTMLDivElement>
}

/**
 * A single item in a `Carousel`.
 *
 * Use this component inside a `Carousel` as a wrapper for elements like images, articles, etc.
 * Its width automatically matches the `Carousel`'s size, but you might need to manually set the height.
 *
 * By default, it has a gray background, rounded corners, and full height.
 *
 * @example
 * ```tsx
 * <CarouselItem className="bg-green-200 h-64">
 *   <img className="size-full object-cover" src="/image.png" alt="Example" />
 * </CarouselItem>
 * ```
 *
 * @param {Props} props - Props for the CarouselItem component
 * @returns {JSX.Element} The rendered carousel item
 */
export const CarouselItem = ({ children, className = '', ...props }: Props) => {
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
