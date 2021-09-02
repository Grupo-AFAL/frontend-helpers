import { DisappearController } from './disappear-controller'

/**
 * Notification Controller
 * Automatically hides the notification message after 3 seconds by default
 * The user can chose to close the notification by clicking the close button.
 */
export class NotificationController extends DisappearController {
  static values = {
		manualClose: Boolean,
	}
    
	connect () {
		this.closed = false
		if (this.hasManualCloseValue && this.manualCloseValue) { return }

		setTimeout(() => this.close(), this.delayValue || 3000)
	}
}
