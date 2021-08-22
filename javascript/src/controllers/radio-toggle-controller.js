import { Controller } from 'stimulus'

/**
 * Toggles ON and OFF different elements based on the state of a checkbox
 *
 * <div data-controller="toggle" data-toggle-checked-value="true">
 *   <input data-action="toggle#change" type="checkbox">
 *   <div data-toggle-target="off">
 *     Off content
 *   </div>
 *  <div data-toggle-target="on">
 *    On content
 *  </div>
 * </div>
 */
export class RadioToggleController extends Controller {
  static targets = ['element']
  static values = { current: String }

  connect () {
    this.toggleTargets(this.currentValue)
  }

  change (event) {
    this.toggleTargets(event.target.value)
  }

  toggleTargets (value) {
    this.elementTargets.forEach(element => {
      if (element.dataset.radioToggleValue == value) {
        element.classList.remove('is-hidden')
      } else {
        element.classList.add('is-hidden')
      }
    })
  }
}
