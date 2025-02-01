async function getArticle(slug) {
  if (slug) {
    const optionsObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, optionsObj)
    if (response.ok) {
      const body = await response.json()
      return body
    }
  }
  throw new Error('No slug!')
}

export default getArticle
