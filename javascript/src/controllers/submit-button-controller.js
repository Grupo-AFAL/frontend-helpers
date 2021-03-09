import { Controller } from 'stimulus'

export default class SubmitButtonController extends Controller {
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
