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
    url: String
  }

  connect () {
    this.isActive = false
    this.contentLoaded = false

    this.element.addEventListener('mouseenter', this.show.bind(this))
    this.element.addEventListener('mouseleave', this.hide.bind(this))

    this.cardNode = this.buildCardNode(null)
    this.element.appendChild(this.cardNode)

    this.popperInstance = createPopper(this.element, this.cardNode, {
      placement: 'top'
    })
  }

  show () {
    this.isActive = true

    if (this.contentLoaded) {
      return this.showAndUpdateHovercardPosition()
    }

    if (this.urlValue) {
      fetch(this.urlValue)
        .then(r => r.text())
        .then(html => this.insertHoverCard(html))
    } else if (this.hasTemplateTarget) {
      this.insertHoverCard(this.templateTarget.innerHTML)
    }
  }

  insertHoverCard (html = null) {
    if (!this.isActive) return
    this.contentLoaded = true

    this.cardNode.querySelector(`.${CONTENT_CLASS_NAME}`).innerHTML = html
    this.showAndUpdateHovercardPosition()
  }

  showAndUpdateHovercardPosition () {
    this.cardNode.classList.remove('is-hidden')

    // Enable the event listeners
    this.popperInstance.setOptions(options => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true }
      ]
    }))

    this.popperInstance.update()
  }

  buildCardNode (html) {
    return stringToDOMNode(
      `<div class="hovercard card is-hidden">
        <div class="card-content">
          <div class="${CONTENT_CLASS_NAME}">
            ${html || ''}
          </div>
        </div>
        <svg width="20" height="8" viewBox="0 0 20 8" fill="none" class="svg-hover-card">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8C13 8 15.9999 0 20 0H0C3.9749 0 7 8 10 8Z" fill="white"></path>
        </svg>
      </div`
    ).firstElementChild
  }

  hide () {
    this.isActive = false
    this.cardNode.classList.add('is-hidden')

    // Disable the event listeners
    this.popperInstance.setOptions(options => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false }
      ]
    }))
  }

  disconnect () {
    this.cardNode.remove()
    this.cardNode = null
  }
}
