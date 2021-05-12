export function setupListeners (ctrl) {
  document.addEventListener('scroll', ctrl.hideItems)
  // ctrl.searchInput.addEventListener('focus', onFocus.bind(ctrl))
  ctrl.inputContainer.addEventListener('click', onClick.bind(ctrl))
  ctrl.searchInput.addEventListener('keydown', onKeydown.bind(ctrl))
  ctrl.searchInput.addEventListener('blur', ctrl.hideItems)
  ctrl.searchInput.addEventListener('input', onInputChange.bind(ctrl))
  ctrl.dropdownItems.addEventListener('mousedown', onItemsMouseDown.bind(ctrl))
  ctrl.dropdownItems.addEventListener('mouseover', onItemsHover.bind(ctrl))
}

export function removeListeners (ctrl) {
  document.removeEventListener('scroll', ctrl.hideItems)
}

export function onKeydown (event) {
  switch (event.key) {
    case 'Escape':
      this.hideItems()
      break
    case 'Tab':
    case 'Enter':
    case ',':
      if (this.searchInput.value || this.highlightedItem) {
        this.addNewItem()
        event.preventDefault()
      }
      break
    case 'ArrowDown':
      onInputArrowDown(this)
      break
    case 'ArrowUp':
      onInputArrowUp(this)
      break
    default:
      this.highlightedItem = null
  }
}

export function onClick () {
  if (this.dropdownItems.innerHTML) {
    this.hideItems()
  } else {
    this.renderAvailableItems()
    this.searchInput.focus()
  }
}

export function onFocus () {
  this.renderAvailableItems()
}

export function onInputChange () {
  this.renderAvailableItems(this.searchInput.value)
}

export function onItemsMouseDown (event) {
  this.addNewItem(event.target.textContent)
}

export function onItemsHover (event) {
  if (event.target.localName !== 'li') return

  updateHighlightedItem(this.highlightedItem)
  this.highlightedItem = updateHighlightedItem(event.target)
}

// "Private functions"
const onInputArrowDown = ctrl => {
  const items = ctrl.dropdownItems

  if (!items.innerHTML) {
    ctrl.renderAvailableItems()
  }

  if (!ctrl.highlightedItem) {
    ctrl.highlightedItem = updateHighlightedItem(items.firstChild)
    scrollToHighlightedItem(ctrl)
  } else if (ctrl.highlightedItem !== items.lastChild) {
    updateHighlightedItem(ctrl.highlightedItem)
    ctrl.highlightedItem = updateHighlightedItem(
      ctrl.highlightedItem.nextSibling
    )
    scrollToHighlightedItem(ctrl)
  }
}

const onInputArrowUp = ctrl => {
  const items = ctrl.dropdownItems

  if (ctrl.highlightedItem && ctrl.highlightedItem !== items.firstChild) {
    ctrl.highlightedItem = updateHighlightedItem(
      ctrl.highlightedItem.previousSibling
    )
    updateHighlightedItem(ctrl.highlightedItem.nextSibling)
    scrollToHighlightedItem(ctrl)
  }
}

const updateHighlightedItem = item => {
  if (item) {
    item.classList.toggle('selected')
    return item
  }
}

const scrollToHighlightedItem = ctrl => {
  const offsetTop =
    ctrl.highlightedItem.offsetTop - ctrl.searchInput.offsetHeight

  ctrl.dropdownItems.scrollTop = offsetTop
}
