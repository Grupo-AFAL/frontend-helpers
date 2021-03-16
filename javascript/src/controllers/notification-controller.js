import { Controller } from 'stimulus'

/**
 * Notification Controller
 * Automatically hides the notification message after 3 seconds by default
 * The user can chose to close the notification by clicking the close button.
 */
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
