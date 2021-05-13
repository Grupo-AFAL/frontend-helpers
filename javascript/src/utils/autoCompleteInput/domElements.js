import { stringToDOMNode } from '../domHelpers'

const notAvailableMessage = 'No hay opciones disponibles'

export const unvailableItemTag = (searchText, addItems = false) => {
  const div = document.createElement('div')
  div.classList.add('dropdown-item')

  if (addItems && searchText && searchText.length > 0) {
    div.append(`Agregar elemento: ${searchText}`)
    div.dataset.value = searchText
  } else {
    div.append(notAvailableMessage)
  }

  return div
}

export const availableItemTag = item => {
  const div = document.createElement('div')
  const [name, value] = item
  div.dataset.value = value
  div.classList.add('dropdown-item')
  div.append(name)
  return div
}

export const dropdownContainerTag = ({
  searchPlaceholder = 'Search...'
} = {}) => {
  return stringToDOMNode(
    `<div class="dropdown-container is-hidden">
      <input class="input search-input" type="text" placeholder="${searchPlaceholder}">
      <div class="dropdown-items"></div>
    </div>`
  )
}

export const inputContainerTag = ({
  placeholder = 'Select option',
  className = ''
}) => {
  return stringToDOMNode(
    `<div class="input-container select ${className}">
       <input type="text" class="input custom-select" placeholder="${placeholder}">
    </div>`
  )
}
