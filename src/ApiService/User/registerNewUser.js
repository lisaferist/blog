async function registerNewUser(userObj) {
  const bodyObj = JSON.stringify(userObj)
  const optionsObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: bodyObj,
  }
  const response = await fetch('https://blog-platform.kata.academy/api/users', optionsObj)
  const body = await response.json()
  return body
}

export default registerNewUser
