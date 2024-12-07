async function updateCurrentUser(userObj) {
  // {
  //   "email": "jake@jake.jake",
  //   "username": "jake",
  //   "bio": "I work at State Farm.",
  //   "image": null
  // }
  const optionsObj = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'TOKEN',
    },
    body: JSON.stringify(userObj),
  }
  const response = await fetch('https://blog-platform.kata.academy/api/user', optionsObj)
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
export default updateCurrentUser
