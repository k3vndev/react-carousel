import { CodeSnippet } from '../CodeSnippet'
import { SectionHeading } from '../SectionHeading'
import { SectionText } from '../SectionText'
import { UsageCarousel } from '../usage-section/UsageCarousel'
import { InstallDependencyCode } from './InstallDependencyCode'

export const InstallSection = () => (
  <section className='w-screen min-h-screen flex items-center bg-[#12151D] relative z-20'>
    <main className='flex items-center justify-center size-full 2xl:gap-32 gap-16 2xl:px-64 xl:px-24 sm:px-16 px-8 py-32 not-xl:flex-col animate-fade-in anim-blur-xl font-poppins'>
      <div className='flex flex-col gap-4'>
        <SectionHeading className='text-gradient-yellow'>Simple to install</SectionHeading>

        <SectionText className='text-white/90'>1. Install the dependency:</SectionText>
        <InstallDependencyCode />

        <SectionText className='text-white/90'>
          2. Enable Tailwind to read the package&apos;s utilities and classes:
        </SectionText>
        <CodeSnippet codeStr={tailwindSourceCode} />
      </div>

      <UsageCarousel />
    </main>

    {/* Background */}
    <div className='absolute size-full left-0 top-0 -z-10 pointer-events-none animate-fade-in anim-delay-100 bg-linear-to-b from-[#060910] to-[#0C1017]' />
  </section>
)

// biome-ignore format: Keep CSS source snippet formatting.
const tailwindSourceCode = `@import "tailwindcss";
@source "../node_modules/@k3vndev/react-carousel";`
