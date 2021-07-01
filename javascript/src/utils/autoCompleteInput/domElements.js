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
  const [name, value, info] = item
  div.dataset.value = value
  div.classList.add('dropdown-item')

  if (info) {
    div.append(stringToDOMNode('<span>' + name + "</span>"));
    div.append(stringToDOMNode('<span class="info-right">' + info + '</span>'))
  } else {
    div.append(name)
  }

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
  containerClass = ''
}) => {
  const classNames = `input-container select ${containerClass}`.trim()
  return stringToDOMNode(
    `<div class="${classNames}">
       <input type="text" class="input custom-select" placeholder="${placeholder}">
    </div>`
  )
}

export const findItemText = (item) => {
  if (item == null) return
  
  switch (item.tagName) {
    case 'SPAN':
      return item.parentElement.firstChild.textContent
      break
    case 'DIV':
      return item.firstChild.textContent
      break
    default:
      item.textContent
  }
}
