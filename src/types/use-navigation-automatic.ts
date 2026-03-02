/**
 * Configuration options for the `useAutoScroll` hook.
 */
export interface AutoScrollConfig {
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
