import { Controller } from 'stimulus'

export class SelectFieldController extends Controller {
  defaultPosition = 'auto'
  shouldSort = false

  async connect () {
    const { default: Choices } = await import('choices.js')

    const position = this.data.get('position') || this.defaultPosition
    const selectField = this.element.querySelector('select')
    const multiple = Boolean(selectField.getAttribute('multiple'))
    const shouldSort =
      Boolean(selectField.getAttribute('should-sort')) || this.shouldSort

    if (selectField.dataset.choice === 'active') {
      console.info(
        'SelectFieldController: Already initialized, skipping Choices.js initialization'
      )
      return
    }

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
    if (!this.choicesInstance) return
    this.choicesInstance.destroy()
  }
}
