import { Controller } from '@hotwired/stimulus'

export class AutoPlayAudioController extends Controller {
  static values = {
    delay: Number
  }

  connect () {
    setTimeout(() => this.play(), this.delayValue || 100)
  }

  play () {
    this.element.play()
  }
}
