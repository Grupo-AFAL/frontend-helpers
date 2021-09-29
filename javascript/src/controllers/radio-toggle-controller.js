import { Controller } from 'stimulus'

/**
 * Shows different elements based on the value of a radio button
 *
 * <div data-controller="toggle-radio" data-toggle-radio-current-value="one">
 *   <input type="radio" data-action="toggle-radio#change" value="one">
 *   <input type="radio" data-action="toggle-radio#change" value="two">
 *
 *   <div data-radio-toggle-target="element" data-radio-toggle-value="one">
 *     <h1 class="title is-1">One</h1>
 *   </div>
 *
 *   <div data-radio-toggle-target="element" data-radio-toggle-value="two">
 *     <h1 class="title is-1">Two</h1>
 *   </div>
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
      if (element.dataset.radioToggleValue === value) {
        element.classList.remove('is-hidden')
      } else {
        element.classList.add('is-hidden')
      }
    })
  }
}
