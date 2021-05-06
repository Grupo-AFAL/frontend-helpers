import {
  onKeydown,
  onFocusOrClick,
  onInputChange,
  onResultsMouseDown,
  onResultsHover
} from './eventHandlers'

export default async ctrl => {
  const { useWindowResize } = await import('stimulus-use')
  useWindowResize(ctrl)

  const ctrlDisconnect = ctrl.disconnect.bind(ctrl)

  const observe = () => {
    document.addEventListener('scroll', ctrl.hideResults)
    ctrl.inputTarget.addEventListener('focus', onFocusOrClick.bind(ctrl))
    ctrl.inputTarget.addEventListener('click', onFocusOrClick.bind(ctrl))
    ctrl.inputTarget.addEventListener('keydown', onKeydown.bind(ctrl))
    ctrl.inputTarget.addEventListener('blur', ctrl.hideResults.bind(ctrl))
    ctrl.inputTarget.addEventListener('input', onInputChange.bind(ctrl))
    ctrl.resultsTarget.addEventListener(
      'mousedown',
      onResultsMouseDown.bind(ctrl)
    )
    ctrl.resultsTarget.addEventListener('mouseover', onResultsHover.bind(ctrl))
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
