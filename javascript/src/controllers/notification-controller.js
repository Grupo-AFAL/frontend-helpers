import { DisappearController } from './disappear-controller'

/**
 * Notification Controller
 * Automatically hides the notification message if delay value is given
 * The user can chose to close the notification by clicking the close button.
 */
export class NotificationController extends DisappearController {
  static values = {
    delay: Number,
    remove: Boolean
  }

  connect () {
    this.closed = false
    if (!this.hasDelayValue) { return }

    setTimeout(() => this.close(), this.delayValue)
  }
}
