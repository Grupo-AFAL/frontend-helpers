import { Controller } from '@hotwired/stimulus'

export class RadioGroupController extends Controller {
  static values = {
    containersSelector: String
  }

  connect () {
    this.lowestValue = parseInt(this.element.dataset.start) || 0

    this.radioButtonContainers = Array.from(
      this.element.querySelectorAll(this.containersSelectorValue)
    )
    this.radioButtons = Array.from(
      this.element.querySelectorAll('input[type=radio]')
    )
    this.radioButtons.forEach(radioButton => {
      radioButton.addEventListener('change', this.radioButtonSelected)
    })
  }

  radioButtonSelected = event => {
    this.radioButtonContainers.forEach(container => {
      container.classList.remove('selected')
    })

    event.target.closest(this.containersSelectorValue).classList.add('selected')

    this.element.dataset.selected =
      parseInt(event.target.value) - this.lowestValue
  }
}
