export const NAVIGATION_EVENT_NAME = '$navigation-action'

export const dispatchNavigationActionEvent = (element: HTMLElement | null) => {
  const event = new CustomEvent(NAVIGATION_EVENT_NAME)
  element?.dispatchEvent(event)
}
