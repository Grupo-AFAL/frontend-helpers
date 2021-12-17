import { Controller } from '@hotwired/stimulus'

export class AutoPlayAudioController extends Controller {
  static values = {
    delay: { type: Number, default: 100 }
  }

  connect () {
    setTimeout(() => this.play(), this.delayValue)
  }

  play () {
    this.element.play()
  }
}
