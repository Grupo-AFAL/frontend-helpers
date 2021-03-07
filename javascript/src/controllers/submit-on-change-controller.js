import { Controller } from 'stimulus'
export class SubmitOnChangeController extends Controller {
  async connect () {
    const { default: navigator } = await import('@hotwired/turbo')
    this.navigator = navigator
  }

  submit () {
    this.navigator.submitForm(this.element)
  }
}
