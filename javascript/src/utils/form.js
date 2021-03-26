export const serialize = form => {
  const elements = Array.from(form.elements)

  const data = elements
    .flatMap(element => {
      if (element.type === 'checkbox' && !element.checked) return null
      if (element.name.length === 0) return null

      return getFormElementData(element)
    })
    .filter(Boolean)

  return data
    .map(e => `${encodeURI(e.name)}=${encodeURIComponent(e.value)}`)
    .join('&')
}

export const getFormElementData = element => {
  if (element.type === 'select-multiple') {
    return Array.from(element.selectedOptions).map(option => {
      return { name: element.name, value: option.value }
    })
  }

  if (element.type === 'checkbox') {
    const value = element.checked ? element.value : false
    return [{ name: element.name, value }]
  }

  if (element.type === 'radio') {
    if (!element.checked) return []
    return [{ name: element.name, value: element.value }]
  }

  return [{ name: element.name, value: element.value }]
}

/**
 * Submits a Form with JavaScript and returns the response text
 * and status.
 *
 * @param {HTMLFormElement} formElement - Form element to be submitted
 * @returns {Promise} Promise resolves to an Object with { responseText, ok }
 */
export const submitForm = async formElement => {
  const formURL = formElement.getAttribute('action')
  const options = {
    method: 'POST',
    mode: 'same-origin',
    redirect: 'follow',
    credentials: 'include',
    body: new FormData(formElement)
  }

  return new Promise((resolve, reject) => {
    let ok

    fetch(formURL, options)
      .then(response => {
        ok = response.ok
        return response.text()
      })
      .then(responseText => resolve({ responseText, ok }))
  })
}

/**
 * Focuses the first <input autofocus="autofocus"> if exists
 *
 * @param {HTMLElement} element containing an input with the autofocus attribute
 */
export const autoFocusInput = element => {
  const autofocusNode = element.querySelector('[autofocus]')
  if (autofocusNode) autofocusNode.focus()
}
