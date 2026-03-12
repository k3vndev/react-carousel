/**
 * Public props for the `CarouselItem` component.
 */
export interface CarouselItemProps {
  children?: React.ReactNode
  className?: string
  ref?: React.Ref<HTMLDivElement>
}

/**
 * A single item in a `Carousel`.
 *
 * Use this component inside a `Carousel` as a wrapper for elements like images,
 * articles, cards, or any custom content. Its width automatically matches the
 * `Carousel` tile width; set height through class names or styles.
 *
 * @example
 * ```tsx
 * <CarouselItem className="bg-green-200 h-64">
 *   <img className="size-full object-cover" src="/image.png" alt="Example" />
 * </CarouselItem>
 * ```
 */
export type CarouselItemComponent = (props: CarouselItemProps) => React.JSX.Element
