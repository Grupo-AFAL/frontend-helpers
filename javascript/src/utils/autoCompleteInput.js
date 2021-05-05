export const autoCompleteInput = async controller => {
  const { useWindowResize } = await import('stimulus-use')
  useWindowResize(controller)

  const controllerDisconnect = controller.disconnect.bind(controller)

  const observe = () => {
    document.addEventListener('scroll', controller.hideResults)
  }

  const unobserve = () => {
    document.removeEventListener('scroll', controller.hideResults)
  }

  Object.assign(controller, {
    disconnect () {
      unobserve()
      controllerDisconnect()
    },
    windowResize () {
      controller.hideResults()
    }
  })

  observe()

  return [observe, unobserve]
}
