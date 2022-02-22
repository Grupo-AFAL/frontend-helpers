import { Controller } from '@hotwired/stimulus'

export class TrixAttachmentsController extends Controller {
  static values = { maxSize: Number, errorMessage: String }

  connect () {
    this.checkLimit = this.checkLimit.bind(this)
    this.element.addEventListener('trix-file-accept', this.checkLimit)
  }

  disconnect () {
    this.element.removeEventListener('trix-file-accept', this.checkLimit)
  }

  checkLimit (event) {
    const newTotalSize = this.totalAttachmentsSize() + event.file.size
    const maxFileSizeInBytes = 1024 * 1024 * this.maxSizeValue

    if (newTotalSize > maxFileSizeInBytes) {
      event.preventDefault()
      window.alert(this.errorMessageValue)
    }
  }

  totalAttachmentsSize () {
    return this.element.editor.composition.attachments.reduce(
      (totalSize, element) => {
        return totalSize + element.attributes.values.filesize
      },
      0
    )
  }
}
