import { Controller } from 'stimulus'
import autoCompleteInput from '../utils/autoCompleteInput'

/**
 * Select Controller
 *
 * Converts a text input into a single select input with the ability to
 * autocomplete existing items.
 */
export class SelectController extends Controller {
  static values = { searchPlaceholder: String }
  static classes = ['container']

  async connect () {
    this.selectField = this.element.querySelector('select')
    this.selectField.setAttribute('hidden', '')

    this.initializeItems()

    autoCompleteInput(this, this.autoCompleteOptions())
  }

  initializeItems () {
    this.selectedValue = this.selectField.selectedOptions[0].value
    this.options = Array.from(this.selectField.options)
    this.items = this.options
      .filter(o => o.value.length > 0)
      .map(o => [o.text, o.value])

    this.itemsByValue = this.items.reduce((accumulator, item) => {
      const [name, value] = item
      accumulator[value] = name
      return accumulator
    }, {})
  }

  commit () {
    const selectedOption = this.selectField.querySelector('option[selected]')
    if (selectedOption) selectedOption.removeAttribute('selected')

    this.selectField
      .querySelector(`option[value='${this.selectedValue}']`)
      .setAttribute('selected', '')

    this.selectField.dispatchEvent(new Event('change'))
  }

  extractplaceholderText () {
    const placeholderOption = this.options.filter(o => o.value.length === 0)[0]
    if (placeholderOption) {
      return placeholderOption.innerText
    }
  }

  autoCompleteOptions () {
    const options = {}

    if (this.hasContainerClass) {
      options.containerClass = this.containerClass
    }

    const placeholder = this.extractplaceholderText()
    if (placeholder) {
      options.placeholder = placeholder
    }

    if (this.hasSearchPlaceholderValue) {
      options.searchPlaceholder = this.searchPlaceholderValue
    }

    return options
  }
}
