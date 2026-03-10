import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CheckIcon, CopyIcon } from './icons'

interface Props {
  codeStr: string
}

export const CodeSnippet = ({ codeStr }: Props) => {
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
    <div className='shadow-app-card rounded-xl overflow-clip border-2 border-white/5 relative'>
      <SyntaxHighlighter
        language='tsx'
        style={oneDark}
        codeTagProps={{ style: { background: 'transparent' } }}
        customStyle={{
          background: 'rgba(0, 0, 0, 0.75)',
          fontSize: '1rem',
          padding: '1rem',
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
