async function favoriteArticle(slug) {
  const optionsObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'TOKEN',
    },
  }
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, optionsObj)
  return response.ok
}

export default favoriteArticle
