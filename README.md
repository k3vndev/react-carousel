## 🌀 React Carousel

A cool carousel component for React and TailwindCSS.
Build your own navigation, animations, and autoplay logic with ease.

[![npm version](https://img.shields.io/npm/v/@k3vndev/react-carousel?color=blue)](https://www.npmjs.com/package/@k3vndev/react-carousel) [![Made with React](https://img.shields.io/badge/Made%20with-React-blue?logo=react)](#)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?logo=typescript\&logoColor=white)](#)

---

### ✨ Features

* 🪶 **Lightweight:** No external dependencies beyond React.
* 🧩 **Composable:** Build your own UI — arrows, dots, autoplay, or custom transitions.
* ⚙️ **Hooks-first:** Powered by `useCarousel` and context — no massive config objects.
* 💨 **Smooth:** Uses native scroll behavior with `scroll-snap`.
* 🧠 **Typed:** Full TypeScript support.


## 🚀 Installation

1. Install the dependency:
    ```bash
    npm install @k3vndev/react-carousel
    ```

2. Enable Tailwind to read the package’s utilities and classes:
    ```css
    @import "tailwindcss";
    @source "../node_modules/@k3vndev/react-carousel";
    ```
    <small>⚠️ If you skip this step, Tailwind will skip the carousel styles aswell — your components will render but appear unstyled.</small>

## 🛳️ Navigation Handlers

Components passed in the `navigationHandler` Carousel property to control its navigation.
You can use multiple ones at the same time.


| Component name        | Description                                                         |
| --------------------- | ------------------------------------------------------------------- |
| `NavigationArrows`    | Two arrow buttons to navigate horizontally                          |
| `NavigationPoints`    | A row of circular buttons to represent and navigate between slides. |
| `NavigationAutomatic` | Enables automatic carousel navigation (auto-sliding).               |


###  🧠 Creating your custom navigation handler

You can create your own navigation handlers using the `useCarousel` hook.

```ts
const { carouselNavigator, carouselData } = useCarousel()
```

This hook provides you with two main objects: carouselNavigator and carouselData.
- `carouselNavigator`: Contains functions to control the carousel's navigation.
- `carouselData`: Contains useful data about the carousel's current state.


**The `carouselNavigator` utility functions include:**

| Function                              | Description                                |
| ------------------------------------- | ------------------------------------------ |
| `scrollLeft(itemsDistance?: number)`  | Scrolls left by *n* tiles. Defaults to 1.  |
| `scrollRight(itemsDistance?: number)` | Scrolls right by *n* tiles. Defaults to 1. |
| `scrollToIndex(index: number)`        | Scrolls directly to the given index.       |


## 🪄 Usage
```tsx
<Carousel
  itemsCount={catImages.length}
  className={{ wrapper: 'w-110' }}
  navigationHandler={<NavigationArrows />}
>
  {catImagesUrls.map(src => (
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

Don't forget to import:

```ts
import { Carousel, CarouselItem } from '@k3vndev/react-carousel'
```

## 🎨 Style It Your Way

You can apply your own Tailwind classes, CSS, or inline styles.
For example:

```tsx
<NavigationPoints
  className={{
    points: '[&.active]:bg-yellow-400',
    wrapper: 'gap-3 mt-6'
  }}
/>
```