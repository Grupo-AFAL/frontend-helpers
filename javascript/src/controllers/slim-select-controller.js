import { Controller } from 'stimulus'

export class SlimSelectController extends Controller {
  static values = { placeholder: String, addItems: Boolean }

  async connect () {
    const { default: SlimSelect } = await import('slim-select')

    this.select = new SlimSelect({
      select: this.element,
      placeholder: this.hasPlaceholderValue && this.placeholderValue,
      addable: this.addable()
    })
  }

  addable () {
    if (!this.hasAddItemsValue || !this.addItemsValue) return

    return function (value) {
      return value
    }
  }
}
