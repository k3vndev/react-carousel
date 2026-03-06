'use client'

import { CarouselContext } from '../context'
import type { CarouselComponent } from '../types'
import '../styles.css'
import { useState } from 'react'
import { useAutoScroll } from '../hooks/use-auto-scroll'
import { useCarouselInternal } from '../hooks/use-carousel-internal'
import { cn } from '../utils/cn'

/**
 * A horizontal scrollable Carousel component.
 *
 * Displays a set of items in a scrollable horizontal layout.
 * Handles snapping, tile sizing, and exposes tile info via `CarouselContext`.
 *
 * @example
 * ```tsx
 * <Carousel
 *   itemsCount={3}
 *   visibleItems={1}
 *   gap={16}
 *   className='max-w-xl'
 *   navigationHandler={<NavigationPoints />}
 * >
 *   <CarouselItem>Item 1</CarouselItem>
 *   <CarouselItem>Item 2</CarouselItem>
 *   <CarouselItem>Item 3</CarouselItem>
 * </Carousel>
 * ```
 *
 * @example The rendered HTML structure of the `Carousel` component will look like this:
 * ```tsx
 * <section class="relative w-full">
 *   <div class="scroll-zone">
 *     <!-- Carousel items will be rendered here -->
 *   </div>
 *
 *   <!-- Navigation handlers will be rendered here -->
 * </section>
 * ```
 */
export const Carousel: CarouselComponent = props => {
  const [children, setChildren] = useState(props.children)
  const { context, refs } = useCarouselInternal({ ...props, setChildren })
  const autoplayWaitingTime = useAutoScroll(props.autoScroll ?? false, context)

  return (
    <CarouselContext.Provider value={{ ...context, autoplayWaitingTime }}>
      <section className={cn('relative w-full ', props.className)} ref={refs.wrapper} draggable={false}>
        <div
          ref={refs.scroll}
          className='scroll-zone flex overflow-x-scroll max-w-full w-full h-full snap-x snap-mandatory rounded-2xl [&::-webkit-scrollbar]:hidden'
          style={{
            contain: 'layout inline-size',
            gap: `${context.gap}px`,

            // Hide scrollbar for IE, Edge and Firefox. Chromium browsers handled via Tailwind class above.
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {context.tileWidth > 0 && children}
        </div>

        {props.navigationHandler}
      </section>
    </CarouselContext.Provider>
  )
}
