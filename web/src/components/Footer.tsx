import { PACKAGE_NAME } from '../../../src/consts'
import { cn } from '../utils/cn'
import { GitHubIcon } from './icons'

export const Footer = () => (
  <footer className='w-screen py-12 bg-gray-90 flex flex-col items-center justify-center cursor-default gap-3 not-sm:flex-col bg-linear-to-b from-[#060910] to-[#0b101a] font-poppins'>
    <div className='text-[#A2BAE3] flex items-center gap-1 sm:text-xl'>
      <a
        className='group flex gap-2 items-center'
        href='https://github.com/k3vndev/react-carousel'
        target='_blank'
        rel='noopener'
      >
        <GitHubIcon className='size-5 opacity-70' />
        <span className='group-hover:underline text-gray-200'>GitHub</span>
      </a>

      <span className='not-sm:hidden text-gray-500'>—</span>
      {PACKAGE_NAME}
    </div>

    <small className='text-[#6D8ABD] text-center sm:text-lg text-sm text-pretty font-poppins'>
      Most cat images came from <BaseLink>pixabay.com</BaseLink> and <BaseLink>unsplash.com</BaseLink>
    </small>
  </footer>
)

interface BaseLinkProps {
  children: string
  className?: string
}

const BaseLink = ({ children, className }: BaseLinkProps) => (
  <a className={cn('underline', className)} href={`https://${children}`} target='_blank' rel='noopener'>
    {children}
  </a>
)
