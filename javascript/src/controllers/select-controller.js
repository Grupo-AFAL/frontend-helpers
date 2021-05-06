import { Controller } from 'stimulus'
import { stringToDOMNode } from '../utils/domHelpers'
import autoCompleteInput from '../utils/autoCompleteInput'
import {
  unvailableItemTag,
  availableItemTag,
  ulContainerTag,
  inputTag
} from '../utils/autoCompleteInput/domElements'
import {
  firstAvailableItem,
  availableItems
} from '../utils/autoCompleteInput/search'

/**
 * Select Controller
 *
 * Converts a text input into a single select input with the ability to
 * autocomplete existing items.
 */
export class SelectController extends Controller {
  static targets = ['input', 'results', 'fakeInput']

  async connect () {
    this.element.prepend(inputTag())
    this.element.append(ulContainerTag())

    this.selectField = this.element.querySelector('select')
    this.selectField.setAttribute('hidden', '')

    this.initializeItems()

    autoCompleteInput(this)
  }

  initializeItems () {
    this.selectedItem = this.selectField.selectedOptions[0].value
    this.items = Array.from(this.selectField.options).map(o => [
      o.text,
      o.value
    ])

    this.itemsById = this.items.reduce((accumulator, item) => {
      const [name, value] = item
      accumulator[value] = name
      return accumulator
    }, {})

    this.renderSelectedItem(this.selectedItem)
  }

  onKeydown (event) {
    switch (event.key) {
      case 'Escape':
        this.hideResults()
        break
      case 'Tab':
      case 'Enter':
      case ',':
        if (this.inputTarget.value || this.highlightedItem) {
          this.addNewItem()
          event.preventDefault()
        }
        break
      case 'ArrowDown':
        this.onInputArrowDown()
        break
      case 'ArrowUp':
        this.onInputArrowUp()
        break
      default:
        this.highlightedItem = null
    }
  }

  onInputArrowDown () {
    const results = this.resultsTarget

    if (!results.innerHTML) {
      this.renderAvailableItems()
    }

    if (!this.highlightedItem) {
      this.highlightedItem = this.updateHighlightedItem(results.firstChild)
      results.scrollTop = this.highlightedItem.offsetTop
    } else if (this.highlightedItem !== results.lastChild) {
      this.updateHighlightedItem(this.highlightedItem)
      this.highlightedItem = this.updateHighlightedItem(
        this.highlightedItem.nextSibling
      )
      results.scrollTop = this.highlightedItem.offsetTop
    }
  }

  onInputArrowUp () {
    const results = this.resultsTarget

    if (this.highlightedItem && this.highlightedItem !== results.firstChild) {
      this.highlightedItem = this.updateHighlightedItem(
        this.highlightedItem.previousSibling
      )
      this.updateHighlightedItem(this.highlightedItem.nextSibling)
      results.scrollTop = this.highlightedItem.offsetTop
    }
  }

  updateHighlightedItem (item) {
    if (item) {
      item.classList.toggle('selected')
      return item
    }
  }

  getItemName (item) {
    return item ? item.textContent : ''
  }

  onFocusOrClick () {
    this.renderAvailableItems()
  }

  onInputChange () {
    this.renderAvailableItems(this.inputTarget.value)
  }

  addNewItem (itemName = null) {
    const searchText =
      itemName ||
      this.getItemName(this.highlightedItem) ||
      this.inputTarget.value

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

  onResultsMouseDown (event) {
    this.addNewItem(event.target.textContent)
  }

  onResultsHover (event) {
    if (event.target.localName !== 'li') return

    this.updateHighlightedItem(this.highlightedItem)
    this.highlightedItem = this.updateHighlightedItem(event.target)
  }

  hideResults = () => {
    this.highlightedItem = null
    if (!this.resultsTarget.innerHTML) return

    this.resultsTarget.classList.add('is-hidden')
    this.resultsTarget.innerHTML = null
    this.fakeInputTarget.classList.remove('is-focused')
  }

  addSelectedItem (value) {
    if (!value || value.length === 0) return

    this.selectedItem = value
    this.renderSelectedItem(value)

    this.commit()
  }

  renderAvailableItems (searchText = null) {
    this.resultsTarget.innerHTML = null
    const items = availableItems(this.items, searchText)

    if (items.length === 0) {
      this.resultsTarget.append(unvailableItemTag(searchText))
    } else {
      items.forEach(item => {
        this.resultsTarget.append(availableItemTag(item))
      })
    }

    const rect = this.fakeInputTarget.getBoundingClientRect()
    const top = rect.top + 50
    const left = rect.left
    const width = rect.width

    this.resultsTarget.setAttribute(
      'style',
      `top:${top}px; left:${left}px; width:${width}px;`
    )

    this.fakeInputTarget.classList.add('is-focused')
    this.resultsTarget.classList.remove('is-hidden')
  }

  renderSelectedItem (value) {
    this.inputTarget.value = this.itemsById[value]
  }

  commit () {
    this.selectField
      .querySelector('option[selected]')
      .removeAttribute('selected')

    this.selectField
      .querySelector(`option[value='${this.selectedItem}']`)
      .setAttribute('selected', '')
  }
}
