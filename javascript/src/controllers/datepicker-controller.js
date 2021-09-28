import { Controller } from '@hotwired/stimulus'
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

    this.enableTime = toBool(this.data.get('enableTime'))
    this.noCalendar = toBool(this.data.get('noCalendar'))
    this.enableSeconds = toBool(this.data.get('enableSeconds'))
    this.time_24hr = toBool(this.data.get('time-24hr'))

    const input =
      this.element.nodeName === 'INPUT'
        ? this.element
        : this.element.querySelector('input')

    this.flatpickr = flatpickr(input, {
      altInput: true,
      altFormat: this.altFormat(),
      dateFormat: this.dateFormat(),
      enableTime: this.enableTime,
      noCalendar: this.noCalendar,
      enableSeconds: this.enableSeconds,
      time_24hr: this.time_24hr,
      defaultDate: this.data.get('defaultDate'),
      minDate: this.data.get('minDate'),
      minTime: this.data.get('minTime'),
      maxTime: this.data.get('maxTime')
    })
  }

  clear () {
    this.flatpickr.clear()
  }

  disconnect () {
    this.flatpickr.destroy()
  }

  altFormat () {
    let format = ''

    if (this.noCalendar || this.enableTime) {
      if (this.enableSeconds) {
        format = this.time_24hr ? 'H:i:S' : 'h:i:S K'
      } else {
        format = this.time_24hr ? 'H:i' : 'h:i K'
      }
    }

    if (!this.noCalendar) {
      format = `F j, Y ${format}`.trim()
    }

    return format
  }

  dateFormat () {
    let format = 'Y-m-d'

    if (this.noCalendar || this.enableTime) {
      format = `${format} H:i:S`
    }

    return format
  }
}
