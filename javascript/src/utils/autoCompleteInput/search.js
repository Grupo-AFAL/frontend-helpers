export const findItemText = item => {
  if (item == null) return

  switch (item.tagName) {
    case 'SPAN':
      return item.parentElement.firstChild.textContent
    case 'DIV':
      return item.firstChild.textContent
    default:
      return item.textContent
  }
}

export function findItemToAdd (itemName, highlightedItem, searchInput, items) {
  const highlightedText = findItemText(highlightedItem)
  const searchText = itemName || highlightedText || searchInput.value
  return items.find(searchFunction(searchText))
}

export const availableItems = (
  items,
  searchText = null,
  selectedValues = []
) => {
  return items.filter(searchFunction(searchText, selectedValues))
}

const searchFunction = (searchText, selectedValues = []) => {
  return item => {
    const [name, value] = item
    const notIncluded = !selectedValues.includes(value)

    if (searchText) {
      const textIsMatch = name
        .toLowerCase()
        .includes(searchText.toLowerCase().trim())
      return notIncluded && textIsMatch
    } else {
      return notIncluded
    }
  }
}
