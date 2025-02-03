async function unfavoriteArticle(slug) {
  const token = localStorage.getItem('token')
  const optionsObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, optionsObj)
  const body = await response.json()
  return body
}

export default unfavoriteArticle
