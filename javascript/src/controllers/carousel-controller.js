import { Controller } from 'stimulus'

export class CarouselController extends Controller {
  static values = {
    type: String,
    index: Number,
    perView: Number,
    autoplay: Boolean,
    gap: Number,
    breakpoints: Object,
    peek: Object
  }

  async connect () {
    const { default: Glide } = await import('@glidejs/glide')
    const options = {
      type: this.typeValue || 'carousel',
      startAt: this.indexValue || 0,
      perView: this.perViewValue || 1,
      gap: this.gapValue || 0,
      autoplay: this.autoplayValue || false,
      focusAt: 'center',
      dragThreshold: false,
      swipeThreshold: false
    }

    if (this.hasPeekValue) {
      options.peek = this.peekValue
    }

    if (this.hasBreakpointsValue) {
      options.breakpoints = this.breakpointsValue
    }

    this.glide = new Glide(this.element, options).mount()
  }

  disconnect () {
    if (!this.glide) return

    this.glide.destroy()
  }
}
