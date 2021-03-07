import { Controller } from 'stimulus'

export class StepNumberInputController extends Controller {
  static targets = ['input', 'add', 'subtract']

  connect () {
    this.value = parseInt(this.inputTarget.value) || 0
    this.minValue = parseInt(this.inputTarget.min) || 0
    this.maxValue = parseInt(this.inputTarget.max) || 10
    this.setValue()

    this.inputTarget.addEventListener('change', e => {
      const newValue = parseInt(e.target.value) || 0

      if (newValue == this.value) return

      this.value = newValue
      this.setValue()
    })
  }

  add (e) {
    e.preventDefault()
    this.value += 1
    this.setValue()
    this.triggerChangeEvent()
  }

  subtract (e) {
    e.preventDefault()
    this.value -= 1
    this.setValue()
    this.triggerChangeEvent()
  }

  setValue () {
    this.value = Math.max(Math.min(this.value, this.maxValue), this.minValue)
    this.inputTarget.value = this.value

    if (this.hasAddTarget) {
      if (this.value === this.maxValue) {
        this.addTarget.classList.add('is-static')
      } else {
        this.addTarget.classList.remove('is-static')
      }
    }

    if (this.hasSubtractTarget) {
      if (this.value === this.minValue) {
        this.subtractTarget.classList.add('is-static')
      } else {
        this.subtractTarget.classList.remove('is-static')
      }
    }
  }

  triggerChangeEvent () {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('change', false, true)
    this.inputTarget.dispatchEvent(event)
  }
}
