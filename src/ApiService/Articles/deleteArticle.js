async function deleteArticle(slug) {
  const token = localStorage.getItem('token')
  // {
  //   "article": {
  //   "title": "string",
  //     "description": "string",
  //     "body": "string",
  // }
  // }
  const optionsObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, optionsObj)
  const body = await response.json()
  return body
}

export default deleteArticle
