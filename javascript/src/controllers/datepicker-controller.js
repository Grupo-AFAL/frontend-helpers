import { Controller } from '@hotwired/stimulus'

/**
 * Datepicker Controller
 * Uses the flatpickr library to render a Date Picker
 * https://flatpickr.js.org/
 *
 * How to use:
 *
 * <input type="text" data-controller="datepicker">
 *
 * Default language: Spanish
 */
export class DatepickerController extends Controller {
  static values = {
    enableTime: { type: Boolean, default: false },
    noCalendar: { type: Boolean, default: false },
    enableSeconds: { type: Boolean, default: false },
    locale: { type: String, default: 'es' },
    defaultDate: String,
    minDate: String,
    minTime: String,
    maxTime: String,
    altInputClass: String
  }

  async connect () {
    const { default: flatpickr } = await import('flatpickr')

    const input =
      this.element.nodeName === 'INPUT'
        ? this.element
        : this.element.querySelector('input')

    this.flatpickr = flatpickr(input, {
      altInput: true,
      altFormat: this.altFormat(),
      dateFormat: this.dateFormat(),
      enableTime: this.enableTimeValue,
      noCalendar: this.noCalendarValue,
      enableSeconds: this.enableSecondsValue,
      locale: await this.setLocale(this.localeValue),
      defaultDate: this.defaultDateValue,
      minDate: this.minDateValue,
      minTime: this.minTimeValue,
      maxTime: this.maxTimeValue,
      altInputClass: this.altInputClassValue
    })
  }

  async setLocale (countryCode) {
    if (countryCode === 'en') {
      return 'default'
    } else {
      return (await import('flatpickr/dist/l10n/es.js')).default.es
    }
  }

  clear () {
    this.flatpickr.clear()
  }

  disconnect () {
    this.flatpickr.destroy()
  }

  altFormat () {
    let format = ''

    if (this.noCalendarValue || this.enableTimeValue) {
      if (this.enableSecondsValue) {
        format = this.time_24hr ? 'H:i:S' : 'h:i:S K'
      } else {
        format = this.time_24hr ? 'H:i' : 'h:i K'
      }
    }

    if (!this.noCalendarValue) {
      format = `F j, Y ${format}`.trim()
    }

    return format
  }

  dateFormat () {
    let format = 'Y-m-d'

    if (this.noCalendarValue || this.enableTimeValue) {
      format = `${format} H:i:S`
    }

    return format
  }

  getCustomDate ({ params: { dateBy, add } }) {
    const currentDate = new Date(this.flatpickr.input.value.replace('-', '/'))

    switch (dateBy) {
      case 'day':
        currentDate.setDate(
          add
            ? this.addDates(currentDate.getDate(), 1)
            : this.subtractDates(currentDate.getDate(), 1)
        )
        break
      case 'month':
        currentDate.setMonth(
          add
            ? this.addDates(currentDate.getMonth(), 1)
            : this.subtractDates(currentDate.getMonth(), 1)
        )
        break
      case 'year':
        currentDate.setFullYear(
          add
            ? this.addDates(currentDate.getFullYear(), 1)
            : this.subtractDates(currentDate.getFullYear(), 1)
        )
        break
      default:
        return
    }

    this.flatpickr.setDate(currentDate)
  }

  addDates (a, b) {
    return a + b
  }

  subtractDates (a, b) {
    return a - b
  }
}
