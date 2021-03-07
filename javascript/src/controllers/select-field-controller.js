import { Controller } from 'stimulus'
import Choices from 'choices.js'

export class SelectFieldController extends Controller {
  defaultPosition = 'auto'
  shouldSort = false

  connect () {
    const position = this.data.get('position') || this.defaultPosition
    const selectField = this.element.querySelector('select')
    const multiple = Boolean(selectField.getAttribute('multiple'))
    const shouldSort =
      Boolean(selectField.getAttribute('should-sort')) || this.shouldSort

    this.choicesInstance = new Choices(selectField, {
      removeItemButton: multiple,
      position,
      shouldSort
    })

    this.element.addEventListener('addItem', () => {
      this.choicesInstance.hideDropdown()
    })
  }

  disconnect () {
    this.choicesInstance.destroy()
  }
}
