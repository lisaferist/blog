async function postArticle(articleObj) {
  const token = localStorage.getItem('token')
  const optionsObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(articleObj),
  }
  const response = await fetch('https://blog-platform.kata.academy/api/articles', optionsObj)
  const body = await response.json()
  return body
}

export default postArticle
