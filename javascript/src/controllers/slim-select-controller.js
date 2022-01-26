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
    allowDeselectOption: Boolean
  }

  static targets = ['select', 'selectAllButton', 'deselectAllButton']

  async connect () {
    const { default: SlimSelect } = await import('slim-select')

    const options = {
      select: this.selectTarget,
      placeholder: this.hasPlaceholderValue && this.placeholderValue,
      showContent:
        this.showContentValue === 'undefined' ? 'down' : this.showContentValue,
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
    const allValues = Array.from(this.selectTarget.children).map(
      option => option.value
    )

    this.select.set(allValues)
    this.selectAllButtonTarget.style.display = 'none'
    this.deselectAllButtonTarget.style.display = 'block'
  }

  deselectAll () {
    this.select.set([])
    this.deselectAllButtonTarget.style.display = 'none'
    this.selectAllButtonTarget.style.display = 'block'
  }
}
