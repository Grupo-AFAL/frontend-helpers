import { Controller } from 'stimulus'

export class ImagePreviewController extends Controller {
  static targets = ['output', 'input']

  showImage () {
    const file = this.inputTarget.files[0]
    if (file) {
      this.outputTarget.src = URL.createObjectURL(file)
      this.outputTarget.classList.add('cover-fill')
    }
  }
}
