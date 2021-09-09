import {
  Controller
} from 'stimulus'
import {
  stringToDOMNode
} from '../utils/domHelpers'

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

    show () {
      this.isActive = true

      if (this.cardNode) {
        this.cardNode.classList.remove('is-hidden')
      } else {
        fetch(this.urlValue)
          .then(r => r.text())
          .then(html => this.insertHoverCard(html))
      }
    }

    insertHoverCard (html) {
      if (!this.isActive) return

      this.cardNode = stringToDOMNode(html).querySelector(CONTAINER_SELECTOR)
      document.body.appendChild(this.cardNode)

      this.positionHovercard()
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

      const {
        left,
        width
      } = this.element.getBoundingClientRect()
      const elementPadding = this.calculateWidthWithOutPadding(this.element)

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

    calculateWidthWithOutPadding (element) {
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
      const {
        top,
        left,
        width,
        height
      } = this.element.getBoundingClientRect()
      const {
        height: nodeHeight,
        width: nodeWidth
      } = this.cardNode.getBoundingClientRect()

      let isRight = false
      let isDown = false
      let isLeft = false

      let hoverCardTop = top - nodeHeight - SPACE_BETWEEN_NODE_AND_ELEMENT
      let hoverCardLeft = left - nodeWidth / 2 + width / 2

      // check is the hovercar is near the top
      if (hoverCardTop < 0) {
        hoverCardTop = top + height + SPACE_BETWEEN_NODE_AND_ELEMENT
        isDown = true
      }

      // check if hovercar is less than the minimun left position to the left
      if (hoverCardLeft < MIN_LEFT_POSITION) {
        hoverCardLeft = MIN_LEFT_POSITION
        isLeft = true
      }

      // check if hovercar is near the right side
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
