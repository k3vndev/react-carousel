import type React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '../../utils/cn'

export const HeroBackground = () => {
  const [styles, setStyles] = useState<React.CSSProperties[]>([])

  useEffect(() => {
    const factors = [0.4, 0.2] // Scroll speed factors for both layers

    const refreshPositions = () => {
      const scrollY = window.scrollY

      setStyles(
        factors.map(factor => ({
          transform: `translateY(${scrollY * factor}px)`
        }))
      )
    }

    window.addEventListener('scroll', refreshPositions)
    window.addEventListener('resize', refreshPositions)

    return () => {
      window.removeEventListener('scroll', refreshPositions)
      window.removeEventListener('resize', refreshPositions)
    }
  }, [])

  return (
    <div className='absolute top-0 left-0 w-full h-full overflow-clip bg-linear-to-b from-[#12151D] to-[#161a20]'>
      <MountainSVG
        className='text-[#0C1017] bottom-[calc((10000px_-_(16_*_100vw))_/_33)] -scale-x-100 anim-delay-200 anim-scale-x-[-1]'
        style={styles[0]}
      />
      <MountainSVG
        className='text-[#060A10] bottom-[calc((4000px_-_(16_*_100vw))_/_33)] anim-delay-0'
        style={styles[1]}
      />
    </div>
  )
}

const MountainSVG = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width='1732'
    height='1274'
    viewBox='0 0 1732 1274'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn(
      'absolute left-0 w-full h-auto blur-[1px] animate-slide-in-b anim-blur-2xl anim-ease-out-back anim-opacity-0 anim-duration-1000',
      className
    )}
    {...props}
  >
    <path
      d='M106.87 133.672L0 226.403V1273.4H1732V226.403L1624.6 124.086C1601.36 101.946 1565.32 100.444 1540.32 120.574L1376.93 252.136C1363.56 262.902 1344.08 261.2 1332.77 248.281L1134.71 21.8629C1112.2 -3.86186 1073.46 -7.36462 1046.7 13.9072L831.013 185.411C817.39 196.243 797.608 194.202 786.485 180.816L701.677 78.7535C679.372 51.9112 639.675 47.8873 612.438 69.7079L337.126 290.27C322.34 302.116 300.557 298.593 290.259 282.69L202.534 147.224C181.39 114.574 136.251 108.179 106.87 133.672Z'
      fill='currentColor'
    />
  </svg>
)
