import { Controller } from 'stimulus'

export class NavbarController extends Controller {
  static values = { allowTransparency: Boolean }
  static targets = ['menu', 'burger']

  connect () {
    if (this.allowTransparencyValue === false) return

    this.requestId = window.requestAnimationFrame(this.updateBackgroundColor)
  }

  disconnect () {
    if (!this.requestId) return

    window.cancelAnimationFrame(this.requestId)
  }

  updateBackgroundColor = () => {
    if (window.scrollY > this.element.offsetHeight) {
      this.removeIsTransparent()
    } else {
      this.setIsTransparent()
    }

    this.requestId = window.requestAnimationFrame(this.updateBackgroundColor)
  }

  removeIsTransparent () {
    if (!this.isTransparent) return

    this.isTransparent = false
    this.element.classList.remove('is-transparent')
  }

  setIsTransparent () {
    if (this.isTransparent) return

    this.isTransparent = true
    this.element.classList.add('is-transparent')
  }

  toggleMenu (event) {
    event.preventDefault()
    this.menuTarget.classList.toggle('is-active')

    if (this.hasBurgerTarget) {
      this.burgerTarget.classList.toggle('is-active')
    }
  }
}
