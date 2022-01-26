import { Controller } from '@hotwired/stimulus'
import { stringToDOMNode } from '../utils/domHelpers'

const SPACE_BETWEEN_NODE_AND_ELEMENT = 10
const SPACE_TO_RIGHT_EDGE = 30
const MIN_LEFT_POSITION = 8

const CONTAINER_SELECTOR = '.hovercard'
const SVG_SELECTOR = 'svg.svg-hover-card'

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

    this.element.addEventListener('mouseenter', this.show.bind(this))
    this.element.addEventListener('mouseleave', this.hide.bind(this))
    document.addEventListener('scroll', () => this.removeCardNode())
    window.addEventListener('resize', () => this.removeCardNode())
  }

  show() {
    this.isActive = true

    if (this.cardNode) { return this.cardNode.classList.remove('is-hidden') }

    if (this.urlValue) {
      fetch(this.urlValue)
        .then(r => r.text())
        .then(html => this.insertHoverCard(html))
    } else if (this.hasTemplateTarget) {
      this.insertHoverCard(this.templateTarget.innerHTML)
    }
  }

  insertHoverCard (html) {
    if (!this.isActive) return

    this.cardNode = stringToDOMNode(this.buildHtml(html)).querySelector(
      CONTAINER_SELECTOR
    )
    document.body.appendChild(this.cardNode)

    this.positionHovercard()
  }

  buildHtml (html) {
    return `<div class="hovercard card">
              <div class="card-content">
                <div class="content">
                  ${html}
                </div>
              </div>
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" class="svg-hover-card">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8C13 8 15.9999 0 20 0H0C3.9749 0 7 8 10 8Z" fill="white"></path>
              </svg>
            </div`
  }

  positionHovercard () {
    const svgNode = this.cardNode.querySelector(SVG_SELECTOR)
    const {
      hoverCardTop,
      hoverCardLeft,
      isDown,
      isLeft,
      isRight
    } = this.hoverCardDimensions()

    if (isDown) {
      svgNode.style.bottom = this.cardNode.offsetHeight
      svgNode.setAttribute('transform', 'rotate(180)')
    }

    const { left, width } = this.element.getBoundingClientRect()
    const elementPadding = this.calculateInnerWidth(this.element)

    if (isLeft) {
      svgNode.style.left = `${left + (width - elementPadding) / 2}px`
    } else if (isRight) {
      svgNode.style.left = `${left -
        hoverCardLeft +
        (width - elementPadding) / 2}`
    }

    this.cardNode.setAttribute(
      'style',
      `top:${hoverCardTop}px; left:${hoverCardLeft}px; position:fixed`
    )
  }

  calculateInnerWidth (element) {
    return (
      parseFloat(
        window
          .getComputedStyle(element, null)
          .getPropertyValue('padding-right')
          .replace('px', '')
      ) +
      parseFloat(
        window
          .getComputedStyle(element, null)
          .getPropertyValue('padding-left')
          .replace('px', '')
      )
    )
  }

  hoverCardDimensions () {
    const { top, left, width, height } = this.element.getBoundingClientRect()
    const {
      height: nodeHeight,
      width: nodeWidth
    } = this.cardNode.getBoundingClientRect()

    let isRight = false
    let isDown = false
    let isLeft = false

    let hoverCardTop = top - nodeHeight - SPACE_BETWEEN_NODE_AND_ELEMENT
    let hoverCardLeft = left - nodeWidth / 2 + width / 2

    // check is the hovercard is near the top
    if (hoverCardTop < 0) {
      hoverCardTop = top + height + SPACE_BETWEEN_NODE_AND_ELEMENT
      isDown = true
    }

    // check if hovercard is less than the minimun left position to the left
    if (hoverCardLeft < MIN_LEFT_POSITION) {
      hoverCardLeft = MIN_LEFT_POSITION
      isLeft = true
    }

    // check if hovercard is near the right side
    const minSpaceRequired = nodeWidth + SPACE_TO_RIGHT_EDGE
    const spaceAvailable = window.innerWidth - hoverCardLeft

    if (spaceAvailable < minSpaceRequired) {
      hoverCardLeft += spaceAvailable - minSpaceRequired
      isRight = true
    }

    return {
      hoverCardTop,
      hoverCardLeft,
      isDown,
      isLeft,
      isRight
    }
  }

  hide () {
    this.isActive = false

    if (this.cardNode) {
      this.cardNode.classList.add('is-hidden')
    }
  }

  disconnect () {
    this.removeCardNode()
  }

  removeCardNode () {
    if (this.cardNode) {
      this.cardNode.remove()
      this.cardNode = null
    }
  }
}
