import { Controller } from 'stimulus'

export class DropdownController extends Controller {
  connect () {
    document.addEventListener('click', this.closeDropdowns)
  }

  disconnect () {
    document.removeEventListener('click', this.closeDropdowns)
  }

  toggleMenu (e) {
    e.stopPropagation()
    e.preventDefault()
    this.element.classList.toggle('is-active')
  }

  closeDropdowns = () => {
    this.element.classList.remove('is-active')
  }
}
