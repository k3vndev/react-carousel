import { Carousel, CarouselItem, NavigationArrows } from '@k3vndev/react-carousel'
import { CodeSnippet } from './CodeSnippet'

export const Sections = () => {
  const catImages = [
    'https://cdn.pixabay.com/photo/2019/02/23/15/31/cats-4015832_640.jpg',
    'https://cdn.pixabay.com/photo/2020/03/23/08/46/cats-4959945_640.jpg',
    'https://cdn.pixabay.com/photo/2022/05/08/18/13/cat-7182671_640.jpg',
    'https://cdn.pixabay.com/photo/2023/07/04/08/31/cats-8105667_640.jpg',
    'https://cdn.pixabay.com/photo/2021/04/28/17/11/animals-6214563_640.jpg',
    'https://cdn.pixabay.com/photo/2018/07/08/14/16/cat-3523992_640.jpg'
  ]

  return (
    <div
      className={`
        w-screen min-h-screen bg-gradient-to-b 
        from-gray-900 to-gray-950 relative z-20
      `}
    >
      <main
        className={`
          flex items-center min-h-screen w-full justify-center 
          2xl:gap-32 gap-16 not-2xl:py-16 not-2xl:flex-col
          animate-fade-in anim-blur-xl
        `}
      >
        <TextZone />

        <Carousel
          itemsCount={catImages.length}
          className={{ wrapper: 'md:w-150 w-max-pad' }}
          visibleItems={2}
          gap={16}
          navigationHandler={<NavigationArrows />}
        >
          {catImages.map(src => (
            <CarouselItem className='sm:h-150 h-96' key={src}>
              <img
                src={src}
                className='object-cover size-full rounded-xl select-none'
                alt='A cat, probably angry'
                draggable={false}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </main>

      {/* Squares background */}
      <div
        className={`
          absolute size-full left-0 top-0 opacity-15 -z-10 pointer-events-none
          animate-fade-in anim-delay-100
        `}
        style={{
          backgroundImage: 'url(/squares.gif)',
          backgroundSize: '150px'
        }}
      />
    </div>
  )
}

const TextZone = () => (
  <div className='flex flex-col lg:gap-3 items-center'>
    <h1
      className={`
        lg:text-6xl md:text-5xl text-4xl font-bold py-4 text-center
        text-gradient-yellow px-4
      `}
    >
      A carousel component
    </h1>
    <h3
      className={`
        lg:text-5xl md:text-3xl text-2xl font-bold 
        text-gray-400 text-center text-pretty px-4
      `}
    >
      Ready for every occasion
    </h3>

    <CodeSnippet>npm i @k3vndev/react-carousel</CodeSnippet>
  </div>
)
