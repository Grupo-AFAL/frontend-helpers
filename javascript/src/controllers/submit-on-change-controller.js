import { Controller } from 'stimulus'
import { navigator } from '@hotwired/turbo'

export default class SubmitOnChangeController extends Controller {
  submit () {
    navigator.submitForm(this.element)
  }
}
