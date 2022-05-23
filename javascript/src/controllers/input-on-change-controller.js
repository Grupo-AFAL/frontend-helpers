import { Controller } from '@hotwired/stimulus'
import { get, post } from '@rails/request.js'
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
 *
 * For a multi-select a POST request is required in order to send an array of values
 *
 * <div data-controller="input-on-change"
 *      data-input-on-change-url-value="/url/path"
 *      data-input-on-change-method-value="post">
 *   <select multiple="true" data-action="input-on-change#change" name="some-name">
 *     ....
 *   </select>
 * </div>
 */
export class InputOnChangeController extends Controller {
  static values = {
    url: String,
    queryKey: String,
    method: { type: String, default: 'get' }
  }

  static targets = ['element']

  connect () {
    if (this.hasElementTarget && this.elementTarget.id.length === 0) {
      this.elementTarget.id = getTimestamp()
    }
  }

  change (event) {
    let value = event.target.value

    // Extract the value from the SlimSelect instance when available in order to get
    // all the selected values.
    if (event.target.slim) {
      value = event.target.slim.selected()
    }

    this.performRequest(this.queryKey(event), value)
  }

  performRequest (key, value) {
    const params = {
      [key]: value,
      target_id: this.targetId()
    }

    // POST request is needed to send an array of values. With a GET request the multiple
    // values are sent as a serialized array string, instead of an actual array.
    if (this.methodValue === 'post') {
      post(this.urlValue, { body: params, responseKind: 'turbo-stream' })
    } else {
      get(this.urlValue, { query: params, responseKind: 'turbo-stream' })
    }
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
