import { Controller } from 'stimulus'
import { get } from '@rails/request.js'

/**
 * InputOnChange Controller
 * Updates content based on a get request on input change
 *
 * <div data-controller="input-on-change" data-input-on-change-url-value="url_path">
 *   <input data-action="input-on-change#change">
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
