import { Controller } from 'stimulus'

export class SideMenuController extends Controller {
  static targets = ['container', 'overlay']

  connect () {
    if (this.hasOverlayTarget && this.hasContainerTarget) {
      this.overlayTarget.addEventListener('click', this.closeMenu)
      this.containerTarget.addEventListener('click', this.closeMenu)
    }
  }

  disconnect () {
    if (this.hasOverlayTarget && this.hasContainerTarget) {
      this.overlayTarget.removeEventListener('click', this.closeMenu)
      this.containerTarget.removeEventListener('click', this.closeMenu)
    }
  }

  toggleMenu (e) {
    e.stopPropagation()
    this.containerTarget.classList.toggle('is-active')
  }

  closeMenu = e => {
    this.containerTarget.classList.remove('is-active')
  }
}
