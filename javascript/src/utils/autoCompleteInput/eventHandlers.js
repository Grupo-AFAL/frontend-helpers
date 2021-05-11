export function setupListeners (ctrl) {
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

export function removeListeners (ctrl) {
  document.removeEventListener('scroll', ctrl.hideResults)
}

export function onKeydown (event) {
  switch (event.key) {
    case 'Escape':
      this.hideResults()
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

export function onFocusOrClick () {
  this.renderAvailableItems()
}

export function onInputChange () {
  this.renderAvailableItems(this.searchInput.value)
}

export function onResultsMouseDown (event) {
  this.addNewItem(event.target.textContent)
}

export function onResultsHover (event) {
  if (event.target.localName !== 'li') return

  updateHighlightedItem(this.highlightedItem)
  this.highlightedItem = updateHighlightedItem(event.target)
}

// "Private functions"
const onInputArrowDown = ctrl => {
  const results = ctrl.dropdownContainer

  if (!results.innerHTML) {
    ctrl.renderAvailableItems()
  }

  if (!ctrl.highlightedItem) {
    ctrl.highlightedItem = updateHighlightedItem(results.firstChild)
    results.scrollTop = ctrl.highlightedItem.offsetTop
  } else if (ctrl.highlightedItem !== results.lastChild) {
    updateHighlightedItem(ctrl.highlightedItem)
    ctrl.highlightedItem = updateHighlightedItem(
      ctrl.highlightedItem.nextSibling
    )
    results.scrollTop = ctrl.highlightedItem.offsetTop
  }
}

const onInputArrowUp = ctrl => {
  const results = ctrl.dropdownContainer

  if (ctrl.highlightedItem && ctrl.highlightedItem !== results.firstChild) {
    ctrl.highlightedItem = updateHighlightedItem(
      ctrl.highlightedItem.previousSibling
    )
    updateHighlightedItem(ctrl.highlightedItem.nextSibling)
    results.scrollTop = ctrl.highlightedItem.offsetTop
  }
}

const updateHighlightedItem = item => {
  if (item) {
    item.classList.toggle('selected')
    return item
  }
}
