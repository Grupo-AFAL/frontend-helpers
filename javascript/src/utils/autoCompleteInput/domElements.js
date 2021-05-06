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

export const ulContainerTag = () => {
  return stringToDOMNode(
    `<ul class="results is-hidden" data-select-target="results"></ul>`
  )
}

export const inputTag = () => {
  return stringToDOMNode(
    `<div class="input select" data-select-target="fakeInput">
       <input type="text" data-select-target="input" placeholder="Select option">
    </div>`
  )
}
