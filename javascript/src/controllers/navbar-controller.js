import { Controller } from 'stimulus'

export class NavbarController extends Controller {
  static values = { allowTransparency: Boolean, throttleInterval: Number }
  static targets = ['menu', 'burger']

  connect () {
    if (!this.allowTransparencyValue) return

    this.isTransparent = true
    this.element.classList.add('is-transparent')
    document.addEventListener('scroll', () => {
      this.throttle(this.updateBackgroundColor, this.throttleIntervalValue || 100)
    })
  }

  throttle = (callback, time) => {
    if (this.throttleWait) return
    this.throttleWait = true

    setTimeout(() => {
      callback()
      this.throttleWait = false
    }, time)
  }

  updateBackgroundColor = () => {
    if (window.scrollY > this.element.offsetHeight) {
      this.removeIsTransparent()
    } else {
      this.setIsTransparent()
    }
  }

  setIsTransparent () {
    if (this.isTransparent) return

    this.isTransparent = true
    this.element.classList.add('is-transparent')
  }

  removeIsTransparent () {
    if (!this.isTransparent) return

    this.isTransparent = false
    this.element.classList.remove('is-transparent')
  }

  toggleMenu (event) {
    event.preventDefault()
    this.menuTarget.classList.toggle('is-active')
    if (this.hasBurgerTarget) {
      this.burgerTarget.classList.toggle('is-active')
    }
  }
}
