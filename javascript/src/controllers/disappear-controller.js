import { Controller } from 'stimulus'

/**
 * Disappear Controller
 * Automatically hides the element after 3 seconds
 * Defaults:
 *  --delay: 3 seconds
 *  --disappearAnimation: fadeOutRight
 */
export class DisappearController extends Controller {
  static classes = ['animation']

  static values = {
    delay: Number,
    remove: Boolean
  }

  connect () {
    this.closed = false
    setTimeout(() => this.close(), this.delayValue || 3000)
  }

  disconnect () {
    if (this.closed) return
    this.removeElement()
  }

  close () {
    const animationClass = this.hasAnimationClass ? this.animationClass : 'fadeOutRight'

    this.element.classList.add(animationClass)
    this.element.addEventListener('animationend', () => {
      this.closed = true
      this.removeElement()
    })
  }

  removeElement () {
    const mustRemove = this.hasRemoveValue ? this.removeValue : true
    if (mustRemove) { this.element.remove() }
  }
}
