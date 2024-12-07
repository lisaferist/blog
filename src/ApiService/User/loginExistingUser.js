async function loginExistingUser(userObj) {
  // {
  //   "user": {
  //     "email": "string",
  //     "password": "string"
  //   }
  // }
  const optionsObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  }
  const response = await fetch('https://blog-platform.kata.academy/api/users/login', optionsObj)
  const body = await response.json()
  return body.user
}

export default loginExistingUser
