async function unfavoriteArticle(slug) {
  const optionsObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'TOKEN',
    },
  }
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, optionsObj)
  return response.ok
}

export default unfavoriteArticle
