async function getCurrentUser() {
  const optionsObj = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'TOKEN',
    },
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
export default getCurrentUser
