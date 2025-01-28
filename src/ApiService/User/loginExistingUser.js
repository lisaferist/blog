async function loginExistingUser(userObj) {
  // {
  //   "user": {
  //     "email": "string",
  //     "password": "string"
  //   }
  // }
  const bodyObj = JSON.stringify(userObj)
  const optionsObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: bodyObj,
  }
  const response = await fetch('https://blog-platform.kata.academy/api/users/login', optionsObj)
  const body = await response.json()
  // {
  //   "user": {
  //   "email": "jake@jake.jake",
  //   "token": "jwt.token.here",
  //   "username": "jake",
  //   "bio": "I work at State Farm.",
  //   "image": null
  //   }
  // }
  return body
}

export default loginExistingUser
