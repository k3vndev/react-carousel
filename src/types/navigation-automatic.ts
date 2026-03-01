/**
 * Public props for `NavigationAutomatic`.
 */
export interface NavigationAutomaticProps {
  /**
   * Time (in milliseconds) between each automatic slide.
   *
   * @default 2000
   */
  slideCooldown?: number

  /**
   * Delay (in milliseconds) before restarting automatic sliding after user interaction.
   *
   * @default 4000
   */
  slideRestartCooldown?: number

  /**
   * If `true`, keeps autoplay running during user interactions.
   *
   * @default false
   */
  preventStopOnInteraction?: boolean
}

/**
 * Automatic navigation handler for `Carousel` (autoplay behavior).
 */
export type NavigationAutomaticComponent = (props: NavigationAutomaticProps) => null
