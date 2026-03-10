import { CodeSnippet } from './CodeSnippet'
import { UsageCarousel } from './UsageCarousel'

export const UsageSection = () => (
  <section className='w-screen min-h-screen flex items-center bg-[#12151D] relative z-20'>
    <main className='flex items-center justify-center size-full 2xl:gap-32 gap-16 2xl:px-64 xl:px-24 sm:px-16 px-8 py-32 not-xl:flex-col animate-fade-in anim-blur-xl font-poppins'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-gradient-yellow text-6xl font-bold'>Easy to use</h2>
        <p className='text-white/90 text-3xl text-pretty font-light'>
          Build your own navigation, animations, and autoplay logic with ease.
        </p>
        <CodeSnippet />
      </div>

      <UsageCarousel />
    </main>

    {/* Squares background */}
    <div
      className='absolute size-full left-0 top-0 opacity-20 -z-10 pointer-events-none animate-fade-in anim-delay-100'
      style={{
        backgroundImage: 'url(/squares.gif)',
        backgroundSize: '300px'
      }}
    />
  </section>
)
