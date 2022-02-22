import { Controller } from '@hotwired/stimulus'

export class FileSizeLimitController extends Controller {
  static targets = ['trixEditor']
  static values = { limit: Number, message: String }

  connect () {
    this.trixEditorTarget.addEventListener(
      'trix-file-accept',
      this.checkLimit.bind(this)
    )
  }

  disconnect () {
    this.trixEditorTarget.removeEventListener(
      'trix-file-accept',
      this.checkLimit
    )
  }

  checkLimit (event) {
    let totalSize = 0
    this.trixEditorTarget.editor.composition.attachments.forEach(element => {
      totalSize += element.attributes.values.filesize
    })
    totalSize += event.file.size

    const maxFileSize = 1024 * 1024 * this.limitValue

    if (totalSize > maxFileSize) {
      event.preventDefault()
      window.alert(this.messageValue)
    }
  }
}
