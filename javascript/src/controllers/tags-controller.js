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
    this.updateInputPlaceholder()
  }

  updateInputPlaceholder(){
    if(!this.inputPlaceholder){
      this.inputPlaceholder = this.inputTarget.getAttribute('placeholder')
    }

    if(this.selectedItems.length){
      this.inputTarget.setAttribute('placeholder','')
    }else if (this.inputPlaceholder){
      this.inputTarget.setAttribute('placeholder', this.inputPlaceholder)
    }
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
    this.resultsTarget.addEventListener(
      'mouseover',
      this.onResultsHover.bind(this)
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
        if (this.inputTarget.value || this.selectedItem) {
          this.addOrCreateNewItem()
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
        this.selectedItem = null
    }
  }

  onInputArrowDown () {
    const results = this.resultsTarget

    if (!results.innerHTML) {
      this.renderAvailableItems()
    }

    if (!this.selectedItem) {
      this.selectedItem = results.firstChild
      this.updateSelectedItem(this.selectedItem)
      results.scrollTop = this.selectedItem.offsetTop
    } else if (this.selectedItem !== results.lastChild) {
      this.updateSelectedItem(this.selectedItem)
      this.selectedItem = this.selectedItem.nextSibling
      results.scrollTop = this.selectedItem.offsetTop
      this.updateSelectedItem(this.selectedItem)
    }
  }

  onInputArrowUp () {
    const results = this.resultsTarget

    if (this.selectedItem && this.selectedItem !== results.firstChild) {
      this.selectedItem = this.selectedItem.previousSibling
      this.updateSelectedItem(this.selectedItem)
      this.updateSelectedItem(this.selectedItem.nextSibling)
      results.scrollTop = this.selectedItem.offsetTop
    }
  }

  updateSelectedItem (item) {
    if (item) item.classList.toggle('selected')
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

  addOrCreateNewItem (itemName = null) {

    const item = this.firstAvailableItem(
      itemName || this.getItemName(this.selectedItem) || this.inputTarget.value
    )

    if (item) {
      this.addSelectedItem(item[1])
      this.renderAvailableItems()
    } else if (this.addItemsValue) {
      this.createNewItem()
    }

    this.updateInputPlaceholder()

    if (this.resultsTarget.firstChild) {
      this.selectedItem = null
      this.hideResults()
    }
  }

  createNewItem () {
    this.itemsById[this.inputTarget.value] = this.inputTarget.value
    this.addSelectedItem(this.inputTarget.value)
    this.hideResults()
  }

  onResultsMouseDown (event) {
    this.addOrCreateNewItem(event.target.textContent)
  }

  onResultsHover (event) {
    if (event.target.localName === 'li') {
      this.updateSelectedItem(this.selectedItem)
      this.selectedItem = event.target
      this.updateSelectedItem(this.selectedItem)
    }
  }

  hideResults = () => {
    this.selectedItem = null
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

    span.dataset.value = value
    span.append(this.itemsById[value])
    span.append(closeBtn)
    span.classList.add('input-tag')

    this.containerTarget.append(span)
  }

  removeLastItem () {
    if (this.inputTarget.value || this.selectedItems.length === 0) return

    const lastItem = this.selectedItems[this.selectedItems.length - 1]
    this.removeItem(lastItem)()
    this.hideResults()
  }

  removeItem (value) {
    return () => {
      this.containerTarget.childNodes.forEach(span => {
        if (span.getAttributeNode('data-value').value === value.toString()) {
          this.containerTarget.removeChild(span)
        }
      })
      this.selectedItems = this.selectedItems.filter(i => i !== value)

      this.updateInputPlaceholder()
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
