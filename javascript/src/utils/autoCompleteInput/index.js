import { setupListeners, removeListeners } from './eventHandlers'
import { dropdownContainerTag, inputContainerTag } from './domElements'
import { renderAvailableItems, hideResults, addNewItem } from './rendering'

export default async ctrl => {
  // Generate required HTML for the autocomplete and append it to element
  ctrl.element.prepend(inputContainerTag())
  ctrl.element.append(dropdownContainerTag())

  // Setup references to HTML elements
  ctrl.inputContainer = ctrl.element.querySelector('.input')
  ctrl.searchInput = ctrl.inputContainer.querySelector('input')
  ctrl.dropdownContainer = ctrl.element.querySelector('.dropdown-container')

  // Bind rendering functions to the controller
  ctrl.renderAvailableItems = renderAvailableItems.bind(ctrl)
  ctrl.hideResults = hideResults.bind(ctrl)
  ctrl.addNewItem = addNewItem.bind(ctrl)

  const ctrlDisconnect = ctrl.disconnect.bind(ctrl)

  Object.assign(ctrl, {
    disconnect () {
      removeListeners(ctrl)
      ctrlDisconnect()
    },
    windowResize () {
      ctrl.hideResults()
    }
  })

  setupListeners(ctrl)

  const { useWindowResize } = await import('stimulus-use')
  useWindowResize(ctrl)

  return {
    inputContainer: ctrl.inputContainer,
    searchInput: ctrl.searchInput,
    dropdownContainer: ctrl.dropdownContainer
  }
}
