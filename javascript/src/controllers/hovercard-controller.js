import { Controller } from 'stimulus'
import { stringToDOMNode } from '../utils/domHelpers'

export class HovercardController extends Controller {
  static values = { url: String }

  connect () {
    this.element.addEventListener('mouseenter', this.show.bind(this))
    this.element.addEventListener('mouseleave', this.hide.bind(this))
  }

  show () {
    if (this.cardNode) {
      this.cardNode.classList.remove('is-hidden')
    } else {
      fetch(this.urlValue)
        .then(r => r.text())
        .then(html => this.insertHoverCard(html))
    }
  }

  insertHoverCard (html) {
    const node = stringToDOMNode(html).querySelector('.hovercard')
    node.setAttribute('id', this.urlValue)
    document.body.appendChild(node)

    const { hoverCardTop, hoverCardLeft } = this.hoverCardDimensions(node)

    node.setAttribute(
      'style',
      `top:${hoverCardTop}px; left:${hoverCardLeft}px; position:fixed`
    )
  }

  elementDimensions () {
    const rect = this.element.getBoundingClientRect()
    const top = rect.top + window.pageYOffset
    const left = rect.left + window.pageXOffset
    const width = rect.width
    return { top, left, width }
  }

  hoverCardDimensions (node) {
    const { top, left, width } = this.elementDimensions()
    const hoverRect = node.getBoundingClientRect()
    const hoverCardTop = top - hoverRect.height - 10
    const hoverCardLeft = left - hoverRect.width / 2 + width / 2
    return { hoverCardTop, hoverCardLeft }
  }

  hide () {
    this.cardNode = document.getElementById(this.urlValue)
    if (this.cardNode) {
      this.cardNode.classList.add('is-hidden')
    }
  }

  disconnect () {
    if (this.cardNode) {
      this.cardNode.remove()
    }
  }
}
