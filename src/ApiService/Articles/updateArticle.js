async function updateArticle(articleObj, slug) {
  const token = localStorage.getItem('token')
  const optionsObj = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(articleObj),
  }
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, optionsObj)
  if (response.status === 403) {
    throw new Error('It is not your article!')
  }
  const body = await response.json()
  return body
}

export default updateArticle
