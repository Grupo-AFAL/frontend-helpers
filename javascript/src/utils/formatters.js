const locale = 'en-US'
const currency = 'USD'

export const formatCurrency = number => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    number
  )
}

export const formatDecimal = number => {
  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    maximumFractionDigits: 2
  }).format(number)
}

export const toFloat = number => {
  return parseFloat(number.length === 0 ? '0' : number.replace(/,/g, ''))
}

export const toInt = number => {
  return parseInt(number.length === 0 ? '0' : number.replace(/,/g, ''))
}

export const toBool = boolean => {
  if (boolean === 'false') return false
  return Boolean(boolean)
}

export const indexById = array => {
  return array.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
}
