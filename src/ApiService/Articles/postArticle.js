async function postArticle(articleObj) {
  // {
  //   "article": {
  //   "title": "string",
  //     "description": "string",
  //     "body": "string",
  //     "tags": [
  //     "string"
  //   ]
  // }
  // }
  const optionsObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'TOKEN',
    },
    body: JSON.stringify(articleObj),
  }
  const response = await fetch('https://blog-platform.kata.academy/api/articles', optionsObj)
  const body = await response.json()
  return body.article
}

// {
//   "article": {
//   "slug": "how-to-train-your-dragon",
//     "title": "How to train your dragon",
//     "description": "Ever wonder how?",
//     "body": "It takes a Jacobian",
//     "tags": [
//     "dragons",
//     "training"
//   ],
//     "createdAt": "2023-05-04T09:42:00+00:00",
//     "updatedAt": "2023-05-04T09:42:00+00:00",
//     "favorited": false,
//     "favoritesCount": 42,
//     "author": {
//     "username": "jake",
//       "bio": "I work at State Farm.",
//       "image": "https://api.realworld.io/images/smiley-cyrus.jpg",
//       "following": false
//   }
// }
// }

// postArticle('nu-zayac-pogodi-akivj5').then((obj) => {
//   console.log(obj)
// })

export default postArticle
