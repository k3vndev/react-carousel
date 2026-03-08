import { cn } from '../../utils/cn'

export const HeroBackground = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full overflow-clip bg-linear-to-b from-[#12151D] via-[#101419]'>
      <MountainSVG className='text-[#0C1017] bottom-32 -scale-x-100 anim-delay-200 anim-scale-x-[-1]' />
      <MountainSVG className='text-[#060A10] -bottom-48 anim-delay-0' />
    </div>
  )
}

const MountainSVG = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width='1728'
    height='650'
    viewBox='0 0 1728 650'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    className={cn(
      'absolute left-0 w-full h-auto blur-[1px] animate-slide-in-b anim-blur-2xl anim-ease-out-back anim-opacity-0 anim-duration-1000',
      className
    )}
    {...props}
  >
    <path
      d='M1623.38 133.672L1708.19 207.265C1722.2 219.42 1730.25 237.056 1730.25 255.604V633.403L-2.25 649.403V253.889C-2.25 236.34 4.95618 219.56 17.6824 207.477L105.651 123.952C128.897 101.879 164.888 100.41 189.856 120.514L329.395 232.87C356.135 254.401 395.099 250.998 417.703 225.159L595.544 21.8629C618.048 -3.86186 656.794 -7.36462 683.546 13.9072L874.724 165.92C901.97 187.584 941.534 183.501 963.78 156.729L1028.57 78.7535C1050.88 51.9112 1090.57 47.8873 1117.81 69.7079L1365.5 268.138C1395.07 291.829 1438.64 284.783 1459.23 252.978L1527.72 147.224C1548.86 114.574 1594 108.179 1623.38 133.672Z'
      fill='currentColor'
    />
  </svg>
)
