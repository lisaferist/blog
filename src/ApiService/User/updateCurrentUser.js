async function updateCurrentUser(userObj) {
  const token = localStorage.getItem('token')
  // {
  //   "email": "jake@jake.jake",
  //   "username": "jake",
  //   "bio": "I work at State Farm.",
  //   "image": null
  // }
  const bodyObj = JSON.stringify({ user: userObj })
  const optionsObj = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: bodyObj,
  }
  const response = await fetch('https://blog-platform.kata.academy/api/user', optionsObj)
  const body = await response.json()
  return body
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
