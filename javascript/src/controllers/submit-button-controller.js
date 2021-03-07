import { Controller } from 'stimulus'

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
    button.classList.add('is-loading')
    button.setAttribute('disabled', '')
  }

  enableButton (button) {
    button.classList.remove('is-loading')
    button.removeAttribute('disabled')
  }
}
