async function getArticle(slug) {
  if (slug) {
    const token = localStorage.getItem('token')
    const optionsObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
