import $ from 'jquery'

export function getComments(BASE_URL, siteKey, before, cb) {
  let url = `${BASE_URL}/api_comments.php?site_key=${siteKey}`
  if (before) {
    url += '&before=' + before
  }
  $.ajax({
    url
  }).done((data) => {
    if (!data.ok) {
      alert(data.message)
      return
    }
    cb(data)
  })
}

export function addComments(BASE_URL, siteKey, data, cb) {
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/api_add-comments.php`,
    data
  }).done((data) => {
    cb(data)
  })
}
