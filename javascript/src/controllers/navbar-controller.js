import { Controller } from 'stimulus'

export class NavbarController extends Controller {
  static values = { allowTransparency: Boolean, throttleInterval: Number }
  static classes = ['toggleableOnScroll']
  static targets = ['menu', 'burger']

  connect () {
    if (!this.allowTransparencyValue) return

    this.toggleableClass = this.hasToggleableOnScrollClass ? this.toggleableOnScrollClass : 'transparent'

    this.element.classList.add(this.toggleableClass)
    document.addEventListener('scroll', () => {
      this.throttle(this.updateBackgroundColor, this.throttleIntervalValue || 100)
    })
  }

  updateBackgroundColor = () => {
    if (window.scrollY > this.element.offsetHeight) {
      this.element.classList.remove(this.toggleableClass)
    } else {
      this.element.classList.add(this.toggleableClass)
    }
  }


throttle = (callback, time) => {
  if (this.throttleWait) return;
  this.throttleWait = true;

  setTimeout(() => {
    callback();
    this.throttleWait = false;
  }, time);
}

  toggleMenu (event) {
    event.preventDefault()
    this.menuTarget.classList.toggle('is-active')

    if (this.hasBurgerTarget) {
      this.burgerTarget.classList.toggle('is-active')
    }
  }
}
