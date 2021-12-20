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
  static values = {
    size: Number,
    fieldsSelector: String,
    removeDuplicates: { type: Boolean, default: false }
  }

  connect () {
    if (this.isAtMaximumSize()) {
      this.buttonTarget.setAttribute('disabled', true)
    }
  }

  addFields (e) {
    e.preventDefault()
    if (this.isAtMaximumSize()) return false

    this.sizeValue += 1

    const template = this.removeDuplicatesValue
      ? this.templateFragmentWithoutDuplicates()
      : this.templateFragment()

    const positionInput = template.querySelector('[data-position]')
    if (positionInput) positionInput.value = this.sizeValue
    this.containerTarget.appendChild(template)

    if (this.isAtMaximumSize()) {
      this.buttonTarget.setAttribute('disabled', true)
    }
  }

  removeFields (e) {
    e.preventDefault()
    this.sizeValue -= 1

    const fieldsContainer = e.target.closest(this.fieldsSelectorValue)
    fieldsContainer.style.display = 'none'
    removeNonHiddenFormElements(fieldsContainer)
    fieldsContainer.querySelector('.destroy-flag').value = true

    if (this.hasButtonTarget && this.buttonTarget.hasAttribute('disabled')) {
      this.buttonTarget.removeAttribute('disabled')
    }
  }

  moveUp (e) {
    e.preventDefault()

    const fieldsContainer1 = e.target.closest(this.fieldsSelectorValue)
    const fieldsContainer2 = previousSibling(
      fieldsContainer1,
      this.fieldsSelectorValue
    )

    this.swapElements(fieldsContainer1, fieldsContainer2)
    this.resetPositionValues()
  }

  moveDown (e) {
    e.preventDefault()

    const fieldsContainer1 = e.target.closest(this.fieldsSelectorValue)
    const fieldsContainer2 = nextSibling(
      fieldsContainer1,
      this.fieldsSelectorValue
    )

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
      .querySelectorAll(this.fieldsSelectorValue)
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
      this.element.querySelectorAll(`${this.fieldsSelectorValue} select`)
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

  // When removeDuplicatesValue is disabled user can potentially add as
  // unlimited number of dynamic fields
  isAtMaximumSize () {
    return (
      this.removeDuplicatesValue &&
      this.dropdownOptionsSize() === this.sizeValue
    )
  }
}
