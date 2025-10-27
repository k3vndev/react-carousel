import { Hero } from './components/Hero'
import { Sections } from './components/Sections'

import '../node_modules/@k3vndev/react-carousel/dist/index.css'

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
