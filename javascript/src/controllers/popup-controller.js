import { Controller } from '@hotwired/stimulus'
import { createPopper } from '@popperjs/core'
import useClickOutside from '../utils/use-click-outside'

export class PopupController extends Controller {
  static targets = ['container', 'button', 'openedInput']
  static values = { opened: Boolean }

  connect () {
    useClickOutside(this)
    this.opened = this.openedValue
    this.popperInstance = createPopper(this.buttonTarget, this.containerTarget, {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 16
          }
        }
      ]
    })
  }

  disconnect () {
    this.popperInstance.destroy()
  }

  open () {
    this.containerTarget.classList.remove('is-hidden')
    this.containerTarget.classList.add('popin')
    this.buttonTarget.classList.add('is-selected')
    this.openedInputTarget.value = true
    this.popperInstance.update()
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
