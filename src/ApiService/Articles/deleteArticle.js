async function deleteArticle(slug) {
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
      Authorization: 'TOKEN',
    },
  }
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, optionsObj)
  return response.ok
}

export default deleteArticle
