import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const CodeSnippet = () => {
  return (
    <SyntaxHighlighter
      language='tsx'
      style={oneDark}
      codeTagProps={{ style: { background: 'transparent' } }}
      customStyle={{
        background: 'rgba(0, 0, 0, 0.75)',
        border: '2px solid rgba(255, 255, 255, 0.10)',
        borderRadius: '1rem',
        fontSize: '1rem',
        marginTop: '1rem',
        padding: '1rem'
      }}
      wrapLongLines
    >
      {codeSnippetContent}
    </SyntaxHighlighter>
  )
}

// biome-ignore format: <>
const codeSnippetContent = 
`<Carousel
  itemsCount={catImages.length}
  className='w-110'
  navigationHandler={<NavigationArrows />}
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
