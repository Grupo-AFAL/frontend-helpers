import {
  onKeydown,
  onFocusOrClick,
  onInputChange,
  onResultsMouseDown,
  onResultsHover
} from './eventHandlers'

import { ulContainerTag, inputTag } from './domElements'
import { renderAvailableItems, hideResults, addNewItem } from './rendering'

export default async ctrl => {
  ctrl.element.prepend(inputTag())
  ctrl.element.append(ulContainerTag())

  const ctrlDisconnect = ctrl.disconnect.bind(ctrl)

  ctrl.renderAvailableItems = renderAvailableItems.bind(ctrl)
  ctrl.hideResults = hideResults.bind(ctrl)
  ctrl.addNewItem = addNewItem.bind(ctrl)

  const observe = () => {
    document.addEventListener('scroll', ctrl.hideResults)
    ctrl.inputTarget.addEventListener('focus', onFocusOrClick.bind(ctrl))
    ctrl.inputTarget.addEventListener('click', onFocusOrClick.bind(ctrl))
    ctrl.inputTarget.addEventListener('keydown', onKeydown.bind(ctrl))
    ctrl.inputTarget.addEventListener('blur', ctrl.hideResults)
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

  const { useWindowResize } = await import('stimulus-use')
  useWindowResize(ctrl)

  return [observe, unobserve]
}
