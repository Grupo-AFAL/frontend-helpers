import { Controller } from 'stimulus'
import { submitForm } from '../utils/form'

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
    method: String,
    responseKind: String
  }

  async submit () {
    const options = {}
    if (this.hasMethodValue) {
      options.method = this.hasMethodValue
    }

    if (this.hasResponseKindValue) {
      options.responseKind = this.responseKindValue
    }

    return submitForm(this.element, options)
  }
}
