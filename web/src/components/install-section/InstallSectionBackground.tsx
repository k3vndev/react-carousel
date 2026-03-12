import type React from 'react'
import { useMemo } from 'react'

type MinMax = {
  min: number
  max: number
}

type SpiralItem = {
  id: number
  size: number
  left: number
  top: number
  animationDuration: number
  opacity: number
}

const spiralConfig = {
  maxElements: 28,
  maxFailedIterations: 220,
  gap: 4,
  size: { min: 10, max: 33 },
  left: { min: 0, max: 100 },
  top: { min: 0, max: 100 },
  opacity: { min: 0.1, max: 0.5 },
  animationDuration: { min: 5, max: 40 }
}

const randomInRange = ({ min, max }: MinMax) => Math.random() * (max - min) + min

export const InstallSectionBackground = () => {
  const spirals = useMemo<SpiralItem[]>(() => {
    const items: SpiralItem[] = []
    let failedIterations = 0

    while (items.length < spiralConfig.maxElements && failedIterations < spiralConfig.maxFailedIterations) {
      const candidate: SpiralItem = {
        id: items.length,
        size: randomInRange(spiralConfig.size),
        left: randomInRange(spiralConfig.left),
        top: randomInRange(spiralConfig.top),
        opacity: randomInRange(spiralConfig.opacity),
        animationDuration: randomInRange(spiralConfig.animationDuration)
      }

      const overlaps = items.some(item => {
        const dx = candidate.left - item.left
        const dy = candidate.top - item.top
        const distance = Math.hypot(dx, dy)
        const minDistance = candidate.size / 2 + item.size / 2 + spiralConfig.gap

        return distance < minDistance
      })

      if (overlaps) {
        failedIterations += 1
        continue
      }

      items.push(candidate)
    }

    if (items.length < spiralConfig.maxElements) {
      console.warn(
        '[InstallSectionBackground] Spiral generation stopped early after reaching max failed iterations.'
      )
    }

    return items
  }, [])

  return (
    <div className='absolute size-full left-0 top-0 -z-10 pointer-events-none animate-fade-in anim-delay-100 bg-linear-to-b from-[#060910] to-[#0C1017] overflow-clip'>
      {spirals.map(spiral => (
        <SpiralSVG
          key={spiral.id}
          className='absolute animate-spin text-black'
          style={{
            width: `${spiral.size}%`,
            height: `${spiral.size}%`,
            left: `calc(${spiral.left}% - ${spiral.size / 2}%)`,
            top: `calc(${spiral.top}% - ${spiral.size / 2}%)`,
            opacity: spiral.opacity,
            animationDuration: `${spiral.animationDuration}s`
          }}
        />
      ))}
    </div>
  )
}

const SpiralSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width='283' height='312' fill='none' viewBox='0 0 283 312' {...props}>
    <path
      fill='currentColor'
      d='M137.501 117.317c-15.5-4.381-26 13.5-26 35 0 15 10.615 30.051 17.5 35 16 11.5 51.212 21.222 80-6.5 27-26 18.5-71 3.5-92-12.333-16.305-49-44.632-97-27.5s-59.666 68.805-59.5 92.5c.099 14 6.5 39 22 58.5 26.629 33.5 64.5 42.5 92.5 43 13.063.233 34-4.149 59-19.5 28.5-17.5 43.5-51.167 49-70.5 4.5-22.5 6.5-46-2-73-16.842-53.5-71.01-81.446-96.5-88-17.5-4.5-41-6.89-72 0-36 8-65.333 36.666-75.5 50-16.775 22-26 44-31 77.5-4.85 32.5 2.734 61.5 13 83.5 7 15 25.2 44.8 66 72s93 26.333 114 22.5c20-5 60.9-18.2 64.5-31s-5.5-19.667-10.5-21.5c-2.333-.834-8.8-1.7-16 1.5s-19 9.5-30.5 13c-16.333 4.833-58.3 9.6-93.5-8s-57.5-55.333-65-72c-7-17.5-14.06-64.218 6-100 18.5-33 57.5-53.5 79-56s54.8-.9 84 23.5c29.017 24.246 33.229 58.565 34.968 72.733l.032.267c1.167 9.5-1 40.5-27 66.5-26.726 26.727-65.333 23.667-83 16.5-15-6.085-36.5-23.5-43.5-44.5-9.666-29 3-56.5 23.5-71.5 13.79-10.09 25.8-12.2 49-3s27.234 31.5 23.5 45.5c-2.533 9.5-8 22-25 22-16.419 0-20.5-12.125-17-20s3-22.685-10.5-26.5'
    />
  </svg>
)
