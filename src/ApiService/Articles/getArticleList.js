async function getArticleList(offset) {
  const url = offset
    ? `https://blog-platform.kata.academy/api/articles?offset=${offset}`
    : 'https://blog-platform.kata.academy/api/articles'
  const optionsObj = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await fetch(url, optionsObj)
  const body = await response.json()
  return body
}

export default getArticleList
