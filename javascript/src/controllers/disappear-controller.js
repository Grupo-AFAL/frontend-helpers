import { Controller } from 'stimulus'

/**
 * Disappear Controller
 * Automatically hides the element after 3 seconds
 * Defaults:
 *  --delay: 3 seconds
 *  --disappearAnimation: fadeOutRight
 */
export class DisappearController extends Controller {
  static classes = { disappearAnimation: String }

  static values = {
    delay: Number
  }

  connect () {
    this.closed = false
    setTimeout(() => this.close(), this.delayValue || 3000)
  }

  disconnect () {
    if (this.closed) return
    this.element.remove()
  }

  close () {
    this.element.classList.add(this.disappearAnimationClass || 'fadeOutRight')
    this.element.addEventListener('animationend', () => {
      this.closed = true
      this.element.remove()
    })
  }
}
