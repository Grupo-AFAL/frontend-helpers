import { setupListeners, removeListeners } from './eventHandlers'
import { dropdownContainerTag, inputContainerTag } from './domElements'
import {
  renderAvailableItems,
  hideItems,
  addNewItem,
  addSelectedItem,
  renderSelectedItem
} from './rendering'

export default async (ctrl, { className, placeholder, searchPlaceholder }) => {
  // Generate required HTML for the autocomplete and append it to element
  ctrl.element.prepend(inputContainerTag({ className, placeholder }))
  ctrl.element.append(dropdownContainerTag({ searchPlaceholder }))

  // Setup references to HTML elements
  ctrl.inputContainer = ctrl.element.querySelector('.input-container')
  ctrl.customSelect = ctrl.element.querySelector('.custom-select')
  ctrl.dropdownContainer = ctrl.element.querySelector('.dropdown-container')
  ctrl.dropdownItems = ctrl.element.querySelector('.dropdown-items')
  ctrl.searchInput = ctrl.element.querySelector('.search-input')

  // Bind rendering functions to the controller
  ctrl.renderAvailableItems = renderAvailableItems.bind(ctrl)
  ctrl.hideItems = hideItems.bind(ctrl)
  ctrl.addNewItem = addNewItem.bind(ctrl)
  ctrl.addSelectedItem = addSelectedItem.bind(ctrl)
  ctrl.renderSelectedItem = renderSelectedItem.bind(ctrl)

  const ctrlDisconnect = ctrl.disconnect.bind(ctrl)

  Object.assign(ctrl, {
    disconnect () {
      removeListeners(ctrl)
      ctrlDisconnect()
    },
    windowResize () {
      ctrl.hideItems()
    }
  })

  setupListeners(ctrl)
  ctrl.renderSelectedItem()

  const { useWindowResize } = await import('stimulus-use')
  useWindowResize(ctrl)

  return {
    inputContainer: ctrl.inputContainer,
    searchInput: ctrl.searchInput,
    dropdownContainer: ctrl.dropdownContainer
  }
}
