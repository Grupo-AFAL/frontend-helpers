import { Controller } from 'stimulus'

export default class NotificationController extends Controller {
  hide () {
    this.element.parentNode.removeChild(this.element)
  }
}
