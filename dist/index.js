var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  Carousel: () => Carousel,
  CarouselItem: () => CarouselItem,
  NavigationArrows: () => NavigationArrows,
  NavigationAutomatic: () => NavigationAutomatic,
  NavigationPoints: () => NavigationPoints,
  useCarousel: () => useCarousel
});
module.exports = __toCommonJS(index_exports);

// src/Carousel.tsx
var import_react2 = require("react");
var import_tailwind_merge = require("tailwind-merge");

// src/context/carousel-context.tsx
var import_react = require("react");
var CarouselContext = (0, import_react.createContext)({
  tileProps: { className: "", style: {} },
  elementRef: { current: null },
  gap: 0,
  visibleItems: 0,
  tileWidth: 0,
  itemsCount: 0,
  selectedIndex: 0
});

// src/Carousel.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Carousel = ({
  children,
  itemsCount,
  navigationHandler,
  visibleItems = 1,
  gap = 0,
  className,
  style
}) => {
  const elementRef = (0, import_react2.useRef)(null);
  const [tileWidth, setTileWidth] = (0, import_react2.useState)(-1);
  const [selectedIndex, setSelectedIndex] = (0, import_react2.useState)(0);
  const refreshWidth = (0, import_react2.useCallback)(() => {
    if (!elementRef.current) return;
    const { offsetWidth } = elementRef.current;
    const totalGap = gap * (visibleItems - 1);
    const width = (offsetWidth - totalGap) / visibleItems;
    setTileWidth(width);
  }, [visibleItems, gap]);
  (0, import_react2.useEffect)(refreshWidth, [visibleItems, gap]);
  (0, import_react2.useEffect)(() => {
    window.addEventListener("resize", refreshWidth);
    return () => window.removeEventListener("resize", refreshWidth);
  }, [visibleItems, gap]);
  (0, import_react2.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    CarouselContext.Provider,
    {
      value: { tileProps, elementRef, gap, tileWidth, visibleItems, itemsCount, selectedIndex },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: (0, import_tailwind_merge.twMerge)(`relative w-full ${className?.wrapper ?? ""}`), style: style?.wrapper, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react3 = require("react");
var import_tailwind_merge2 = require("tailwind-merge");
var import_jsx_runtime2 = require("react/jsx-runtime");
var CarouselItem = ({ children, className = "", ...props }) => {
  const { tileProps } = (0, import_react3.useContext)(CarouselContext);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      className: (0, import_tailwind_merge2.twMerge)(`h-64 rounded-2xl bg-gray-700 ${tileProps.className} ${className}`),
      style: { ...tileProps.style, ...props.style },
      ref: props.ref,
      children
    }
  );
};

// src/navigation/NavigationArrows.tsx
var import_react5 = require("react");
var import_tailwind_merge3 = require("tailwind-merge");

// src/icons/Chevron.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var ChevronIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M9 6l6 6l-6 6" })
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
var import_react4 = require("react");
var useCarousel = () => {
  const { elementRef, tileWidth, visibleItems, gap, itemsCount, selectedIndex } = (0, import_react4.useContext)(CarouselContext);
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
var import_jsx_runtime4 = require("react/jsx-runtime");
var NavigationArrows = ({ className, style }) => {
  const { elementRef, gap, tileWidth, visibleItems } = (0, import_react5.useContext)(CarouselContext);
  const [buttonVisible, setButtonVisible] = (0, import_react5.useState)({ left: false, right: false });
  const MIN_DIST_FROM_BORDER = 32;
  const initialScroll = (0, import_react5.useRef)(true);
  const { carouselNavigator } = useCarousel();
  (0, import_react5.useEffect)(() => {
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
  (0, import_react5.useEffect)(() => {
    handleULScroll();
    elementRef.current?.addEventListener("scroll", handleULScroll);
    return () => elementRef.current?.removeEventListener("scroll", handleULScroll);
  }, [visibleItems, tileWidth]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      Arrow,
      {
        className: `left-0 -translate-x-1/2 ${className?.both ?? ""} ${className?.left ?? ""}`,
        onClick: carouselNavigator.scrollLeft,
        visible: buttonVisible.left,
        style: { ...style?.left, ...style?.both },
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronIcon, { className: "text-white/50 rotate-180" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      Arrow,
      {
        className: `right-0 translate-x-1/2 ${className?.both ?? ""} ${className?.right ?? ""}`,
        onClick: carouselNavigator.scrollRight,
        visible: buttonVisible.right,
        style: { ...style?.right, ...style?.both },
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronIcon, { className: "text-white/50 " })
      }
    )
  ] });
};
var Arrow = ({ className = "", children, onClick, visible, ...props }) => {
  const visibility = visible ? "opacity-100 scale-100" : "opacity-0 scale-75";
  const { elementRef } = (0, import_react5.useContext)(CarouselContext);
  const handleClick = () => {
    onClick();
    dispatchNavigationActionEvent(elementRef.current);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "div",
    {
      className: (0, import_tailwind_merge3.twMerge)(`
        absolute top-1/2 -translate-y-1/2 transition-all duration-200 
        ${visibility} ${className}
      `),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_react7 = require("react");

// src/hooks/useFreshRefs.ts
var import_react6 = require("react");
var useFreshRefs = (value) => {
  const ref = (0, import_react6.useRef)(value);
  (0, import_react6.useEffect)(() => {
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
  const { elementRef, itemsCount, selectedIndex } = (0, import_react7.useContext)(CarouselContext);
  const { carouselNavigator } = useCarousel();
  const timeoutRef = (0, import_react7.useRef)(null);
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
  (0, import_react7.useEffect)(() => {
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
var import_react8 = require("react");
var import_tailwind_merge4 = require("tailwind-merge");
var import_jsx_runtime5 = require("react/jsx-runtime");
var NavigationPoints = ({ className, style }) => {
  const { itemsCount, selectedIndex } = (0, import_react8.useContext)(CarouselContext);
  const itemsArray = Array(itemsCount).fill(null);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "div",
    {
      className: (0, import_tailwind_merge4.twMerge)(`
        absolute left-1/2 -translate-x-1/2 -bottom-10
        flex gap-6 ${className?.wrapper ?? ""}
      `),
      style: style?.wrapper,
      children: itemsArray.map((_, i) => {
        const isSelected = selectedIndex === i;
        const className_ = `${isSelected ? className?.selectedPoint ?? "" : ""} ${className?.points ?? ""}`;
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Point, { index: i, isSelected, style: style?.points, className: className_ }, i);
      })
    }
  );
};
var Point = ({ index, isSelected, className = "", style }) => {
  const { carouselNavigator } = useCarousel();
  const { elementRef } = (0, import_react8.useContext)(CarouselContext);
  const handleClick = () => {
    carouselNavigator.scrollToIndex(index);
    dispatchNavigationActionEvent(elementRef.current);
  };
  const selectedStyle = isSelected ? "bg-white/75 scale-120" : "bg-white/35 button";
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "button",
    {
      onClick: handleClick,
      className: (0, import_tailwind_merge4.twMerge)(`
        relative size-4 rounded-full ${selectedStyle} transition ${className}
      `),
      style,
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute left-1/2 top-1/2 -translate-1/2 size-[200%] bg-transparent" })
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Carousel,
  CarouselItem,
  NavigationArrows,
  NavigationAutomatic,
  NavigationPoints,
  useCarousel
});
