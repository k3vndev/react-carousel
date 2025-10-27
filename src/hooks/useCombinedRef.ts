export const useCombinedRef = <T>(forwarded?: React.Ref<T>, local?: React.RefObject<T>) => {
  return (node: T | null) => {
    if (local) local.current = node
    if (!forwarded) return
    if (typeof forwarded === 'function') forwarded(node)
    else (forwarded as React.RefObject<T | null>).current = node
  }
}
