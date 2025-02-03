async function favoriteArticle(slug) {
  const token = localStorage.getItem('token')
  const optionsObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, optionsObj)
  const body = await response.json()
  return body
}

export default favoriteArticle
