import { Controller } from '@hotwired/stimulus'

export class SlimSelectController extends Controller {
  static values = {
    placeholder: String,
    addItems: Boolean,
    showContent: String,
    showSearch: Boolean,
    searchPlaceholder: String,
    addToBody: Boolean
  }

  async connect () {
    const { default: SlimSelect } = await import('slim-select')

    const options = {
      select: this.element,
      placeholder: this.hasPlaceholderValue && this.placeholderValue,
      showContent: this.showContentValue,
      showSearch: this.showSearchValue,
      searchPlaceholder: this.searchPlaceholderValue,
      addToBody: this.addToBodyValue,
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
    return Array.from(this.element.children).map(option => {
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
    const firstOption = this.element.children[0]
    return firstOption && !!firstOption.dataset.innerHtml
  }
}
