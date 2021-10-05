import { FetchRequest } from '@rails/request.js'

// Build a URLSearchParam object from the Form inputs
export const queryParams = formElement => {
  const formData = new FormData(formElement)
  const formEntries = [...formData].reduce((entries, [name, value]) => {
    return entries.concat(typeof value === 'string' ? [[name, value]] : [])
  }, [])

  const params = new URLSearchParams()

  for (const [name, value] of formEntries) {
    if (value.length > 0) {
      params.append(name, value)
    }
  }

  return params
}

/**
 * Submits a Form with JavaScript using request.js
 * Can optionally set the HTTP Method and response type.
 *
 * @param {HTMLFormElement} formElement - Form element to be submitted
 * @returns {Promise} Promise resolves to an Object with { responseText, ok }
 */
export const submitForm = async (formElement, { method, responseKind }) => {
  let url = formElement.getAttribute('action')

  const requestMethod = method || extractFormMethod(formElement)
  const options = { responseKind: responseKind || 'turbo-stream' }

  if (requestMethod === 'get') {
    url += '?' + queryParams(formElement).toString()
  } else {
    options.body = new FormData(formElement)
  }

  const request = new FetchRequest(requestMethod, url, options)
  return request.perform()
}

const extractFormMethod = formElement => {
  let method = formElement.getAttribute('method')
  if (method === 'get') return method

  const methodNode = formElement.querySelector('[name="_method"]')
  if (methodNode) {
    method = methodNode.getAttribute('value')
  }

  return method
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
