import { Controller } from 'stimulus'
import { get } from '@rails/request.js'

/**
 * InputOnChange Controller
 * It notifies the server when there is some change in the input
 *
 * <div data-controller="input-on-change" data-input-on-change-url-value="/url/path">
 *   <input data-action="input-on-change#change" name="some-name" value="hello">
 * </div>
 */
export class InputOnChangeController extends Controller {
  static values = { url: String }

  change (event) {
    get(this.urlValue, {
      query: { [event.target.name]: event.target.value },
      responseKind: 'turbo-stream'
    })
  }
}
