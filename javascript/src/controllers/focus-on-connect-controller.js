import { Controller } from '@hotwired/stimulus'

export class FocusOnConnectController extends Controller {
  connect = () => {
    this.element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
