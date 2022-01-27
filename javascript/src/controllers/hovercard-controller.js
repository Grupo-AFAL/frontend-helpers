import { Controller } from '@hotwired/stimulus'
import { createPopper } from '@popperjs/core'
import { stringToDOMNode } from '../utils/domHelpers'

const CONTENT_CLASS_NAME = 'content'

/*
  Hovercard controller:
    It generates a hovercard component to show some content
    obtained via a fetch request.
*/
export class HovercardController extends Controller {
  static targets = ['template']
  static values = {
    url: String,
    placement: { type: String, default: 'auto' }
  }

  connect () {
    this.isActive = false
    this.contentLoaded = false

    this.element.addEventListener('mouseenter', this.show.bind(this))
    this.element.addEventListener('mouseleave', this.hide.bind(this))

    this.cardNode = this.element.appendChild(this.buildEmptyNode())

    this.popperInstance = createPopper(this.element, this.cardNode, {
      placement: this.placementValue,
      modifiers: [{ name: 'eventListeners', enabled: false }]
    })
  }

  show () {
    this.isActive = true

    if (this.contentLoaded) {
      return this.showAndUpdatePosition()
    }

    if (this.urlValue) {
      fetch(this.urlValue)
        .then(r => r.text())
        .then(html => this.insertContent(html))
    } else if (this.hasTemplateTarget) {
      this.insertContent(this.templateTarget.innerHTML)
    }
  }

  insertContent (html) {
    if (!this.isActive) return
    this.contentLoaded = true

    this.cardNode.querySelector(`.${CONTENT_CLASS_NAME}`).innerHTML = html
    this.showAndUpdatePosition()
  }

  showAndUpdatePosition () {
    this.cardNode.classList.remove('is-hidden')
    this.toggleEventListeners(true)
    this.popperInstance.update()
  }

  buildEmptyNode () {
    return stringToDOMNode(
      `<div class="hovercard card is-hidden">
        <div class="card-content">
          <div class="${CONTENT_CLASS_NAME}">
          </div>
        </div>
        <span data-popper-arrow class="arrow">
          <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8C13 8 15.9999 0 20 0H0C3.9749 0 7 8 10 8Z" fill="white"></path>
          </svg>
        </span>
      </div`
    ).firstElementChild
  }

  hide () {
    this.isActive = false
    this.cardNode.classList.add('is-hidden')
    this.toggleEventListeners(false)
  }

  disconnect () {
    this.popperInstance.destroy()
    this.cardNode.remove()
  }

  toggleEventListeners (value) {
    this.popperInstance.setOptions(options => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: value }
      ]
    }))
  }
}
