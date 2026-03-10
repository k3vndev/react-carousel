import { Carousel, CarouselItem, NavigationArrows } from '@k3vndev/react-carousel'
import { getCatImages } from '../../utils/getCatImages'

export const UsageCarousel = () => {
  const catImages = getCatImages('sections', 6)

  return (
    <Carousel
      className='md:w-2xl w-full animate-fade-in anim-blur-xl anim-opacity-0 anim-ease-out-back'
      visibleItems={2}
      gap={16}
      navigationHandler={<NavigationArrows className='bg-black' />}
      infiniteScroll
    >
      {catImages.map((src, i) => (
        <CarouselItem key={i} className='max-h-none xl:h-140 h-100 overflow-hidden'>
          <img src={src} alt={`Cat ${i}`} className='w-full h-full object-cover' draggable={false} />
        </CarouselItem>
      ))}
    </Carousel>
  )
}
