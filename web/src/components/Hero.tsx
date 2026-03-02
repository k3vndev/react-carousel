import { Carousel, CarouselItem, NavigationDots } from '@k3vndev/react-carousel'
import { getCatImages } from '../utils/getCatImages'

export const Hero = () => {
  const catImages = getCatImages('hero', 7)
  const animSlideInL = 'animate-slide-in-l anim-blur-lg anim-opacity-0 anim-duration-1000 anim-ease-out-back'

  return (
    <div
      className={`
        flex flex-col min-h-screen w-full h-screen
        relative items-center justify-center lg:gap-28 sm:gap-20 gap-10
        not-sm:-translate-y-13
      `}
    >
      <div className='flex flex-col sm:gap-8 gap-4 items-center px-8'>
        <h1
          className={`
            lg:text-7xl md:text-5xl sm:text-3xl text-xl font-bold 
            text-gradient-yellow text-nowrap ${animSlideInL}
          `}
        >
          @k3vndev/react-carousel
        </h1>
        <h2
          className={`
            lg:text-5xl md:text-4xl text-3xl px-4 font-bold text-gray-400 text-center text-pretty
            ${animSlideInL} anim-delay-200 text-wrap max-w-full
          `}
        >
          A lightweight React carousel built with Tailwind CSS
        </h2>
      </div>

      <Carousel
        itemsCount={catImages.length}
        className='md:w-2xl w-max-pad animate-slide-in-b anim-slide-move-2xl anim-blur-lg anim-opacity-0
            anim-duration-1000 anim-ease-out-back anim-delay-500'
        navigationHandler={<NavigationDots className='[&>button.active]:bg-yellow-400' />}
        autoScroll
      >
        {catImages.map((src, index) => (
          <CarouselItem className='sm:h-96 h-64' key={index}>
            <img
              className='object-cover size-full select-none'
              src={src}
              alt='A cat, probably angry'
              draggable={false}
            />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}
