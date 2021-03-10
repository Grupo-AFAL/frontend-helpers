import { Controller } from 'stimulus'

/**
 * SubmitButton Controller
 * Displays a loading button state when a form submission is started
 * It relies on @hotwired/turbo events to display and hide the loading state
 *
 * https://bulma.io/documentation/elements/button/#states
 */
export class SubmitButtonController extends Controller {
  connect () {
    this.element.addEventListener('turbo:submit-start', e => {
      this.disableButton(e.detail.formSubmission.submitter)
    })

    this.element.addEventListener('turbo:submit-end', e => {
      this.enableButton(e.detail.formSubmission.submitter)
    })
  }

  disableButton (button) {
    if (!button) return

    button.classList.add('is-loading')
    button.setAttribute('disabled', '')
  }

  enableButton (button) {
    if (!button) return

    button.classList.remove('is-loading')
    button.removeAttribute('disabled')
  }
}
