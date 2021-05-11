import { unvailableItemTag, availableItemTag } from './domElements'
import { availableItems, findItemToAdd } from './search'

export function renderAvailableItems (searchText = null) {
  this.resultsTarget.innerHTML = null
  const items = availableItems(this.items, searchText)

  if (items.length === 0) {
    this.resultsTarget.append(unvailableItemTag(searchText))
  } else {
    items.forEach(item => {
      this.resultsTarget.append(availableItemTag(item))
    })
  }

  const rect = this.fakeInputTarget.getBoundingClientRect()
  const top = rect.top + 50
  const left = rect.left
  const width = rect.width

  this.resultsTarget.setAttribute(
    'style',
    `top:${top}px; left:${left}px; width:${width}px;`
  )

  this.fakeInputTarget.classList.add('is-focused')
  this.resultsTarget.classList.remove('is-hidden')
}

export function hideResults () {
  this.highlightedItem = null
  if (!this.resultsTarget.innerHTML) return

  this.resultsTarget.classList.add('is-hidden')
  this.resultsTarget.innerHTML = null
  this.fakeInputTarget.classList.remove('is-focused')
}

export function addNewItem (itemName = null) {
  const item = findItemToAdd(
    itemName,
    this.highlightedItem,
    this.inputTarget,
    this.items
  )

  if (item) {
    this.addSelectedItem(item[1])
    this.renderAvailableItems()
  }

  this.hideResults()
}
