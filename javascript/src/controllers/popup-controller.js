import { Controller } from 'stimulus'
import { useClickOutside } from 'stimulus-use'

const POPUP_MARGIN = 12

export class PopupController extends Controller {
  static targets = ['container', 'button', 'openedInput']
  static values = { opened: Boolean }

  connect () {
    useClickOutside(this)
    this.opened = this.openedValue
    this.positionPopup()
  }

  open () {
    this.containerTarget.classList.remove('is-hidden')
    this.containerTarget.classList.add('popin')
    this.buttonTarget.classList.add('is-selected')
    this.openedInputTarget.value = true
    this.positionPopup()
    this.updateHistory(true)
    this.opened = true
  }

  close () {
    this.containerTarget.classList.add('is-hidden')
    this.containerTarget.classList.remove('popin')
    this.buttonTarget.classList.remove('is-selected')
    this.openedInputTarget.value = false
    this.updateHistory(false)
    this.opened = false
  }

  toggle () {
    if (this.opened) {
      this.close()
    } else {
      this.open()
    }
  }

  clickOutside () {
    this.close()
  }

  positionPopup () {
    const { height } = this.buttonTarget.getBoundingClientRect()
    this.containerTarget.style.left = '0px'
    this.containerTarget.style.top = `${height + POPUP_MARGIN}px`
  }

  updateHistory (opened = false) {
    const url = new URL(window.location)

    if (opened) {
      url.searchParams.set('opened', 'true')
    } else {
      url.searchParams.delete('opened')
    }

    window.history.pushState({}, '', url)
  }
}
