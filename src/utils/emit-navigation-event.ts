import { PACKAGE_NAME } from '../consts'

export const NAVIGATION_EVENT_NAME = `${PACKAGE_NAME}-$navigation-action`

export const emitNavigationEvent = (element: HTMLElement | null) => {
  const event = new CustomEvent(NAVIGATION_EVENT_NAME)
  element?.dispatchEvent(event)
}
