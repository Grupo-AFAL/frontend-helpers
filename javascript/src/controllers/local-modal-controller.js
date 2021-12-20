import { Controller } from '@hotwired/stimulus'

/**
 * LocalModal Controller
 * Provides functionality to open the bulma modal with content already
 * available on the page but hidden
 * https://bulma.io/documentation/components/modal/
 *
 * How to use:
 *
 * <section data-controller="local-modal">
 *   <a href="#" data-action="local-modal#open" data-content-selector="#content">
 *    Descripcion Sandwich
 *   </a>

 *   <div id="modal-template" class="modal" data-local-modal-target="modal">
 *     <div class="modal-background"></div>
 *     <div class="modal-content" data-local-modal-target="modalContent">
 *     </div>
 *     <button class="modal-close is-large" data-action="local-modal#close"></button>
 *   </div>
 *
 *   <div id="content" class="is-hidden">
 *     Any content
 *   </div>
 * </section>
 */
export class LocalModalController extends Controller {
  static targets = ['modal', 'modalContent']

  open (event) {
    let contentSelector

    if (event.target.dataset.contentSelector) {
      contentSelector = event.target.dataset.contentSelector
    } else {
      const parent = event.target.closest('[data-content-selector]')
      contentSelector = parent.dataset.contentSelector
    }

    const content = document.querySelector(contentSelector)

    this.modalTarget.classList.add('is-active')
    this.modalContentTarget.innerHTML = content.innerHTML
  }

  close () {
    this.modalTarget.classList.remove('is-active')
    this.modalContentTarget.innerHTML = ''
  }
}
