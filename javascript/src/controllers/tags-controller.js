import { Controller } from 'stimulus'

const notAvailableMessage = 'No hay opciones disponibles'

/**
 * Tags Controller
 *
 * Converts a text input into a multi select input with the ability to
 * autocomplete existing items and create new ones.
 */
export class TagsController extends Controller {
  static targets = ['input', 'results', 'hidden', 'fakeInput', 'container']

  static values = {
    items: Array
  }

  async connect () {
    const { useWindowResize } = await import('stimulus-use')
    useWindowResize(this)

    this.inputTarget.setAttribute('autocomplete', 'off')
    this.inputTarget.setAttribute('spellcheck', 'false')

    this.initializeItems()

    this.inputTarget.addEventListener('focus', this.onFocusOrClick.bind(this))
    this.inputTarget.addEventListener('click', this.onFocusOrClick.bind(this))
    this.inputTarget.addEventListener('keydown', this.onKeydown.bind(this))
    this.inputTarget.addEventListener('blur', this.hideResults.bind(this))
    this.inputTarget.addEventListener('input', this.onInputChange.bind(this))
    this.resultsTarget.addEventListener(
      'mousedown',
      this.onResultsMouseDown.bind(this)
    )
  }

  initializeItems () {
    this.selectedItems = this.hiddenTarget.value
      .split(',')
      .filter(i => i.length > 0)
      .map(i => i.trim())

    this.selectedItems.forEach(i => this.renderSelectedItem(i))
  }

  windowResize () {
    this.hideResults()
  }

  onKeydown (event) {
    switch (event.key) {
      case 'Escape':
        this.hideResults()
        break
      case 'Tab':
      case 'Enter':
      case ',':
        this.addOrCreateNewItem()
        event.preventDefault()
        break
    }
  }

  onFocusOrClick () {
    this.renderAvailableItems()
  }

  onInputChange () {
    this.renderAvailableItems(this.inputTarget.value)
  }

  addOrCreateNewItem () {
    const item = this.firstAvailableItem(this.inputTarget.value)

    if (item) {
      this.addSelectedItem(item)
      this.renderAvailableItems()
    } else {
      this.createNewItem()
    }
  }

  createNewItem () {
    this.addSelectedItem(this.inputTarget.value)
    this.hideResults()
  }

  onResultsMouseDown (event) {
    this.addSelectedItem(event.target.dataset.value)
  }

  hideResults () {
    this.inputTarget.value = ''
    this.resultsTarget.classList.add('is-hidden')
    this.resultsTarget.innerHTML = null
    this.fakeInputTarget.classList.remove('is-focused')
  }

  addSelectedItem (value) {
    if (!value || value.length === 0) return

    this.selectedItems.push(value)
    this.hiddenTarget.value = this.selectedItems.join(',')
    this.renderSelectedItem(value)
    this.inputTarget.value = ''
  }

  firstAvailableItem (searchText = null) {
    return this.itemsValue.find(this.searchFunction(searchText))
  }

  availableItems (searchText = null) {
    return this.itemsValue.filter(this.searchFunction(searchText))
  }

  searchFunction (searchText) {
    return item => {
      const notIncluded = !this.selectedItems.includes(item)

      if (searchText) {
        return notIncluded && item.includes(searchText)
      } else {
        return notIncluded
      }
    }
  }

  renderAvailableItems (searchText = null) {
    this.resultsTarget.innerHTML = null
    const items = this.availableItems(searchText)

    if (items.length === 0) {
      this.resultsTarget.append(this.unvailableItemTag(searchText))
    } else {
      items.forEach(item => {
        this.resultsTarget.append(this.availableItemTag(item))
      })
    }

    const rect = this.fakeInputTarget.getBoundingClientRect()
    const top = rect.top + window.pageYOffset + 50
    const left = rect.left + window.pageXOffset
    const width = rect.width

    this.resultsTarget.setAttribute(
      'style',
      `top:${top}px; left:${left}px; width:${width}px;`
    )

    this.fakeInputTarget.classList.add('is-focused')
    this.resultsTarget.classList.remove('is-hidden')
  }

  availableItemTag (item) {
    const li = document.createElement('li')
    li.dataset.value = item
    li.append(item)
    return li
  }

  unvailableItemTag (searchText) {
    const li = document.createElement('li')

    if (searchText && searchText.length > 0) {
      li.append(`Agregar elemento: ${searchText}`)
      li.dataset.value = searchText
    } else {
      li.append(notAvailableMessage)
    }

    return li
  }

  renderSelectedItem (value) {
    const span = document.createElement('span')
    const closeBtn = document.createElement('span')
    closeBtn.append('X')
    closeBtn.classList.add('close-btn')
    closeBtn.addEventListener('click', this.removeItem(value, span))

    span.append(value)
    span.append(closeBtn)
    span.classList.add('input-tag')

    this.containerTarget.append(span)
  }

  removeItem (value, span) {
    return () => {
      this.containerTarget.removeChild(span)
      this.selectedItems = this.selectedItems.filter(i => i !== value)
      this.hiddenTarget.value = this.selectedItems.join(',')
    }
  }
}
