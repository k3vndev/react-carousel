import { CarouselItem } from '@k3vndev/react-carousel'
import type { CatImage } from '../../utils/getCatImages'

interface Props {
  catImage: CatImage
  title: string
  desc: string
}

export const InstallSectionCarouselItem = ({ catImage, title, desc }: Props) => {
  return (
    <CarouselItem className='max-h-none flex flex-col xl:h-100 h-72 font-poppins overflow-hidden bg-[#191D27]/60 border border-white/10'>
      <img src={catImage.src} alt={catImage.alt} className='sm:h-3/5 h-1/3 object-cover' draggable={false} />

      <div className='flex flex-col shrink-0 justify-center lg:p-5 p-3'>
        <h3 className='text-gradient-yellow text-xl font-bold mb-2'>{title}</h3>
        <p className='text-white/80 text-sm'>{desc}</p>
      </div>
    </CarouselItem>
  )
}
