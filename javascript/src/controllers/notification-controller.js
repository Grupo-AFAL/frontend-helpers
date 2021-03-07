import { Controller } from 'stimulus'

export class NotificationController extends Controller {
  hide () {
    this.element.parentNode.removeChild(this.element)
  }
}
