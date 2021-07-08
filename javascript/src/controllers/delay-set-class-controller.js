import { Controller } from 'stimulus'

/**
 * DelaySetClass Controller
 * Automatically sets a class attribute to the element after 3 seconds
 * Defaults:
 *  --delay: 3 seconds
 *  --class: fadeOutRight
 */
export class DelaySetClassController extends Controller {
  static values = {
    delay: Number,
    class: String
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
    this.element.classList.add(this.classValue || 'fadeOutRight')
    this.element.addEventListener('animationend', () => {
      this.closed = true
      this.element.remove()
    })
  }
}
