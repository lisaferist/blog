async function getArticleList() {
  const optionsObj = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await fetch('https://blog-platform.kata.academy/api/articles', optionsObj)
  const body = await response.json()
  return body
}

// {
//   "articles": [
//   {
//     "slug": "how-to-train-your-dragon",
//     "title": "How to train your dragon",
//     "description": "Ever wonder how?",
//     "body": "It takes a Jacobian",
//     "tags": [
//       "dragons",
//       "training"
//     ],
//     "createdAt": "2021-02-18T03:22:56.637Z",
//     "updatedAt": "2021-02-18T03:48:35.824Z",
//     "favorited": false,
//     "favoritesCount": 0,
//     "author": {
//       "username": "jake",
//       "bio": "I work at State Farm.",
//       "image": "https://i.stack.imgur.com/xHWG8.jpg",
//       "following": false
//     }
//   },
//   {
//     "slug": "how-to-train-your-dragon-2",
//     "title": "How to train your dragon 2",
//     "description": "So toothless",
//     "body": "It is a dragon",
//     "tags": [
//       "dragons",
//       "training"
//     ],
//     "createdAt": "2021-02-18T03:22:56.637Z",
//     "updatedAt": "2021-02-18T03:48:35.824Z",
//     "favorited": false,
//     "favoritesCount": 0,
//     "author": {
//       "username": "jake",
//       "bio": "I work at State Farm.",
//       "image": "https://i.stack.imgur.com/xHWG8.jpg",
//       "following": false
//     }
//   }
// ],
//   "articlesCount": 2
// }

export default getArticleList()
