import { Controller } from 'stimulus'
import { toBool } from '../utils/formatters'

/**
 * Datepicker Controller
 * Uses the flatpickr library to render a Date Picker
 * https://flatpickr.js.org/
 *
 * How to use:
 *
 * <input type="text" data-controller="datepicker">
 */
export class DatepickerController extends Controller {
  async connect () {
    const { default: flatpickr } = await import('flatpickr')

    const enableTime = toBool(this.data.get('enableTime'))
    const noCalendar = toBool(this.data.get('noCalendar'))

    let altFormat
    let dateFormat

    if (noCalendar) {
      altFormat = 'h:i K'
      dateFormat = 'Y-m-d H:i'
    } else {
      altFormat = enableTime ? 'F j, Y h:i K' : 'F j, Y'
      dateFormat = enableTime ? 'Y-m-d H:i' : 'Y-m-d'
    }

    const input =
      this.element.nodeName === 'INPUT'
        ? this.element
        : this.element.querySelector('input')

    this.flatpickr = flatpickr(input, {
      altFormat,
      dateFormat,
      enableTime,
      noCalendar
    })
  }

  clear () {
    this.flatpickr.clear()
  }

  disconnect () {
    this.flatpickr.destroy()
  }
}
