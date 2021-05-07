const request = require('request')

request('https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    let data
    try {
      data = JSON.parse(body)
    } catch (err) {
      console.log('資料抓取錯誤', error)
      return
    }
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id} ${data[i].name}`)
    }
  }
)
