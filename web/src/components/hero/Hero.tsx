'use client'

import { HeroBackground } from './HeroBackground'
import { HeroCarousel } from './HeroCarousel'

export const Hero = () => {
  const animSlideInL = 'animate-slide-in-l anim-blur-lg anim-opacity-0 anim-duration-1000 anim-ease-out-back'

  return (
    <section className='flex flex-col min-h-screen h-screen w-full items-center justify-center lg:gap-28 sm:gap-20 gap-12 relative'>
      <HeroBackground />

      <div className='flex flex-col sm:gap-8 gap-5 items-center sm:px-8 px-4'>
        <h1
          className={`py-2 xl:text-7xl lg:text-6xl md:text-5xl sm:text-3xl text-2xl font-bold text-gradient-yellow text-nowrap font-poppins ${animSlideInL}`}
        >
          {/* Desktop */}
          <span className='not-sm:hidden'>@k3vndev/react-carousel</span>

          {/* Mobile */}
          <div className='flex flex-col gap-0 items-center'>
            <span className='sm:hidden'>@k3vndev</span>
            <span className='sm:hidden text-4xl'>react-carousel</span>
          </div>
        </h1>

        <h2
          className={`lg:text-5xl md:text-4xl text-3xl font-light text-[#ddd] text-center text-pretty anim-delay-200 max-w-full font-poppins ${animSlideInL}`}
        >
          A lightweight React Carousel built with Tailwind CSS
        </h2>
      </div>

      <HeroCarousel />
    </section>
  )
}
