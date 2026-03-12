export const getCatImages = (pathname: string, count: number): CatImage[] => {
  const catImages: CatImage[] = []
  for (let i = 1; i <= count; i++) {
    catImages.push({
      src: `/cats/${pathname}/${i}.webp`,
      alt: `Cat number ${i} from ${pathname} carousel`
    })
  }
  return catImages
}

export interface CatImage {
  src: string
  alt: string
}
