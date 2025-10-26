// src/Carousel.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

// src/context/carousel-context.tsx
import { createContext } from "react";
var CarouselContext = createContext({
  tileProps: { className: "", style: {} },
  elementRef: { current: null },
  gap: 0,
  visibleItems: 0,
  tileWidth: 0,
  itemsCount: 0,
  selectedIndex: 0
});

// src/Carousel.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Carousel = ({
  children,
  itemsCount,
  navigationHandler,
  visibleItems = 1,
  gap = 0,
  className,
  style
}) => {
  const elementRef = useRef(null);
  const [tileWidth, setTileWidth] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refreshWidth = useCallback(() => {
    if (!elementRef.current) return;
    const { offsetWidth } = elementRef.current;
    const totalGap = gap * (visibleItems - 1);
    const width = (offsetWidth - totalGap) / visibleItems;
    setTileWidth(width);
  }, [visibleItems, gap]);
  useEffect(refreshWidth, [visibleItems, gap]);
  useEffect(() => {
    window.addEventListener("resize", refreshWidth);
    return () => window.removeEventListener("resize", refreshWidth);
  }, [visibleItems, gap]);
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      const { scrollLeft } = elementRef.current;
      setSelectedIndex(Math.round(scrollLeft / tileWidth));
    };
    elementRef.current.addEventListener("scroll", handleScroll);
    return () => elementRef.current?.removeEventListener("scroll", handleScroll);
  }, [tileWidth, gap]);
  const widthForTile = tileWidth !== -1 ? `${tileWidth}px` : void 0;
  const tileProps = {
    className: "shrink-0 snap-start",
    style: { width: widthForTile, maxWidth: widthForTile, minWidth: widthForTile }
  };
  return /* @__PURE__ */ jsx(
    CarouselContext.Provider,
    {
      value: { tileProps, elementRef, gap, tileWidth, visibleItems, itemsCount, selectedIndex },
      children: /* @__PURE__ */ jsxs("section", { className: twMerge(`relative w-full ${className?.wrapper ?? ""}`), style: style?.wrapper, children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: elementRef,
            className: `
            flex overflow-x-scroll max-w-full w-full
            scrollbar-hide snap-x snap-mandatory rounded-2xl
            ${className?.scrollZone ?? ""}
          `,
            style: {
              contain: "layout inline-size",
              gap: `${gap}px`,
              ...style?.scrollZone
            },
            children: tileWidth > 0 && children
          }
        ),
        navigationHandler
      ] })
    }
  );
};

// src/CarouselItem.tsx
import { useContext } from "react";
import { twMerge as twMerge2 } from "tailwind-merge";
import { jsx as jsx2 } from "react/jsx-runtime";
var CarouselItem = ({ children, className = "", ...props }) => {
  const { tileProps } = useContext(CarouselContext);
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: twMerge2(`h-64 rounded-2xl bg-gray-700 ${tileProps.className} ${className}`),
      style: { ...tileProps.style, ...props.style },
      ref: props.ref,
      children
    }
  );
};

// src/navigation/NavigationArrows.tsx
import { useContext as useContext3, useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
import { twMerge as twMerge3 } from "tailwind-merge";

// src/icons/Chevron.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ChevronIcon = (props) => /* @__PURE__ */ jsxs2(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props,
    children: [
      /* @__PURE__ */ jsx3("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ jsx3("path", { d: "M9 6l6 6l-6 6" })
    ]
  }
);

// src/lib/dispatchNavigationActionEvent.ts
var NAVIGATION_EVENT_NAME = "$navigation-action";
var dispatchNavigationActionEvent = (element) => {
  const event = new CustomEvent(NAVIGATION_EVENT_NAME);
  element?.dispatchEvent(event);
};

// src/useCarousel.ts
import { useContext as useContext2 } from "react";
var useCarousel = () => {
  const { elementRef, tileWidth, visibleItems, gap, itemsCount, selectedIndex } = useContext2(CarouselContext);
  const scroll = (value) => {
    elementRef.current?.scrollTo({
      left: value,
      behavior: "smooth"
    });
  };
  const scrollToDirection = (isLeft, itemsDistance) => {
    const newItemsDistance = !itemsDistance || Number.isNaN(+itemsDistance) ? visibleItems : Math.round(itemsDistance);
    if (tileWidth > 0 && newItemsDistance > 0 && elementRef.current) {
      const direction = isLeft ? -1 : 1;
      const totalGap = calcTotalGap(newItemsDistance);
      const scrollAmount = (tileWidth * newItemsDistance + totalGap) * direction;
      scroll(scrollAmount + elementRef.current.scrollLeft);
    }
  };
  const calcTotalGap = (itemsCount2) => gap * (itemsCount2 - 1);
  const scrollToIndex = (index) => {
    const scrollAmount = tileWidth * index + calcTotalGap(index);
    scroll(scrollAmount);
  };
  const carouselData = {
    tileWidth,
    visibleItems,
    gap,
    itemsCount,
    selectedIndex
  };
  const carouselNavigator = {
    scrollLeft: (itemsDistance) => scrollToDirection(true, itemsDistance),
    scrollRight: (itemsDistance) => scrollToDirection(false, itemsDistance),
    scrollToIndex
  };
  return { carouselNavigator, carouselData };
};

// src/navigation/NavigationArrows.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var NavigationArrows = ({ className, style }) => {
  const { elementRef, gap, tileWidth, visibleItems } = useContext3(CarouselContext);
  const [buttonVisible, setButtonVisible] = useState2({ left: false, right: false });
  const MIN_DIST_FROM_BORDER = 32;
  const initialScroll = useRef2(true);
  const { carouselNavigator } = useCarousel();
  useEffect2(() => {
    if (buttonVisible.left && initialScroll.current && tileWidth) {
      initialScroll.current = false;
    }
  }, [buttonVisible, tileWidth]);
  const handleULScroll = () => {
    if (elementRef.current == null || !tileWidth) return;
    const itemsWidth = tileWidth * visibleItems + gap * (visibleItems - 1);
    const scrollLeft = elementRef.current.scrollLeft;
    const scrollRight = elementRef.current.scrollWidth - itemsWidth - scrollLeft;
    setButtonVisible({
      left: scrollLeft > MIN_DIST_FROM_BORDER,
      right: scrollRight > MIN_DIST_FROM_BORDER
    });
  };
  useEffect2(() => {
    handleULScroll();
    elementRef.current?.addEventListener("scroll", handleULScroll);
    return () => elementRef.current?.removeEventListener("scroll", handleULScroll);
  }, [visibleItems, tileWidth]);
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsx4(
      Arrow,
      {
        className: `left-0 -translate-x-1/2 ${className?.both ?? ""} ${className?.left ?? ""}`,
        onClick: carouselNavigator.scrollLeft,
        visible: buttonVisible.left,
        style: { ...style?.left, ...style?.both },
        children: /* @__PURE__ */ jsx4(ChevronIcon, { className: "text-white/50 rotate-180" })
      }
    ),
    /* @__PURE__ */ jsx4(
      Arrow,
      {
        className: `right-0 translate-x-1/2 ${className?.both ?? ""} ${className?.right ?? ""}`,
        onClick: carouselNavigator.scrollRight,
        visible: buttonVisible.right,
        style: { ...style?.right, ...style?.both },
        children: /* @__PURE__ */ jsx4(ChevronIcon, { className: "text-white/50 " })
      }
    )
  ] });
};
var Arrow = ({ className = "", children, onClick, visible, ...props }) => {
  const visibility = visible ? "opacity-100 scale-100" : "opacity-0 scale-75";
  const { elementRef } = useContext3(CarouselContext);
  const handleClick = () => {
    onClick();
    dispatchNavigationActionEvent(elementRef.current);
  };
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: twMerge3(`
        absolute top-1/2 -translate-y-1/2 transition-all duration-200 
        ${visibility} ${className}
      `),
      ...props,
      children: /* @__PURE__ */ jsx4(
        "button",
        {
          className: `
          p-2 rounded-full bg-gray-60 border border-white/15 text-gray-20
          button shadow-card shadow-black/30 relative bg-black/50 
          backdrop-blur-xl md:*:size-10 *:size-6
        `,
          onClick: handleClick,
          disabled: !visible,
          children
        }
      )
    }
  );
};

// src/navigation/NavigationAutomatic.tsx
import { useContext as useContext4, useEffect as useEffect4, useRef as useRef4 } from "react";

// src/hooks/useFreshRefs.ts
import { useEffect as useEffect3, useRef as useRef3 } from "react";
var useFreshRefs = (value) => {
  const ref = useRef3(value);
  useEffect3(() => {
    ref.current = value;
  }, [value]);
  return ref;
};

// src/navigation/NavigationAutomatic.tsx
var NavigationAutomatic = ({
  slideCooldown = 2500,
  slideRestartCooldown = 5e3,
  preventStopOnInteraction = false
}) => {
  const { elementRef, itemsCount, selectedIndex } = useContext4(CarouselContext);
  const { carouselNavigator } = useCarousel();
  const timeoutRef = useRef4(null);
  const refs = useFreshRefs({ selectedIndex, carouselNavigator });
  const stopTimeout = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };
  const startTimeout = (time) => {
    stopTimeout();
    timeoutRef.current = setTimeout(() => {
      const { selectedIndex: selectedIndex2, carouselNavigator: carouselNavigator2 } = refs.current;
      const nextIndex = selectedIndex2 < itemsCount - 1 ? selectedIndex2 + 1 : 0;
      carouselNavigator2.scrollToIndex(nextIndex);
      startTimeout(time);
    }, time);
  };
  useEffect4(() => {
    startTimeout(slideCooldown);
    if (!elementRef.current || preventStopOnInteraction) return;
    const restart = () => {
      startTimeout(slideRestartCooldown);
    };
    elementRef.current.addEventListener("pointerenter", stopTimeout);
    elementRef.current.addEventListener("pointerleave", restart);
    elementRef.current.addEventListener("touchstart", stopTimeout);
    elementRef.current.addEventListener("touchend", restart);
    elementRef.current.addEventListener("touchcancel", restart);
    elementRef.current.addEventListener(NAVIGATION_EVENT_NAME, restart);
    return () => {
      stopTimeout();
      elementRef.current?.removeEventListener("pointerenter", stopTimeout);
      elementRef.current?.removeEventListener("pointerleave", restart);
      elementRef.current?.removeEventListener("touchstart", stopTimeout);
      elementRef.current?.removeEventListener("touchend", restart);
      elementRef.current?.removeEventListener("touchcancel", restart);
      elementRef.current?.removeEventListener(NAVIGATION_EVENT_NAME, restart);
    };
  }, []);
  return null;
};

// src/navigation/NavigationPoints.tsx
import { useContext as useContext5 } from "react";
import { twMerge as twMerge4 } from "tailwind-merge";
import { jsx as jsx5 } from "react/jsx-runtime";
var NavigationPoints = ({ className, style }) => {
  const { itemsCount, selectedIndex } = useContext5(CarouselContext);
  const itemsArray = Array(itemsCount).fill(null);
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: twMerge4(`
        absolute left-1/2 -translate-x-1/2 -bottom-10
        flex gap-6 ${className?.wrapper ?? ""}
      `),
      style: style?.wrapper,
      children: itemsArray.map((_, i) => {
        const isSelected = selectedIndex === i;
        const className_ = `${isSelected ? className?.selectedPoint ?? "" : ""} ${className?.points ?? ""}`;
        return /* @__PURE__ */ jsx5(Point, { index: i, isSelected, style: style?.points, className: className_ }, i);
      })
    }
  );
};
var Point = ({ index, isSelected, className = "", style }) => {
  const { carouselNavigator } = useCarousel();
  const { elementRef } = useContext5(CarouselContext);
  const handleClick = () => {
    carouselNavigator.scrollToIndex(index);
    dispatchNavigationActionEvent(elementRef.current);
  };
  const selectedStyle = isSelected ? "bg-white/75 scale-120" : "bg-white/35 button";
  return /* @__PURE__ */ jsx5(
    "button",
    {
      onClick: handleClick,
      className: twMerge4(`
        relative size-4 rounded-full ${selectedStyle} transition ${className}
      `),
      style,
      children: /* @__PURE__ */ jsx5("div", { className: "absolute left-1/2 top-1/2 -translate-1/2 size-[200%] bg-transparent" })
    }
  );
};
export {
  Carousel,
  CarouselItem,
  NavigationArrows,
  NavigationAutomatic,
  NavigationPoints,
  useCarousel
};
