import { Controller } from 'stimulus'
import Glide from '@glidejs/glide'

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

  connect () {
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
