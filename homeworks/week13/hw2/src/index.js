import $ from 'jquery'
import { getComments, addComments } from './api'
import { appendCommentToDOM } from './utils'
import { getLoadMoreButton, getForm } from './templates'

export function init(options) {
  let BASE_URL = ''
  let siteKey = ''
  let containerElement = null
  let commentDOM = null
  let lastId = null
  let totalComment = 0
  let isEnd = 0
  let loadMoreClassName
  let commentsClassName
  let commentsSelector
  let formClassName
  let formSelector

  siteKey = options.siteKey
  BASE_URL = options.BASE_URL
  loadMoreClassName = `${siteKey}-load-more`
  commentsClassName = `${siteKey}-comments`
  formClassName = `${siteKey}-add-comment-form`
  commentsSelector = `.${commentsClassName}`
  formSelector = `.${formClassName}`

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))

  getNewComments()

  $(commentsSelector).on('click', `.${loadMoreClassName}`, (e) => {
    $(`.${loadMoreClassName}`).hide()
    getNewComments()
  })

  $(formSelector).submit((e) => {
    e.preventDefault()
    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    const submitDOM = $(`${formSelector} button[type=submit]`)
    submitDOM.attr('disabled', 'true')
    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    }
    addComments(BASE_URL, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message)
        setTimeout(submitDOM.removeAttr('disabled'), 3000)
        return
      }
      nicknameDOM.val('')
      contentDOM.val('')
      appendCommentToDOM(commentDOM, newCommentData, true)
      setTimeout(submitDOM.removeAttr('disabled'), 3000)
    })
  })

  function getNewComments() {
    commentDOM = $(commentsSelector)
    getComments(BASE_URL, siteKey, lastId, (data) => {
      totalComment = data.count
      const comments = data.discussions
      for (let comment of comments) {
        appendCommentToDOM(commentDOM, comment)
      }
      let length = comments.length
      isEnd += 5

      if (isEnd >= totalComment) {
        $(`.${loadMoreClassName}`).hide()
      } else {
        lastId = comments[length - 1].id
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
        commentDOM.append(loadMoreButtonHTML)
      }
    })
  }
}
