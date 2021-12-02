import { Controller } from 'stimulus'

/*
  Image Preview Controller
  Replaces image from img tag with the target output so that a preview of the image can be seen

  It expects the following structure:

  <div data-controller"image-preview">
    <img data-image-preview-target"output" src="[some url]">
    <input data-image-preview-target="input" data-action="change->image-preview#showImage" />
  </div>

*/
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
