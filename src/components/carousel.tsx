'use client'

import { CarouselContext } from '../context'
import type { CarouselComponent } from '../types'
import '../styles.css'
import { useAutoScroll } from '../hooks/use-auto-scroll'
import { useCarouselInternal } from '../hooks/use-carousel-internal'
import { cn } from '../utils/cn'

/**
 * Horizontal scrollable carousel component.
 *
 * @see CarouselComponent
 */
export const Carousel: CarouselComponent = props => {
  const { context, refs } = useCarouselInternal(props)
  useAutoScroll(props.autoScroll ?? false, context)
  const { className, children } = props

  return (
    <CarouselContext.Provider value={context}>
      <section className={cn('relative w-full ', className)} ref={refs.wrapper} draggable={false}>
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
