export const getCatImages = (pathname: string, count: number): string[] => {
  const catImages: string[] = []
  for (let i = 1; i <= count; i++) {
    catImages.push(`/cats/${pathname}/${i}.webp`)
  }
  return catImages
}
