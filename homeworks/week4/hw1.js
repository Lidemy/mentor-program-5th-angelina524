const request = require('request')

request('https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (err, res, body) => {
    if (err) {
      return console.log('資料抓取錯誤', err)
    }
    let data
    try {
      data = JSON.parse(body)
    } catch (err) {
      console.log(err)
      return
    }
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id} ${data[i].name}`)
    }
  }
)
