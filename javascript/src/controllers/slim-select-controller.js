import { Controller } from '@hotwired/stimulus'

export class SlimSelectController extends Controller {
  static values = {
    placeholder: String,
    addItems: Boolean,
    showContent: String,
    showSearch: Boolean,
    searchPlaceholder: String,
    addToBody: Boolean,
    closeOnSelect: Boolean,
    allowDeselectOption: Boolean,
    selectAllText: String,
    deselectAllText: String
  }

  static targets = ['select', 'selectAll']

  async connect () {
    const { default: SlimSelect } = await import('slim-select')

    const options = {
      select: this.selectTarget,
      placeholder: this.hasPlaceholderValue && this.placeholderValue,
      showContent:
        this.showContentValue === 'undefined' ? this.showContent : 'down',
      showSearch: this.showSearchValue,
      searchPlaceholder: this.searchPlaceholderValue,
      addToBody: this.addToBodyValue,
      closeOnSelect: this.closeOnSelectValue,
      allowDeselectOption: this.allowDeselectOptionValue,
      addable: this.addable()
    }

    if (this.hasInnerHTML()) {
      options.data = this.dataWithHTML()
    }

    this.select = new SlimSelect(options)
  }

  disconnect () {
    this.select.destroy()
  }

  addable () {
    if (!this.addItemsValue) return

    return function (value) {
      return value
    }
  }

  dataWithHTML () {
    return Array.from(this.selectTarget.children).map(option => {
      return {
        text: option.text,
        value: option.value,
        innerHTML: option.dataset.innerHtml,
        selected: option.selected,
        disabled: option.disabled
      }
    })
  }

  hasInnerHTML () {
    const firstOption = this.selectTarget.children[0]
    return firstOption && !!firstOption.dataset.innerHtml
  }

  selectAll () {
    const allValues = []
    Array.from(this.selectTarget.children).forEach(option => {
      allValues.push(option.value)
    })

    this.select.set(allValues)
    this.selectAllTarget.setAttribute('data-action', 'slim-select#deselectAll')
    this.selectAllTarget.innerHTML = this.deselectAllTextValue
  }

  deselectAll () {
    this.select.set([])
    this.selectAllTarget.setAttribute('data-action', 'slim-select#selectAll')
    this.selectAllTarget.innerHTML = this.selectAllTextValue
  }
}
