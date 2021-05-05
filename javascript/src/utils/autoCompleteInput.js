export const autoCompleteInput = controller => {
  console.log('autoCompleteInput', controller)

  // const callback = () => {
  //   controller['windowResize'].call(controller)
  // }

  // const controllerDisconnect = controller.disconnect.bind(controller)

  // const observe = () => {
  //   window.addEventListener('resize', callback)
  //   callback()
  // }

  // const unobserve = () => {
  //   window.removeEventListener('resize', callback)
  // }

  // Object.assign(controller, {
  //   disconnect () {
  //     unobserve()
  //     controllerDisconnect()
  //   }
  // })

  // observe()

  // return [observe, unobserve]
}
