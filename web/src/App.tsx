import { Carousel, CarouselItem, NavigationAutomatic, NavigationPoints } from '../../dist'
import '../../dist/index.css'

function App() {
  const horizontalImages = [
    'https://www.boredpanda.com/blog/wp-content/uploads/2023/05/64759aba71bba_SpCbHBI_d__700.webp',
    'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',
    'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',
    'https://images.unsplash.com/photo-1498100152307-ce63fd6c5424?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',
    'https://images.unsplash.com/photo-1549545931-59bf067af9ab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500'
  ]

  const vertical = [
    'https://preview.redd.it/i-just-finished-edgerunners-my-heart-is-officially-broken-v0-6uvij0dnkxud1.gif?format=png8&s=b25a693ab248418dd9653ec252822b2e97349ff9'
  ]

  const animSlideInL = 'animate-slide-in-l anim-blur-lg anim-opacity-0 anim-duration-1000 anim-ease-out-back'

  return (
    <main
      className={`
        w-screen min-h-screen h-full flex flex-col
        gap-20 items-center justify-center
      `}
    >
      <div className='flex flex-col gap-8 items-center px-8'>
        <h1
          className={`
            lg:text-7xl md:text-5xl text-3xl font-bold bg-clip-text text-transparent
            bg-gradient-to-r from-yellow-500 to-yellow-600
            text-nowrap
            ${animSlideInL}
          `}
        >
          @k3vndev/react-carousel
        </h1>
        <h3
          className={`
            lg:text-5xl md:text-3xl text-xl font-bold text-gray-400 text-center text-pretty
            ${animSlideInL} anim-delay-200
          `}
        >
          A lightweight React carousel built with Tailwind CSS
        </h3>
      </div>

      <Carousel
        itemsCount={horizontalImages.length}
        className={{
          wrapper: `
            md:w-2xl w-[calc(100vw-2rem)] animate-slide-in-b anim-slide-move-2xl anim-blur-lg anim-opacity-0
            anim-duration-1000 anim-ease-out-back anim-delay-500
          `
        }}
        visibleItems={1}
        gap={16}
        navigationHandler={
          <>
            <NavigationPoints className={{ selectedPoint: 'bg-yellow-400' }} />
            <NavigationAutomatic />
          </>
        }
      >
        {horizontalImages.map((src, index) => (
          <CarouselItem className='h-96' key={index}>
            <img className='object-cover size-full' src={src} alt='A cat, probably angry' draggable={false} />
          </CarouselItem>
        ))}
      </Carousel>
    </main>
  )
}

export default App
