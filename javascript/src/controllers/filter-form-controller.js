import { Controller } from 'stimulus'
import { submitForm, queryParams } from '../utils/form'

export class FilterFormController extends Controller {
  static values = { textField: String }
  static targets = ['removeButton', 'filterCounter']

  submit () {
    submitForm(this.element, { responseKind: 'turbo-stream' })
    this.updateButtons()
  }

  // Toggle the remove filters button and display the number of active filters
  updateButtons () {
    const activeFilters = this.activeFilters()

    if (activeFilters.length > 0) {
      this.removeButtonTarget.classList.remove('is-hidden')
      this.filterCounterTarget.innerText = `(${activeFilters.length})`
    } else {
      this.removeButtonTarget.classList.add('is-hidden')
      this.filterCounterTarget.innerText = ''
    }
  }

  activeFilters () {
    const qParams = queryParams(this.element)

    // Don't consider the textField or the opened parameter active filters
    qParams.delete(`q[${this.textFieldValue}]`)
    qParams.delete('opened')

    const filterNames = [...qParams.entries()].map(entry => entry[0])

    // Return unique values
    return [...new Set(filterNames)]
  }
}
