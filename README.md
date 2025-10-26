```ts
<Carousel
  itemsCount={catImages.length}
  className={{ wrapper: 'w-110' }}
  navigationHandler={<NavigationArrows />}
>
  {catImages.map(src => (
    <CarouselItem className='h-150 rounded-none' key={src}>
      <img
        src={src}
        className='object-cover size-full'
        alt='A cat, probably angry'
      />
    </CarouselItem>
  ))}
</Carousel>
```