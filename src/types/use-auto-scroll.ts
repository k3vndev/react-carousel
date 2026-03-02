/**
 * Configuration options for the `useAutoScroll` hook.
 */
export interface AutoScrollConfig {
  /**
   * Time (in milliseconds) between each automatic slide.
   *
   * @default 2000
   */
  slideInterval?: number

  /**
   * Delay (in milliseconds) before restarting automatic sliding after user interaction.
   *
   * @default 4000
   */
  slideResetDelay?: number

  /**
   * If `true`, automatic sliding will stop when the user interacts with the carousel (e.g., by hovering or touching it) and will only restart after the specified `slideResetDelay` time has passed since the last interaction.
   *
   * If `false`, automatic sliding will continue uninterrupted regardless of user interaction.
   *
   * @default true
   */
  stopOnInteraction?: boolean
}
