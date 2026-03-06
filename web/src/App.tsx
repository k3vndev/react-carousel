import { Footer } from './components/Footer'
import { Hero } from './components/hero/Hero'
import { Sections } from './components/Sections'

export default function App() {
  return (
    <main className='w-screen min-h-screen h-full flex flex-col items-center justify-center'>
      <Hero />
      <Sections />
      <Footer />
    </main>
  )
}
