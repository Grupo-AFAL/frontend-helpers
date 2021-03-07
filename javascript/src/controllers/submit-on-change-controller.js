import { Controller } from 'stimulus'
import { navigator } from '@hotwired/turbo'

export class SubmitOnChangeController extends Controller {
  submit () {
    navigator.submitForm(this.element)
  }
}
