import { Controller } from 'stimulus'

const notAvailableMessage = 'No hay opciones disponibles'

/**
 * Tags Controller
 *
 * Converts a text input into a multi select input with the ability to
 * autocomplete existing items and create new ones.
 */
export class TagsController extends Controller {
  static targets = ['input', 'results', 'fakeInput', 'container']

  static values = {
    items: Array,
    selectedItems: Array,
    addItems: Boolean,
    inputName: String
  }

  async connect () {
    const { useWindowResize } = await import('stimulus-use')
    useWindowResize(this)

    this.inputTarget.setAttribute('autocomplete', 'off')
    this.inputTarget.setAttribute('spellcheck', 'false')

    if (!this.hasAddItemsValue) this.addItemsValue = true
    if (!this.hasInputNameValue) {
      console.warn('TagsController: data-tags-input-name is missing')
    }

    this.initializeItems()
    this.initializeListeners()
  }

  disconnect () {
    document.removeEventListener('scroll', this.hideResults)
  }

  initializeItems () {
    this.containerTarget.innerHTML = null

    this.selectedItems = this.selectedItemsValue
    this.createHiddenInputContainer()
    this.commit()

    this.itemsValue = this.itemsValue.map(this.normalizeItem)
    this.itemsById = this.itemsValue.reduce((accumulator, item) => {
      const [name, value] = item
      accumulator[value] = name
      return accumulator
    }, {})

    this.selectedItems.forEach(i => this.renderSelectedItem(i))
  }

  createHiddenInputContainer () {
    const existingContainer = this.element.querySelector(
      '.hidden-input-container'
    )

    if (existingContainer) {
      this.hiddenContainerTarget = existingContainer
    } else {
      this.hiddenContainerTarget = document.createElement('div')
      this.hiddenContainerTarget.classList.add('hidden-input-container')
      this.element.appendChild(this.hiddenContainerTarget)
    }
  }

  initializeListeners () {
    document.addEventListener('scroll', this.hideResults)
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

  windowResize () {
    this.hideResults()
  }

  onKeydown (event) {
    switch (event.key) {
      case 'Escape':
        this.hideResults()
        break
      case 'Backspace':
        this.removeLastItem()
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
      this.addSelectedItem(item[1])
      this.renderAvailableItems()
    } else if (this.addItemsValue) {
      this.createNewItem()
    }
  }

  createNewItem () {
    this.itemsById[this.inputTarget.value] = this.inputTarget.value
    this.addSelectedItem(this.inputTarget.value)
    this.hideResults()
  }

  onResultsMouseDown (event) {
    this.addSelectedItem(event.target.dataset.value)
  }

  hideResults = () => {
    if (!this.resultsTarget.innerHTML) return

    this.inputTarget.value = ''
    this.resultsTarget.classList.add('is-hidden')
    this.resultsTarget.innerHTML = null
    this.fakeInputTarget.classList.remove('is-focused')
  }

  addSelectedItem (value) {
    if (!value || value.length === 0) return

    this.selectedItems.push(value)
    this.renderSelectedItem(value)
    this.inputTarget.value = ''
    this.commit()
  }

  firstAvailableItem (searchText = null) {
    return this.itemsValue.find(this.searchFunction(searchText))
  }

  availableItems (searchText = null) {
    return this.itemsValue.filter(this.searchFunction(searchText))
  }

  searchFunction (searchText) {
    return item => {
      const [name, value] = item
      const notIncluded = !this.selectedItems.includes(value)

      if (searchText) {
        return (
          notIncluded && name.toLowerCase().includes(searchText.toLowerCase())
        )
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
        if (!this.selectedItems.includes(item[1].toString())) {
          this.resultsTarget.append(this.availableItemTag(item))
        }
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

  availableItemTag (item) {
    const li = document.createElement('li')
    const [name, value] = item
    li.dataset.value = value
    li.append(name)
    return li
  }

  unvailableItemTag (searchText) {
    const li = document.createElement('li')

    if (this.addItemsValue && searchText && searchText.length > 0) {
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
    closeBtn.addEventListener('click', this.removeItem(value))

    if (!this.itemsById[value]) {
      this.itemsById[value] = value
    }
    span.dataset.value = value
    span.append(this.itemsById[value])
    span.append(closeBtn)
    span.classList.add('input-tag')

    this.containerTarget.append(span)
  }

  removeLastItem () {
    if (this.inputTarget.value) return

    const lastItem = this.selectedItems[this.selectedItems.length - 1]
    if (this.selectedItems.length > 0) {
      this.removeItem(lastItem)()
      this.hideResults()
    }
  }

  removeItem (value) {
    return () => {
      const span = this.containerTarget.querySelector(`[data-value='${value}']`)
      this.containerTarget.removeChild(span)
      this.selectedItems = this.selectedItems.filter(i => i !== value)
      this.commit()
    }
  }

  commit () {
    this.hiddenContainerTarget.innerHTML = ''

    if (this.selectedItems.length === 0) {
      this.hiddenContainerTarget.append(this.generateInput(null))
    }

    this.selectedItems.forEach(value => {
      this.hiddenContainerTarget.append(this.generateInput(value))
    })
  }

  generateInput (value) {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')

    if (value) {
      input.setAttribute('value', value)
    }

    input.setAttribute('name', `${this.inputNameValue}[]`)
    input.dataset.tagsTarget = 'hidden'

    return input
  }

  normalizeItem (item) {
    if (Array.isArray(item)) return item
    return [item, item]
  }
}
