/* eslint-disable */
import React from 'react'
import Markdown from 'markdown-to-jsx'

function MarkdownText() {
  return (
    <div className="markdown-text">
      <Markdown>
          **жирный**
          __жирный__

          ~~зачеркнутый~~

          Кор*рек*тно, кор**рек**тно, кор***рек***тно

          Некор_рек_тно, некор__рек__тно, некор___рек___тно


          - [x] Отмеченный пункт
          - [ ] Неотмеченный пункт

          ![Изображение](https://cs14.pikabu.ru/post_img/2023/02/13/8/1676295806139337963.jpg "Картинка")

          ```javascript
          let x = 12;
          let y = 6;
          console.log(x + y);
          ```
      </Markdown>
    </div>
  )
}

export default MarkdownText
