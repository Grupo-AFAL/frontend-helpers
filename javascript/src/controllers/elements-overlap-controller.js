import { Controller } from '@hotwired/stimulus'
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
  static values = {
    throttleInterval: { type: Number, default: 10 },
    minWindowWidth: { type: Number, default: 1023 }, // 1023 - touch device threshold
    gap: { type: Number, default: 16 }
  }

  static targets = ['dynamicElement', 'fixedElement']

  connect () {
    const fixedElementPositionProperties = this.fixedElementTarget.getBoundingClientRect()

    this.fixedElementBottom =
      fixedElementPositionProperties.bottom + this.gapValue

    this.throttledPreventOverlap = throttle(
      this.preventOverlaping,
      this.throttleIntervalValue
    )

    document.addEventListener('scroll', this.throttledPreventOverlap)
    window.addEventListener('resize', this.throttledPreventOverlap)
  }

  preventOverlaping = () => {
    if (window.innerWidth <= this.minWindowWidthValue) {
      return
    }

    const { top } = this.dynamicElementTarget.getBoundingClientRect()
    const areElementsOverlaping = this.fixedElementBottom >= top

    if (areElementsOverlaping) {
      this.fixedElementTarget.style.bottom = `${window.innerHeight -
        top +
        this.gapValue}px`
    } else {
      this.fixedElementTarget.style.bottom = 'unset'
    }
  }
}
