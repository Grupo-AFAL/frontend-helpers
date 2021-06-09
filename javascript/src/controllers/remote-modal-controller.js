import { Controller } from 'stimulus'
import camelCase from 'lodash.camelcase'
import { autoFocusInput } from '../utils/form'

/**
 * Loads remote content into a modal window and handles form submission
 *
 * It expects the following structure:
 *
 * <section data-controller="remote-modal">
 *   <a href="http://localhost/customers/new" data-action="remote-modal#open">
 *    Add Customer
 *   </a>
 *   <div id="modal-template" class="modal">
 *     <button data-action="remote-modal#submit">Save</button>
 *     <a data-action="remote-modal#close">Cancel</a>
 *   </div>
 * </section>
 */
export class RemoteModalController extends Controller {
  static targets = ['template', 'background', 'wrapper', 'content', 'closeBtn']

  async connect () {
    const { useTargetMutation } = await import('stimulus-use')
    useTargetMutation(this)

    this.isWide = true

    this.backgroundTarget.addEventListener('click', this._closeModal)

    if (this.hasCloseBtnTarget) {
      this.closeBtnTarget.addEventListener('click', this._closeModal)
    }

    document.addEventListener('openModal', e => {
      this.setOptions(e.detail.options)
      this.openModal(e.detail.content)
    })
  }

  disconnect () {
    this.backgroundTarget.removeEventListener('click', this._closeModal)

    if (this.hasCloseBtnTarget) {
      this.closeBtnTarget.removeEventListener('click', this._closeModal)
    }
  }

  backgroundTargetAdded () {
    console.log('added!!')
    this.backgroundTarget.addEventListener('click', this._closeModal)
  }

  backgroundTargetRemoved () {
    console.log('removed!!')
    this.backgroundTarget.addEventListener('click', this._closeModal)
  }

  backgroundTargetChanged () {
    console.log('changed!!')
    this.backgroundTarget.addEventListener('click', this._closeModal)
  }

  templateTargetAdded () {
    console.log('t added!!')
    this.backgroundTarget.addEventListener('click', this._closeModal)
  }

  templateTargetRemoved () {
    console.log('t removed!!')
    this.backgroundTarget.addEventListener('click', this._closeModal)
  }

  templateTargetChanged () {
    console.log('t changed!!')
    this.backgroundTarget.addEventListener('click', this._closeModal)
  }

  openModal (content) {
    this.isWide
      ? this.wrapperTarget.classList.add('wide')
      : this.wrapperTarget.classList.remove('wide')

    this.wrapperTarget.classList.add(this.wrapperClass)

    this.templateTarget.classList.add('is-active')
    this.contentTarget.innerHTML = content

    autoFocusInput(this.contentTarget)
  }

  setOptions (options) {
    const keys = Object.keys(options)
    keys.forEach((key, _i) => {
      this[key] = options[key]
    })
  }

  _closeModal = () => {
    this.templateTarget.classList.remove('is-active')
    this.wrapperTarget.classList.remove(this.wrapperClass)
    this.contentTarget.innerHTML = ''
  }

  _buildURL = (path, redirectTo = null) => {
    const url = new URL(path, window.location.origin)
    url.searchParams.set('layout', 'false')

    if (redirectTo) {
      url.searchParams.set('redirect_to', redirectTo)
    }

    return url.toString()
  }

  _extractResponseBodyAndTitle = html => {
    const element = document.createElement('html')
    element.innerHTML = html

    return {
      body: element.querySelector('body').innerHTML,
      title: element.querySelector('title').text
    }
  }

  _replaceBodyAndURL = (html, url) => {
    const { body, title } = this._extractResponseBodyAndTitle(html)

    document.body.innerHTML = body
    history.pushState({}, title, url)
  }

  /**
   * Public Methods
   */
  open = event => {
    event.preventDefault()
    const target = event.currentTarget

    this.wrapperClass = target.getAttribute('data-wrapper-class')
    this.isWide = Boolean(target.getAttribute('data-wide'))
    this.redirectTo = target.getAttribute('data-redirect-to')
    this.skipRender = Boolean(target.getAttribute('data-skip-render'))
    this.extraProps = JSON.parse(target.getAttribute('data-extra-props'))

    fetch(this._buildURL(target.href))
      .then(response => response.text())
      .then(body => this.openModal(body))
  }

  close = event => {
    event.preventDefault()
    this._closeModal()
  }

  /**
   * submit
   *
   * This action is called when a form within a modal is submitted. There
   * are 2 scenarios we need to handle:
   *
   * 1. When Form is submitted successfully, the server redirects to a new page.
   * 2. When Form has an error, the server returns the form with the errors.
   *
   * On a successful scenario we get a full HTML page and we then proceed to extract
   * the <body> tag from the page and replace the existing body tag.
   *
   * On a error scenario we just replace the modal contents with the response, since we
   * are already only getting the contents inside the modal.
   */
  submit = event => {
    event.preventDefault()
    event.target.classList.add('is-loading')
    event.target.setAttribute('disabled', '')

    const form = event.target.closest('form')
    const formURL = form.getAttribute('action')
    const enableTurbo = event.target.dataset.turbo

    const url = this._buildURL(formURL, this.redirectTo)
    const options = {
      method: 'POST',
      mode: 'same-origin',
      redirect: 'follow',
      credentials: 'include',
      body: new FormData(form)
    }

    if (enableTurbo) {
      options.headers = {
        Accept: 'text/html; turbo-stream, text/html, application/xhtml+xml'
      }
    }

    let redirected = false
    let redirectURL = null
    const redirectData = this.extraProps || {}

    fetch(url, options)
      .then(response => {
        redirected = response.redirected
        redirectURL = response.url

        const url = new URL(response.url)
        url.searchParams.forEach((value, key) => {
          redirectData[camelCase(key)] = value
        })

        return response.text()
      })
      .then(responseText => {
        if (redirected) {
          const event = new CustomEvent('modalSuccess', {
            detail: redirectData
          })
          document.dispatchEvent(event)

          if (this.skipRender) {
            this._closeModal()
          } else {
            this._replaceBodyAndURL(responseText, redirectURL)
          }
        } else {
          this.openModal(responseText)
        }
      })
  }
}
