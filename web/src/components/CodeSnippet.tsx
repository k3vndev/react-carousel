import type React from 'react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '../../../src/utils/cn'
import { CheckIcon, CopyIcon } from './icons'

interface Props {
  codeStr: string
  className?: string
  children?: React.ReactNode
}

export const CodeSnippet = ({ codeStr, className, children }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    setCopied(true)

    if (codeStr) {
      navigator.clipboard.writeText(codeStr)
    }

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <div className={cn('shadow-app-card rounded-xl border border-white/10 relative bg-black', className)}>
      {children}

      <SyntaxHighlighter
        language='tsx'
        style={oneDark}
        codeTagProps={{ style: { background: 'transparent' } }}
        customStyle={{
          background: 'transparent',
          fontSize: '1rem',
          padding: '1rem 3rem 1rem 1rem',
          margin: 0
        }}
        wrapLongLines
      >
        {codeStr}
      </SyntaxHighlighter>

      <button
        className='button absolute top-4 right-4 text-white'
        title={copied ? 'Copied!' : 'Copy to clipboard'}
        disabled={copied}
        onClick={handleClick}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  )
}
