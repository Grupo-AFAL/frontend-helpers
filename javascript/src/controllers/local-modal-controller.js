import { Controller } from 'stimulus'

/**
 * Loads local content into a modal window
 *
 * It expects the following structure:
 *
 * <section data-controller="local-modal">
 *   <a href="#" data-action="remote-modal#open" data-content-selector="#contenido-sandwich">
 *    Descripcion Sandwich
 *   </a>
 *
 *   <div id="modal-template" class="modal">
 *     <a data-action="remote-modal#close">Cancel</a>
 *   </div>
 *
 *   <div id="contenido-sandwich" class="is-hidden">
 *     Contenido aleatorio
 *   </div>
 * </section>
 */
export default class LocalModalController extends Controller {
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
