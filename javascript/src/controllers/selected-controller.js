import { Controller } from 'stimulus'

export class SelectedController extends Controller {
  static classes = ['selected']

  change () {
    this.element.classList.toggle(this.selectedClass)
  }
}
