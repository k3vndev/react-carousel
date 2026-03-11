import { CodeSnippet } from '../CodeSnippet'
import { SectionHeading } from '../SectionHeading'
import { SectionText } from '../SectionText'
import { UsageCarousel } from './UsageCarousel'
import { UsageSectionBackground } from './UsageSectionBackground'

export const UsageSection = () => (
  <section className='w-screen min-h-screen flex items-center bg-[#12151D] relative z-20'>
    <main className='flex items-center justify-center size-full 2xl:gap-32 gap-16 2xl:px-64 xl:px-24 sm:px-16 px-8 py-32 not-xl:flex-col animate-fade-in anim-blur-xl font-poppins'>
      <div className='flex flex-col gap-4'>
        <SectionHeading className='text-gradient-yellow'>Easy to use</SectionHeading>
        <SectionText className='text-white/90'>
          Build your own navigation, animations, and autoplay logic with ease.
        </SectionText>

        <CodeSnippet className='mt-4' codeStr={codeSnippetContent} />
      </div>

      <UsageCarousel />
    </main>

    <UsageSectionBackground />
  </section>
)

// biome-ignore format: <>
const codeSnippetContent = 
`import { Carousel, CarouselItem, NavigationArrows } from '@k3vndev/react-carousel'

<Carousel
  itemsCount={catImages.length}
  className='w-110'
  navigationHandler={<NavigationArrows />}
  visibleItems={2}
  gap={16}
  infiniteScroll
>
  {catImages.map(src => (
    <CarouselItem className='h-150 rounded-xl'>
      <img
        src={src}
        className='object-cover size-full'
        alt='A cat, probably angry'
      />
    </CarouselItem>
  ))}
</Carousel>`
