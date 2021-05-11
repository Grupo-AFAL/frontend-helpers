import { Controller } from 'stimulus'
import autoCompleteInput from '../utils/autoCompleteInput'
import { firstAvailableItem } from '../utils/autoCompleteInput/search'

/**
 * Select Controller
 *
 * Converts a text input into a single select input with the ability to
 * autocomplete existing items.
 */
export class SelectController extends Controller {
  static targets = ['input', 'results', 'fakeInput']

  async connect () {
    autoCompleteInput(this)

    this.selectField = this.element.querySelector('select')
    this.selectField.setAttribute('hidden', '')

    this.initializeItems()
    this.renderSelectedItem(this.selectedValue)
  }

  initializeItems () {
    this.selectedValue = this.selectField.selectedOptions[0].value
    this.items = Array.from(this.selectField.options).map(o => [
      o.text,
      o.value
    ])

    this.itemsByValue = this.items.reduce((accumulator, item) => {
      const [name, value] = item
      accumulator[value] = name
      return accumulator
    }, {})
  }

  addNewItem (itemName = null) {
    const highlightedText = this.highlightedItem
      ? this.highlightedItem.textContent
      : ''
    const searchText = itemName || highlightedText || this.inputTarget.value
    const item = firstAvailableItem(this.items, searchText)

    if (item) {
      this.addSelectedItem(item[1])
      this.renderAvailableItems()
    }

    if (this.resultsTarget.firstChild) {
      this.highlightedItem = null
      this.hideResults()
    }
  }

  addSelectedItem (value) {
    if (!value || value.length === 0) return

    this.selectedValue = value
    this.renderSelectedItem(value)
    this.commit()
  }

  renderSelectedItem (value) {
    this.inputTarget.value = this.itemsByValue[value]
  }

  commit () {
    this.selectField
      .querySelector('option[selected]')
      .removeAttribute('selected')

    this.selectField
      .querySelector(`option[value='${this.selectedValue}']`)
      .setAttribute('selected', '')
  }
}
