import { Controller } from '@hotwired/stimulus'

export class CarouselController extends Controller {
  static values = {
    type: { type: String, default: 'carousel' },
    index: { type: Number, default: 0 },
    perView: { type: Number, default: 1 },
    autoplay: { type: String, default: 'false' },
    gap: { type: Number, default: 0 },
    focusAt: { type: String, default: 'center' },
    breakpoints: Object,
    peek: Object
  }

  async connect () {
    const { default: Glide } = await import('@glidejs/glide')

    const options = {
      type: this.typeValue,
      startAt: this.indexValue,
      perView: this.perViewValue,
      autoplay: this.autoplayValue === 'false' ? false : this.autoplayValue,
      gap: this.gapValue,
      focusAt:
        this.focusAtValue === 'center' ? 'center' : parseInt(this.focusAtValue),
      dragThreshold: false,
      swipeThreshold: false
    }

    if (this.hasBreakpointsValue) {
      options.breakpoints = this.breakpointsValue
    }

    if (this.hasPeekValue) {
      options.peek = this.peekValue
    }

    this.glide = new Glide(this.element, options).mount()
  }

  disconnect () {
    if (!this.glide) return

    this.glide.destroy()
  }
}
