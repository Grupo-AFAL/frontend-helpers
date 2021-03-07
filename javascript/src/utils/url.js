export const currentRelativeUrl = () => {
  return window.location.pathname + window.location.search
}

export const get = (path, queryParams = {}) => {
  const searchParams = new URLSearchParams()
  Object.keys(queryParams).forEach(key => {
    searchParams.append(key, queryParams[key])
  })

  let url = path

  if (Object.keys(queryParams).length > 0) {
    url = url + '?' + searchParams.toString()
  }

  return fetch(url)
}
