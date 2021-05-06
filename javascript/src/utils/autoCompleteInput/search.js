export const firstAvailableItem = (
  items,
  searchText = null,
  selectedValues = []
) => {
  return items.find(searchFunction(searchText, selectedValues))
}

export const availableItems = (
  items,
  searchText = null,
  selectedValues = []
) => {
  return items.filter(searchFunction(searchText, selectedValues))
}

const searchFunction = (searchText, selectedValues) => {
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
