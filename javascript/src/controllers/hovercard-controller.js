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
    if (this.cardNode) {
      this.cardNode.classList.remove('is-hidden')
    } else {
      fetch(this.urlValue)
        .then(r => r.text())
        .then(html => this.insertHoverCard(html))
    }
  }

  insertHoverCard (html) {
    console.log('insertHoverCard')
    const node = stringToDOMNode(html).querySelector('.hovercard')
    const anode = document.getElementsByTagName('a')[0]
    const anode_width = anode.offsetWidth
    node.setAttribute('id', this.urlValue)
    document.body.appendChild(node)
    var svgNode = document.getElementById('svg')
    const {
      hoverCardTop,
      hoverCardLeft,
      isDown,
      isLeft,
      isRight
    } = this.hoverCardDimensions(node)
    if (isDown) {
      const nodeTop = node.offsetHeight * 2 + 24
      svgNode.setAttribute('height', String(nodeTop))
      svgNode.setAttribute('transform', 'rotate(180)')
    }
    if (isLeft) {
      svgNode.style.left = String(anode_width / 2 - 18) + 'px'
    }
    if (isRight) {
      const idealSpaceToRight = 15
      const differenceRight =
        this.calculateRightDistance(anode.offsetLeft) - anode_width
      var right_adjustment = 0
      if (differenceRight > idealSpaceToRight) {
        right_adjustment = differenceRight - idealSpaceToRight
      }
      const newSpaceRight = 210 - right_adjustment - anode_width / 2
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
    var left = rect.left + window.pageXOffset
    const width = rect.width

    return { top, left, width }
  }

  calculateRightDistance (positionLeft) {
    const window_width = window.innerWidth
    const diff = window_width - positionLeft
    return diff
  }

  hoverCardDimensions (node) {
    const { top, left, width } = this.elementDimensions()
    const hoverRect = node.getBoundingClientRect()
    var isRight = false
    var hoverCardTop = top - hoverRect.height - 10
    var isDown = false
    var isLeft = false
    if (hoverCardTop < 0) {
      hoverCardTop = top + 40
      isDown = true
    }
    var hoverCardLeft = left - hoverRect.width / 2 + width / 2
    //check if hovercar is near of the left side
    if (hoverCardLeft < 0) {
      hoverCardLeft = 8
      isLeft = true
    }
    //ideal difference to the right
    const idealDifference = 235
    const diff = this.calculateRightDistance(hoverCardLeft) //window_width - hoverCardLeft
    if (diff < idealDifference) {
      hoverCardLeft += diff - idealDifference
      isRight = true
    }
    return { hoverCardTop, hoverCardLeft, isDown, isLeft, isRight }
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
