import { Controller } from 'stimulus'
import { get } from '@rails/request.js'
import { getTimestamp } from '../utils/time'

/**
 * InputOnChange Controller
 * It notifies the server when there is some change in the input.
 *
 * By default it sends the name of the input where the event was triggered, but it
 * can be customized with a data-input-on-change-query-key-value="some_other_key".
 *
 * A element target can also be specified which will send it's DOM ID to the server
 * in order for the server to know which element it needs to update.
 *
 * <div data-controller="input-on-change" data-input-on-change-url-value="/url/path">
 *   <input data-action="input-on-change#change" name="some-name" value="hello">
 * </div>
 */
export class InputOnChangeController extends Controller {
  static values = { url: String, queryKey: String }
  static targets = ['element']

  connect () {
    if (this.hasElementTarget && this.elementTarget.id.length === 0) {
      this.elementTarget.id = getTimestamp()
    }
  }

  change (event) {
    get(this.urlValue, {
      query: {
        [this.queryKey(event)]: event.target.value,
        target_id: this.targetId()
      },
      responseKind: 'turbo-stream'
    })
  }

  // Name of the parameter sent to the server.
  queryKey (event) {
    if (this.hasQueryKeyValue) return this.queryKeyValue
    return event.target.name
  }

  // ID extracted from the element target and sent to the server.
  targetId () {
    if (!this.hasElementTarget) return
    return this.elementTarget.id
  }
}
