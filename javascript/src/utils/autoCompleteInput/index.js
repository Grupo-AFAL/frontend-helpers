export default async ctrl => {
  const { useWindowResize } = await import('stimulus-use')
  useWindowResize(ctrl)

  const ctrlDisconnect = ctrl.disconnect.bind(ctrl)

  const observe = () => {
    document.addEventListener('scroll', ctrl.hideResults)
    ctrl.inputTarget.addEventListener('focus', ctrl.onFocusOrClick.bind(ctrl))
    ctrl.inputTarget.addEventListener('click', ctrl.onFocusOrClick.bind(ctrl))
    ctrl.inputTarget.addEventListener('keydown', ctrl.onKeydown.bind(ctrl))
    ctrl.inputTarget.addEventListener('blur', ctrl.hideResults.bind(ctrl))
    ctrl.inputTarget.addEventListener('input', ctrl.onInputChange.bind(ctrl))
    ctrl.resultsTarget.addEventListener(
      'mousedown',
      ctrl.onResultsMouseDown.bind(ctrl)
    )
    ctrl.resultsTarget.addEventListener(
      'mouseover',
      ctrl.onResultsHover.bind(ctrl)
    )
  }

  const unobserve = () => {
    document.removeEventListener('scroll', ctrl.hideResults)
  }

  Object.assign(ctrl, {
    disconnect () {
      unobserve()
      ctrlDisconnect()
    },
    windowResize () {
      ctrl.hideResults()
    }
  })

  observe()

  return [observe, unobserve]
}
