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
 * 3 Different scenarios:
 *
 * 1. Submit a form with GET method and html responseKind.
 *    In this scenario the FromData is converted into a query string and
 *    submitted using Turbo.visit (which updates the URL)
 *
 * 2. Submit a form with GET and turbo-stream responseKind.
 *    In this scenario we also use the FormData to generate a query string
 *    but use request.js to send the request with the turbo-stream responseKind
 *    and also need to manually update the URL.
 *
 * 3. Submit a form with POST/PATCH with either html or turbo-stream
 *    responseKind. In this case we just send the formData as part of the body
 *    using request.js. No need to update the URL or serialize the formData
 *
 * @param {HTMLFormElement} formElement - Form element to be submitted
 * @returns {Promise} Promise resolves to an Object with { responseText, ok }
 */
export const submitForm = async (
  formElement,
  { method, responseKind = 'html' } = {}
) => {
  const requestMethod = method || extractFormMethod(formElement)
  const url = generateURL(formElement, requestMethod)

  if (requestMethod === 'get' && responseKind === 'html') {
    return window.Turbo.visit(url)
  }

  const options = { responseKind }
  if (requestMethod !== 'get') {
    options.body = new FormData(formElement)
  }

  const request = new FetchRequest(requestMethod, url, options)
  const response = request.perform()

  if (requestMethod === 'get') {
    window.history.pushState({}, '', url)
  }

  return response
}

const generateURL = (formElement, method) => {
  const url = formElement.getAttribute('action')

  if (method !== 'get') return url

  return url + '?' + queryParams(formElement).toString()
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
