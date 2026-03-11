import { Carousel, NavigationArrows } from '@k3vndev/react-carousel'
import { useMemo } from 'react'
import { getCatImages } from '../../utils/getCatImages'
import { CustomNavigationDots } from '../CustomNavigationDots'
import { InstallSectionCarouselItem } from './InstallSectionCarouselItem'

export const InstallSectionCarousel = () => {
  const catImages = useMemo(() => getCatImages('install-section', carouselFacts.length), [])

  return (
    <Carousel
      className='md:w-2xl w-full animate-fade-in anim-blur-xl anim-opacity-0 anim-ease-out-back'
      visibleItems={2}
      gap={16}
      infiniteScroll
      navigationHandler={
        <>
          <NavigationArrows className='bg-black' />
          <CustomNavigationDots />
        </>
      }
    >
      {carouselFacts.map((fact, i) => (
        <InstallSectionCarouselItem key={i} catImage={catImages[i]} {...fact} />
      ))}
    </Carousel>
  )
}

const carouselFacts = [
  {
    title: 'Agnostic',
    desc: 'Works with any React content — images, cards, products, or custom components.'
  },
  {
    title: 'Smooth Scrolling',
    desc: 'Uses native scroll and scroll-snap for smooth, responsive navigation.'
  },
  {
    title: 'Lightweight',
    desc: 'Only requires React and Tailwind. No extra packages or large bundles.'
  },
  {
    title: 'Composable',
    desc: 'Build your own navigation with arrows, dots, autoplay, or custom controls.'
  },
  {
    title: 'TypeScript Ready',
    desc: 'Fully typed and documented so your editor can guide your implementation.'
  }
]
