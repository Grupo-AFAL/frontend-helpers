import { Controller } from 'stimulus'

/**
 * Dropdown Controller
 * Provides the JS functionality for the Bulma Dropdown component:
 * https://bulma.io/documentation/components/dropdown/
 *
 * How to use
 *
 * <div class="dropdown is-active" data-controller="dropdown">
 *   <div class="dropdown-trigger">
 *     <button class="button" data-action="dropdown#toggleMenu">
 *       <span>Dropdown button</span>
 *     </button>
 *   </div>
 *   <div class="dropdown-menu">
 *     <div class="dropdown-content">
 *       <a href="#" class="dropdown-item">
 *         Dropdown item
 *       </a>
 *     </div>
 *   </div>
 * </div>
 */
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
