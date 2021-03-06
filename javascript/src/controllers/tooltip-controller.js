import { Controller } from 'stimulus'

export default class TooltipController extends Controller {
  static targets = ['subject']

  connect () {
    this.subjectTargets.forEach(target => {
      target.addEventListener('mouseenter', this.onMouseEnter)
      target.addEventListener('mouseleave', this.onMouseLeave)
    })
  }

  disconnect () {
    this.subjectTargets.forEach(target => {
      target.removeEventListener('mouseenter', this.onMouseEnter)
      target.removeEventListener('mouseleave', this.onMouseLeave)
    })
  }

  onMouseEnter (e) {
    const rect = e.target.getBoundingClientRect()
    const targetId = e.target.getAttribute('data-id')

    const top = rect.top + window.pageYOffset
    const left = rect.left + window.pageXOffset + 4.3

    const node = document.createElement('div')
    node.setAttribute('id', `tooltip-${targetId}`)
    node.setAttribute('class', 'tooltip has-tooltip-active')
    node.setAttribute('data-tooltip', e.target.getAttribute('data-tooltip'))
    node.setAttribute(
      'style',
      `top:${top}px; left:${left}px; position:absolute`
    )

    document.body.appendChild(node)
  }

  onMouseLeave (e) {
    const targetId = e.target.getAttribute('data-id')
    const node = document.getElementById(`tooltip-${targetId}`)
    document.body.removeChild(node)
  }
}
