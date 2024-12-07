async function registerNewUser(userObj) {
  // {
  //   "user": {
  //     "username": "string",
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
  const response = await fetch('https://blog-platform.kata.academy/api/users', optionsObj)
  const body = await response.json()
  return body.user
}

// {
//   "user": {
//   "email": "jake@jake.jake",
//     "token": "jwt.token.here",
//     "username": "jake",
//     "bio": "I work at State Farm.",
//     "image": null
//    }
// }

export default registerNewUser
