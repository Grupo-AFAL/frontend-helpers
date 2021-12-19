import { isElementInViewport } from './domHelpers'

const defaultOptions = {
  events: ['click', 'touchend'],
  onlyVisible: true
}

export default (controller, options = {}) => {
  const { onlyVisible, events } = Object.assign({}, defaultOptions, options)

  const onEvent = event => {
    const targetElement = controller.element
    const notInViewport = !isElementInViewport(targetElement) && onlyVisible

    if (targetElement.contains(event.target) || notInViewport) {
      return
    }

    // call the clickOutside method of the Stimulus controller
    if (controller.clickOutside) {
      controller.clickOutside(event)
    }
  }

  const observe = () => {
    events.forEach(e => window.addEventListener(e, onEvent, false))
  }

  const unobserve = () => {
    events.forEach(e => window.removeEventListener(e, onEvent, false))
  }

  // keep a copy of the current disconnect() function of the controller
  // to support composing several behaviors
  const controllerDisconnect = controller.disconnect.bind(controller)

  Object.assign(controller, {
    disconnect () {
      unobserve()
      controllerDisconnect()
    }
  })

  observe()

  return [observe, unobserve]
}
