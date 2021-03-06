import { Controller } from 'stimulus'

/**
 * File Input Controller
 * Displays the selected filename in the correct place.
 *
 * It expects the following structure:
 *
    <div class="file has-name field" data-controller="file-input">
      <label class="file-label">
        <%= form.file_field :[fieldName], class: 'file-input', 'data-action': 'file-input#onChange' %>
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-cloud-upload-alt"></i>
          </span>
          <span class="file-label" >
            Seleccionar Imagen
          </span>
        </span>
        <span class="file-name" data-target="file-input.value">
          No hay imagen seleccionada
        </span>
      </label>
    </div>
 */

export default class FileInputController extends Controller {
  static targets = ['value', 'input']

  onChange (event) {
    let fileName

    if (event.target.value.length == 0) {
      fileName = this.data.get('nonSelectedText')
    } else {
      fileName = event.target.value.split('\\').pop()
    }

    this.valueTarget.innerHTML = fileName
  }
}
