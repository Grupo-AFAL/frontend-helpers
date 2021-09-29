import { Controller } from 'stimulus'
import GoogleMapsLoader from '../utils/google-maps-loader'

export class AutocompleteAddressController extends Controller {
  static values = { apiKey: String }
  static targets = [
    'input',
    'street',
    'streetNumber',
    'neighbourhood',
    'city',
    'state',
    'country',
    'postalCode',
    'latitude',
    'longitude'
  ]

  async connect () {
    try {
      this.googleMaps = await GoogleMapsLoader({
        libraries: ['places'],
        language: 'es',
        key: this.apiKeyValue || window.GOOGLE_MAPS_API_KEY
      })
      this.initializeAddressListener()
    } catch (error) {
      console.error(error)
    }
  }

  initializeAddressListener () {
    this.autocomplete = new this.googleMaps.places.Autocomplete(
      this.inputTarget,
      {}
    )

    this.autocomplete.addListener(
      'place_changed',
      this.fillInAddress.bind(this)
    )
  }

  fillInAddress () {
    const place = this.autocomplete.getPlace()

    for (const component of place.address_components) {
      const componentType = component.types[0]

      switch (componentType) {
        case 'street_number':
          this.streetNumberTarget.value = component.short_name
          break
        case 'route':
          this.streetTarget.value = component.long_name
          break
        case 'sublocality_level_1':
          this.neighbourhoodTarget.value = component.short_name
          break
        case 'locality':
          this.cityTarget.value = component.short_name
          break
        case 'administrative_area_level_1':
          this.stateTarget.value = component.short_name
          break
        case 'country':
          this.countryTarget.value = component.long_name
          break
        case 'postal_code':
          this.postalCodeTarget.value = component.short_name
          break
      }

      this.latitudeTarget.value = place.geometry.location.lat()
      this.longitudeTarget.value = place.geometry.location.lng()
    }
  }
}
