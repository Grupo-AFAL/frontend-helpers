import { Controller } from 'stimulus'
import { stringToDOMNode } from '../utils/domHelpers'

/*
  Hovercard controller:
    It generates a hovercard component to show some content
    obtained via a fetch request.
*/

export class HovercardController extends Controller {
  static values = { url: String }

  connect () {
    this.element.addEventListener('mouseenter', this.show.bind(this))
    this.element.addEventListener('mouseleave', this.hide.bind(this))
  }

  show () {
    if (!this.cardNode) {
      fetch(this.urlValue)
        .then(r => r.text())
        .then(html => this.insertHoverCard(html))
    }
  }

  insertHoverCard (html) {
    const node = stringToDOMNode(html).querySelector('.hovercard')
    node.setAttribute('id', this.urlValue)
    document.body.appendChild(node)
    const aNodeWidth = this.element.offsetWidth
    const aNodeLeftDistance = this.element.getBoundingClientRect().left
    // get position on the top of the hovercard
    const nodeTop = node.offsetHeight * 2 + 24
    // ideal space to the right screen side in pixeles
    const idealSpaceToRight = 15
    // Real space to the right side of the anchor
    const differenceRight =
      this.calculateRightDistance(this.element.offsetLeft) - aNodeWidth
    // initial right adjust
    let rightAdjustment = 0
    const hovercardWidth = 210
    const svgNode = document.querySelector('svg.svg-hover-card')
    const {
      hoverCardTop,
      hoverCardLeft,
      isDown,
      isLeft,
      isRight
    } = this.hoverCardDimensions(node)
    // adjust svg tag down
    if (isDown) {
      svgNode.setAttribute('height', String(nodeTop))
      svgNode.setAttribute('transform', 'rotate(180)')
    }
    // adjust svg tag to the left
    if (isLeft) {
      svgNode.style.left = String(aNodeLeftDistance + aNodeWidth / 3) + 'px'
    }
    // adjust svg tag to the right
    if (isRight) {
      if (differenceRight > idealSpaceToRight) {
        rightAdjustment = differenceRight - idealSpaceToRight
      }
      const newSpaceRight = hovercardWidth - rightAdjustment - aNodeWidth / 2
      svgNode.style.left = String(newSpaceRight) + 'px'
    }
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

  calculateRightDistance (positionLeft) {
    const windowWidth = window.innerWidth
    const diff = windowWidth - positionLeft
    return diff
  }

  hoverCardDimensions (node) {
    const { top, left, width } = this.elementDimensions()
    const hoverRect = node.getBoundingClientRect()
    // ideal difference to the right screen side
    const idealDifference = 235
    // adjust top of the hovercard
    const topAdjust = 40
    let isRight = false
    let hoverCardTop = top - hoverRect.height - 10
    let isDown = false
    let isLeft = false
    let hoverCardLeft = left - hoverRect.width / 2 + width / 2
    // check is the hovercar is near to the top
    if (hoverCardTop < 0) {
      hoverCardTop = top + topAdjust
      isDown = true
    }
    // check if hovercar is less than 8 pixeles near of the lef side
    if (hoverCardLeft < 8) {
      hoverCardLeft = 8
      isLeft = true
    }
    // check if hovercar is near of the right side
    const diff = this.calculateRightDistance(hoverCardLeft)
    if (diff < idealDifference) {
      hoverCardLeft += diff - idealDifference
      isRight = true
    }
    return { hoverCardTop, hoverCardLeft, isDown, isLeft, isRight }
  }

  hide () {
    this.cardNode = document.getElementById(this.urlValue)
    if (this.cardNode) {
      this.cardNode.remove()
      this.cardNode = null
    }
  }

  disconnect () {
    if (this.cardNode) {
      this.cardNode.remove()
    }
  }
}
