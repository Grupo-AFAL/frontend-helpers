export const replaceInFragment = (fragment, regex, replaceValue) => {
  const templateString = fragment.innerHTML.replace(regex, replaceValue)
  return stringToDOMNode(templateString)
}

export const stringToDOMNode = htmlString => {
  const template = document.createElement('template')
  template.innerHTML = htmlString
  return template.content
}

/**
 * Replaces a Node with the an HTML string fragment
 *
 * @param {HTMLElement} oldNode - DOM Node to be replaced
 * @param {string} htmlString - HTML string with the new node
 */
export const replaceDOMNode = (oldNode, htmlString) => {
  const newNode = stringToDOMNode(htmlString)
  oldNode.parentNode.replaceChild(newNode, oldNode)
}

export const removeNonHiddenFormElements = fragment => {
  const removeNodes = input => {
    if (input.type === 'hidden') return
    input.remove()
  }

  fragment.querySelectorAll('input').forEach(removeNodes)
  fragment.querySelectorAll('textarea').forEach(removeNodes)
  fragment.querySelectorAll('select').forEach(removeNodes)

  return fragment
}

export const previousSibling = (element, selector) => {
  let previousElement = element.previousElementSibling
  if (!previousElement) return null

  while (!previousElement.matches(selector)) {
    previousElement = previousElement.previousElementSibling
    if (!previousElement) return null
  }

  return previousElement
}

export const nextSibling = (element, selector) => {
  let nextElement = element.nextElementSibling
  if (!nextElement) return null

  while (!nextElement.matches(selector)) {
    nextElement = nextElement.nextElementSibling
    if (!nextElement) return null
  }

  return nextElement
}
