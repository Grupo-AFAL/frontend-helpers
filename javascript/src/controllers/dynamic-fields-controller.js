import { Controller } from '@hotwired/stimulus'
import { getTimestamp } from '../utils/time'
import {
  replaceInFragment,
  removeNonHiddenFormElements,
  previousSibling,
  nextSibling
} from '../utils/domHelpers'

export class DynamicFieldsController extends Controller {
  static targets = ['template', 'container', 'button']

  connect () {
    this.fieldsSelector = this.data.get('selector')
    this.removeDuplicates = this.data.get('removeDuplicates')
    if (this.isAtMaximumSize()) {
      this.buttonTarget.setAttribute('disabled', true)
    }
  }

  addFields (e) {
    e.preventDefault()
    if (this.isAtMaximumSize()) return false

    this.setSize(this.getSize() + 1)

    const template = this.removeDuplicates
      ? this.templateFragmentWithoutDuplicates()
      : this.templateFragment()

    const positionInput = template.querySelector('[data-position]')
    if (positionInput) positionInput.value = this.getSize()
    this.containerTarget.appendChild(template)

    if (this.isAtMaximumSize()) {
      this.buttonTarget.setAttribute('disabled', true)
    }
  }

  removeFields (e) {
    e.preventDefault()
    this.setSize(this.getSize() - 1)

    const fieldsContainer = e.target.closest(this.fieldsSelector)
    fieldsContainer.style.display = 'none'
    removeNonHiddenFormElements(fieldsContainer)
    fieldsContainer.querySelector('.destroy-flag').value = true

    if (this.hasButtonTarget && this.buttonTarget.hasAttribute('disabled')) {
      this.buttonTarget.removeAttribute('disabled')
    }
  }

  moveUp (e) {
    e.preventDefault()

    const fieldsContainer1 = e.target.closest(this.fieldsSelector)
    const fieldsContainer2 = previousSibling(
      fieldsContainer1,
      this.fieldsSelector
    )

    this.swapElements(fieldsContainer1, fieldsContainer2)
    this.resetPositionValues()
  }

  moveDown (e) {
    e.preventDefault()

    const fieldsContainer1 = e.target.closest(this.fieldsSelector)
    const fieldsContainer2 = nextSibling(fieldsContainer1, this.fieldsSelector)

    this.swapElements(fieldsContainer1, fieldsContainer2)
    this.resetPositionValues()
  }

  swapElements (elm1, elm2) {
    if (elm2 == null) return

    const parent = elm1.parentNode
    const next1 = elm1.nextElementSibling
    const next2 = elm2.nextElementSibling

    parent.insertBefore(elm2, next1)
    parent.insertBefore(elm1, next2)
  }

  resetPositionValues () {
    this.element
      .querySelectorAll(this.fieldsSelector)
      .forEach((fields, index) => {
        fields.querySelector('[data-position]').value = index + 1
      })
  }

  templateFragment () {
    return replaceInFragment(this.templateTarget, /new_record/g, getTimestamp())
  }

  templateFragmentWithoutDuplicates () {
    // Get currently selected values
    const selectedValues = Array.from(
      this.element.querySelectorAll(`${this.fieldsSelector} select`)
    ).map(node => node.value)

    // Remove already selected values
    const template = this.templateFragment()
    template.querySelectorAll('select option').forEach(option => {
      if (selectedValues.includes(option.value)) {
        option.remove()
      }
    })

    return template
  }

  dropdownOptionsSize () {
    return this.templateFragment().querySelectorAll('select option').length
  }

  // When removeDuplicates is disabled user can potentially add as
  // unlimited number of dynamic fields
  isAtMaximumSize () {
    return (
      this.removeDuplicates && this.dropdownOptionsSize() === this.getSize()
    )
  }

  getSize () {
    return parseInt(this.data.get('size'))
  }

  setSize (size) {
    this.data.set('size', size)
  }
}
