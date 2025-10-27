import { GitHubIcon } from './icons'

export const Footer = () => (
  <footer
    className={`
      w-screen sm:pt-5 py-8 pb-8 bg-gray-90 font-mono
      flex items-center justify-center cursor-default gap-x-5 gap-y-2
      not-sm:flex-col bg-gray-900/60
    `}
  >
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

    <span className='text-gray-400 text-center text-pretty'>
      Most cat images came from{' '}
      <a className='hover:underline' href='https://pixabay.com' target='_blank' rel='noopener'>
        Pixabay
      </a>
    </span>
  </footer>
)
