import { Footer } from './components/Footer'
import { Hero } from './components/hero/Hero'
import { UsageSection } from './components/usage-section/UsageSection'

export default function App() {
  return (
    <main className='w-screen min-h-screen h-full flex flex-col items-center justify-center'>
      <Hero />
      <UsageSection />
      <Footer />
    </main>
  )
}
