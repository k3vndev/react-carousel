export type ReusableComponent = {
  className?: string
  style?: React.CSSProperties
}

export type ReusableComponentWithRef = {
  ref?: React.RefObject<any>
} & ReusableComponent
