import {
  onKeydown,
  onFocusOrClick,
  onInputChange,
  onResultsMouseDown,
  onResultsHover
} from './eventHandlers'

import { dropdownContainerTag, inputContainerTag } from './domElements'
import { renderAvailableItems, hideResults, addNewItem } from './rendering'

export default async ctrl => {
  // Generate required HTML for the autocomplete and append it to element
  ctrl.element.prepend(inputContainerTag())
  ctrl.element.append(dropdownContainerTag())

  ctrl.inputContainer = ctrl.element.querySelector('.input')
  ctrl.searchInput = ctrl.inputContainer.querySelector('input')
  ctrl.dropdownContainer = ctrl.element.querySelector('.dropdown-container')

  ctrl.renderAvailableItems = renderAvailableItems.bind(ctrl)
  ctrl.hideResults = hideResults.bind(ctrl)
  ctrl.addNewItem = addNewItem.bind(ctrl)

  const ctrlDisconnect = ctrl.disconnect.bind(ctrl)

  const observe = () => {
    document.addEventListener('scroll', ctrl.hideResults)
    ctrl.searchInput.addEventListener('focus', onFocusOrClick.bind(ctrl))
    ctrl.searchInput.addEventListener('click', onFocusOrClick.bind(ctrl))
    ctrl.searchInput.addEventListener('keydown', onKeydown.bind(ctrl))
    ctrl.searchInput.addEventListener('blur', ctrl.hideResults)
    ctrl.searchInput.addEventListener('input', onInputChange.bind(ctrl))
    ctrl.dropdownContainer.addEventListener(
      'mousedown',
      onResultsMouseDown.bind(ctrl)
    )
    ctrl.dropdownContainer.addEventListener(
      'mouseover',
      onResultsHover.bind(ctrl)
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

  const { useWindowResize } = await import('stimulus-use')
  useWindowResize(ctrl)

  return [observe, unobserve]
}
