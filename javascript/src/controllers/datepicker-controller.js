import flatpickr from 'flatpickr'
import { Controller } from 'stimulus'

export class DatepickerController extends Controller {
  connect () {
    const enableTime = Boolean(this.data.get('enableTime'))
    const noCalendar = Boolean(this.data.get('noCalendar'))

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
      altInput: true,
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
