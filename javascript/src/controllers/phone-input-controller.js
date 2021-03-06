import { Controller } from 'stimulus'
import phone from 'phone'

export default class PhoneInputController extends Controller {
  connect () {
    this.element.addEventListener('blur', this.replaceWithFormattedNumber)
    this.replaceWithFormattedNumber()
  }

  replaceWithFormattedNumber = () => {
    this.element.value = this.formatPhoneNumber(this.element.value)
  }

  formatPhoneNumber (originalValue) {
    const supportedCountries = {
      USA: '+1',
      MEX: '+52',
      DEU: '+49'
    }

    let [normalizedPhone, countryShortCode] = phone(originalValue)
    const countryCode = supportedCountries[countryShortCode]

    if (normalizedPhone && countryCode) {
      normalizedPhone = normalizedPhone.replace(countryCode, '')
    }

    if (normalizedPhone) {
      var match = normalizedPhone.match(/^(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = countryCode ? `${countryCode} ` : ''
        return [intlCode, '(', match[1], ') ', match[2], '-', match[3]].join('')
      }
    }

    return originalValue
  }

  disconnect () {
    this.element.removeEventListener('blur', this.replaceWithFormattedNumber)
  }
}
