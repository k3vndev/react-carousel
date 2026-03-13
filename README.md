## 🌀 React Carousel

A composable, scroll-snap powered carousel for React and TailwindCSS.
Build your own navigation, transitions, and carousel behavior with ease.

[![npm version](https://img.shields.io/npm/v/@k3vndev/react-carousel?color=blue)](https://www.npmjs.com/package/@k3vndev/react-carousel)
[![Made with React](https://img.shields.io/badge/Made%20with-React-blue?logo=react)](#)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?logo=typescript\&logoColor=white)](#)

<video src="./demo.mp4" autoplay loop muted playsinline></video>

## ✨ Features

* 🧱 **Agnostic:** Render anything — images, cards, or custom components.
* 🧩 **Composable:** Build your own UI — arrows, dots, autoplay, or custom transitions.
* ⚙️ **Hooks-first:** Powered by `useCarousel` and React context — no massive config objects.
* 💨 **Smooth:** Uses native scroll behavior with `scroll-snap`.
* 🧠 **Typed:** Full TypeScript support.
* 🪶 **Lightweight:** No external dependencies beyond React and Tailwind.


## 🚀 Installation

1. Install the package with your preferred package manager:

```bash
pnpm add @k3vndev/react-carousel
```

2. Enable Tailwind to read the package utilities and classes:

```css
@import "tailwindcss";
@source "../node_modules/@k3vndev/react-carousel";
```

## 🎈 Example Usage

```tsx
import { Carousel, CarouselItem, NavigationArrows } from '@k3vndev/react-carousel'

<Carousel
  itemsCount={catImages.length}
  className="w-110"
  navigationHandler={<NavigationArrows />}
>
  {catImages.map(src => (
    <CarouselItem className="h-150 rounded-xl" key={src}>
      <img
        src={src}
        className="object-cover size-full"
        alt="A cat, probably angry"
      />
    </CarouselItem>
  ))}
</Carousel>
```


## 📦 Components

| Component          | Description              |
| ------------------ | ------------------------ |
| `Carousel`         | Main carousel container  |
| `CarouselItem`     | Individual slide         |
| `NavigationArrows` | Arrow navigation handler |
| `NavigationDots`   | Dot navigation handler   |


## 🛳️ Navigation Handlers

Components passed to the `navigationHandler` prop control the carousel navigation.
You can use multiple handlers at the same time.

| Component          | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `NavigationArrows` | Two arrow buttons for horizontal navigation          |
| `NavigationDots`   | A row of circular buttons to navigate between slides |


## 💡 Creating a Custom Navigation Handler

You can create your own navigation handlers using the `useCarousel` hook.

```ts
const { carouselNavigator, carouselData } = useCarousel()
```

This hook returns two objects:

* **`carouselNavigator`** — functions to control carousel navigation
* **`carouselData`** — useful data about the carousel's current state

### `carouselNavigator` functions

| Function                              | Description                                   |
| ------------------------------------- | --------------------------------------------- |
| `scrollLeft(itemsDistance?: number)`  | Scrolls left by *n* slides. Defaults to `1`.  |
| `scrollRight(itemsDistance?: number)` | Scrolls right by *n* slides. Defaults to `1`. |
| `scrollToIndex(index: number)`        | Scrolls directly to a specific slide          |

⚠️ `useCarousel` relies on React context, so it must be used within a `Carousel` component — typically inside a `navigationHandler`.


## 🖌️ Style It Your Way

You can apply your own Tailwind classes, CSS, or inline styles.

Example:

```tsx
<NavigationDots
  className="[&>.dot.active]:bg-yellow-400"
/>
```


## 🧑‍💻 Contributing

Contributions are welcome!
If you have ideas for improvements, new features, or bug fixes, feel free to open an issue or submit a pull request.
