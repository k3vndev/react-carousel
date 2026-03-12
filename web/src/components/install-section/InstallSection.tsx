import { CodeSnippet } from '../CodeSnippet'
import { SectionHeading } from '../SectionHeading'
import { SectionText } from '../SectionText'
import { InstallDependencyCode } from './InstallDependencyCode'
import { InstallSectionBackground } from './InstallSectionBackground'
import { InstallSectionCarousel } from './InstallSectionCarousel'

export const InstallSection = () => (
  <section className='w-screen min-h-screen flex items-center bg-[#12151D] relative z-20'>
    <main className='flex items-center justify-center size-full 2xl:gap-32 gap-16 2xl:px-64 xl:px-24 sm:px-16 px-4 py-32 not-xl:flex-col animate-fade-in anim-blur-xl font-poppins'>
      <div className='flex flex-col gap-4'>
        <SectionHeading className='text-gradient-yellow'>Simple to install</SectionHeading>

        <SectionText className='text-white/90'>1. Install the dependency:</SectionText>
        <InstallDependencyCode />

        <SectionText className='text-white/90'>
          2. Enable Tailwind to read the package&apos;s utilities and classes:
        </SectionText>
        <CodeSnippet codeStr={tailwindSourceCode} />
      </div>

      <InstallSectionCarousel />
    </main>

    <InstallSectionBackground />
  </section>
)

// biome-ignore format: Keep CSS source snippet formatting.
const tailwindSourceCode = `@import "tailwindcss";
@source "../node_modules/@k3vndev/react-carousel";`
