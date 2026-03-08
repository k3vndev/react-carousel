import { Carousel, CarouselItem, NavigationDots } from '@k3vndev/react-carousel'
import { useMemo } from 'react'
import { getCatImages } from '../../utils/getCatImages'

export const HeroCarousel = () => {
  const catImages = useMemo(() => getCatImages('hero', 7), [])

  return (
    <Carousel
      className='md:w-3xl w-full px-8 animate-slide-in-b anim-blur-xl anim-opacity-0 anim-ease-out-back anim-delay-500 anim-rotate-5'
      navigationHandler={
        <NavigationDots
          className='[&>.dot.active]:bg-yellow-400'
          autoScrollAnimationValues={{
            color: 'oklch(85.2% 0.199 91.936)'
          }}
        />
      }
      autoScroll
      infiniteScroll
    >
      {catImages.map((src, i) => (
        <CarouselItem key={i} className='h-96'>
          <img src={src} alt={`Cat ${i + 1}`} className='w-full h-full object-cover' draggable={false} />
        </CarouselItem>
      ))}
    </Carousel>
  )
}
