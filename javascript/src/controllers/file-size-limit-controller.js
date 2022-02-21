import { Controller } from '@hotwired/stimulus'

export class FileSizeLimitController extends Controller {
  static targets = ['trixEditor']

  connect () {
    console.log('conected!!')
    this.trixEditorTarget.addEventListener('trix-file-accept', this.chekLimit)
  }

  disconnect () {
    window.removeEventListener('trix-file-accept', this.chekLimit)
  }

  chekLimit (event) {
    const trixEditor = document.querySelector('trix-editor')
    var totalSize = 0
    trixEditor.editor.composition.attachments.forEach(element => {
      totalSize += element.attributes.values.filesize
    })
    totalSize += event.file.size
    const maxFileSize = 1024 * 1024
    if (totalSize > maxFileSize) {
      event.preventDefault()
      alert('¡Los archivos adjuntos no deben superar 1 MB!')
    }
  }
}
