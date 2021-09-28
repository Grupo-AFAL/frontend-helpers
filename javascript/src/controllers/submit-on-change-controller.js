import { Controller } from '@hotwired/stimulus'
import { navigator } from '@hotwired/turbo'

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
 */
export class SubmitOnChangeController extends Controller {
  submit () {
    navigator.submitForm(this.element)
  }
}
