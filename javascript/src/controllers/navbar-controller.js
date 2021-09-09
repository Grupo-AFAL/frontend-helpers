import { Controller } from 'stimulus'

export class NavbarController extends Controller {
  static values = { allowTransparency: Boolean }
  static classes = ['toggleableOnScroll']
  static targets = ['menu', 'burger']

  connect () {
    if (!this.allowTransparencyValue) return

    this.toggleableClass = this.hasToggleableOnScrollClass ? this.toggleableOnScrollClass : 'transparent'

    this.element.classList.add(this.toggleableClass)
    document.addEventListener('scroll', this.updateBackgroundColor)
  }

  updateBackgroundColor = () => {
    if (window.scrollY > this.element.offsetHeight) {
      this.element.classList.remove(this.toggleableClass)
    } else {
      this.element.classList.add(this.toggleableClass)
    }
  }

  toggleMenu (event) {
    event.preventDefault()
    this.menuTarget.classList.toggle('is-active')

    if (this.hasBurgerTarget) {
      this.burgerTarget.classList.toggle('is-active')
    }
  }
}
