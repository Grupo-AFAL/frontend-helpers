import { Controller } from 'stimulus'

export default class NavbarController extends Controller {
  static targets = ['menu', 'burger']

  toggleMenu (event) {
    event.preventDefault()
    this.menuTarget.classList.toggle('is-active')

    if (this.hasBurgerTarget) {
      this.burgerTarget.classList.toggle('is-active')
    }
  }
}
