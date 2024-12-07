async function updateArticle(articleObj, slug) {
  // {
  //   "article": {
  //   "title": "string",
  //     "description": "string",
  //     "body": "string",
  // }
  // }
  const optionsObj = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'TOKEN',
    },
    body: JSON.stringify(articleObj),
  }
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, optionsObj)
  const body = await response.json()
  return body
}

export default updateArticle
