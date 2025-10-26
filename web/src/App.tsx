import '../../dist/index.css'
import { Hero } from './components/Hero'
import { Sections } from './components/Sections'

function App() {
  return (
    <main
      className={`
        w-screen min-h-screen h-full flex flex-col
        gap-20 items-center justify-center
      `}
    >
      <Hero />
      <Sections />
    </main>
  )
}

export default App
