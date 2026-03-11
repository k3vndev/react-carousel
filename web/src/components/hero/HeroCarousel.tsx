import { Carousel, CarouselItem } from '@k3vndev/react-carousel'
import { useMemo } from 'react'
import { getCatImages } from '../../utils/getCatImages'
import { CustomNavigationDots } from '../CustomNavigationDots'

export const HeroCarousel = () => {
  const catImages = useMemo(() => getCatImages('hero', 7), [])

  return (
    <div className='w-full flex justify-center h-content px-8 pb-20'>
      <Carousel
        className='md:w-3xl w-full animate-slide-in-b anim-blur-xl anim-opacity-0 anim-ease-out-back anim-delay-500 anim-rotate-5'
        navigationHandler={<CustomNavigationDots />}
        autoScroll
        infiniteScroll
      >
        {catImages.map(({ src, alt }, i) => (
          <CarouselItem key={i} className='sm:h-96 h-64'>
            <img src={src} alt={alt} className='w-full h-full object-cover' draggable={false} />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}
