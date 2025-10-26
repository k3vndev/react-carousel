import * as react_jsx_runtime from 'react/jsx-runtime';

interface Props$4 {
    itemsCount: number;
    visibleItems?: number;
    gap?: number;
    children?: React.ReactNode;
    navigationHandler?: React.ReactNode;
    className?: {
        wrapper?: string;
        scrollZone?: string;
    };
    style?: {
        wrapper?: React.CSSProperties;
        scrollZone?: React.CSSProperties;
    };
}
declare const Carousel: ({ children, itemsCount, navigationHandler, visibleItems, gap, className, style }: Props$4) => react_jsx_runtime.JSX.Element;

type ReusableComponent = {
  className?: string
  style?: React.CSSProperties
}

type ReusableComponentWithRef = {
  ref?: React.RefObject<any>
} & ReusableComponent

interface Props$3 extends ReusableComponentWithRef {
    children?: React.ReactNode;
}
declare const CarouselItem: ({ children, className, ...props }: Props$3) => react_jsx_runtime.JSX.Element;

interface Props$2 {
    className?: {
        left?: string;
        right?: string;
        both?: string;
    };
    style?: {
        left?: React.CSSProperties;
        right?: React.CSSProperties;
        both?: React.CSSProperties;
    };
}
declare const NavigationArrows: ({ className, style }: Props$2) => react_jsx_runtime.JSX.Element;

type Props$1 = {
    slideCooldown?: number;
    slideRestartCooldown?: number;
    preventStopOnInteraction?: boolean;
};
declare const NavigationAutomatic: ({ slideCooldown, slideRestartCooldown, preventStopOnInteraction }: Props$1) => any;

interface Props {
    className?: {
        wrapper?: string;
        points?: string;
        selectedPoint?: string;
    };
    style?: {
        wrapper?: React.CSSProperties;
        points?: React.CSSProperties;
    };
}
declare const NavigationPoints: ({ className, style }: Props) => react_jsx_runtime.JSX.Element;

declare const useCarousel: () => {
    carouselNavigator: {
        scrollLeft: (itemsDistance?: number) => void;
        scrollRight: (itemsDistance?: number) => void;
        scrollToIndex: (index: number) => void;
    };
    carouselData: {
        tileWidth: number;
        visibleItems: number;
        gap: number;
        itemsCount: number;
        selectedIndex: number;
    };
};

export { Carousel, CarouselItem, NavigationArrows, NavigationAutomatic, NavigationPoints, type ReusableComponent, type ReusableComponentWithRef, useCarousel };
