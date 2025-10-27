import { useState } from 'react'
import { CheckIcon, CopyIcon } from './icons'

interface Props {
  children: React.ReactNode
}

export const CodeSnippet = ({ children }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    setCopied(true)

    const codeText = children?.toString()
    codeText && navigator.clipboard.writeText(codeText)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <article
      className={`
        sm:px-8 px-4 sm:py-4 py-3 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5
        text-gray-300 flex items-center sm:gap-8 gap-4 font-mono mt-8
      `}
    >
      <span className='sm:text-lg text-xs'>{children}</span>
      <button className='button' disabled={copied} onClick={handleClick}>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </article>
  )
}
