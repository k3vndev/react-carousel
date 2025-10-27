import { Hero } from './components/Hero'
import { Sections } from './components/Sections'

import '../node_modules/@k3vndev/react-carousel/dist/index.css'
import { Footer } from './components/Footer'

function App() {
  return (
    <main
      className={`
        w-screen min-h-screen h-full flex flex-col
        items-center justify-center
      `}
    >
      <Hero />
      <Sections />
      <Footer />
    </main>
  )
}

export default App
