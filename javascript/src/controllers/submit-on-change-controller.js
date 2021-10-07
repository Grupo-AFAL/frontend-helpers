import { Controller } from 'stimulus'
import { submitForm } from '../utils/form'
import debounce from 'lodash.debounce'

/**
 * SubmitOnChange Controller
 * Automatically submits the form when the form element changes value
 *
 * How to use:
 *
 * <form action="/" data-controller="submit-on-change">
 *  <select data-action="submit-on-change#submit">
 *    <option value="1">One</option>
 *    <option value="2">Two</option>
 *  </select>
 * </form>
 *
 * Optionally you can specify the method and responseKind as values to the controller.
 */
export class SubmitOnChangeController extends Controller {
  static values = {
    delay: Number,
    method: String,
    responseKind: String
  }

  connect () {
    if (this.hasDelayValue && this.delayValue > 0) {
      this.submit = debounce(this.submit, this.delayValue)
    }
  }

  async submit () {
    const options = {}

    if (this.hasMethodValue) {
      options.method = this.hasMethodValue
    }

    if (this.hasResponseKindValue) {
      options.responseKind = this.responseKindValue
    }

    submitForm(this.element, options)
  }
}
