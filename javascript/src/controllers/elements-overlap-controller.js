import { Controller } from 'stimulus'
import throttle from 'lodash.throttle'

/**
 * Elements Overlap Controller
 * Prevents a fixed elements overlaps a dynamic element. For example:
 *  A fixed sidebar and footer
 *
 *  Notes:
 *    - Fixed Element must have position fixed attribute
 *    - Fixed Element must be above the dynamic element
 *
 * Variables:
 *    - gap: It is the space between fixed element and dynamic element
 *                   when preventin overlaping
 *    - minWindowWidth: Screen width size where the controller will start to prevent overlaping
 */
export class ElementsOverlapController extends Controller {
  static values = { throttleInterval: Number, gap: Number, minWindowWidth: Number }
  static targets = ['dynamicElement', 'fixedElement']

  connect () {
    const fixedElementPositionProperties = this.fixedElementTarget.getBoundingClientRect()

    this.gap = this.gapValue || 16
    this.minWindowWidth = this.minWindowWidthValue || 1023 // 1023 - touch device threshold
    this.fixedElementBottom = fixedElementPositionProperties.bottom + this.gap

    this.throttledPreventOverlap = throttle(this.preventOverlaping, this.throttleIntervalValue || 10)

    document.addEventListener('scroll', this.throttledPreventOverlap)
    window.addEventListener('resize', this.throttledPreventOverlap)
  }

  preventOverlaping = () => {
    if (window.innerWidth <= this.minWindowWidth) { return }

    const { top } = this.dynamicElementTarget.getBoundingClientRect()
    const areElementsOverlaping = this.fixedElementBottom >= top

    if (areElementsOverlaping) {
      this.fixedElementTarget.style.bottom = `${window.innerHeight - top + this.gap}px`
    } else {
      this.fixedElementTarget.style.bottom = 'unset'
    }
  }
}
