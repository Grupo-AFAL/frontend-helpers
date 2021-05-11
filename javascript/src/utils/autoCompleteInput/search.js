export function findItemToAdd (itemName, highlightedItem, searchInput, items) {
  const highlightedText = highlightedItem ? highlightedItem.textContent : ''
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
      const textIsMatch = name.toLowerCase().includes(searchText.toLowerCase())
      return notIncluded && textIsMatch
    } else {
      return notIncluded
    }
  }
}
