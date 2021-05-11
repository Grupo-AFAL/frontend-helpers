import { stringToDOMNode } from '../domHelpers'

const notAvailableMessage = 'No hay opciones disponibles'

export const unvailableItemTag = (searchText, addItems = false) => {
  const li = document.createElement('li')

  if (addItems && searchText && searchText.length > 0) {
    li.append(`Agregar elemento: ${searchText}`)
    li.dataset.value = searchText
  } else {
    li.append(notAvailableMessage)
  }

  return li
}

export const availableItemTag = item => {
  const li = document.createElement('li')
  const [name, value] = item
  li.dataset.value = value
  li.append(name)
  return li
}

export const dropdownContainerTag = () => {
  return stringToDOMNode(`<ul class="dropdown-container is-hidden"></ul>`)
}

export const inputContainerTag = () => {
  return stringToDOMNode(
    `<div class="input select">
       <input type="text" placeholder="Select option">
    </div>`
  )
}
