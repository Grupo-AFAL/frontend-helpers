import { Controller } from 'stimulus'

export class NotificationController extends Controller {
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
    this.element.classList.add('fadeOutRight')
    this.element.addEventListener('animationend', () => {
      this.closed = true
      this.element.remove()
    })
  }
}
