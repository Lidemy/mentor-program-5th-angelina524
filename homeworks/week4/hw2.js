const request = require('request')

const url = 'https://lidemy-book-store.herokuapp.com'
const action = process.argv[2]
const param = process.argv[3]
const param2 = process.argv[4]

switch (action) {
  case 'list':
    listBooks()
    break
  case 'read':
    readBook(param)
    break
  case 'delete':
    deleteBook(param)
    break
  case 'create':
    createBook(param)
    break
  case 'update':
    updateBook(param, param2)
    break
  default:
    console.log('valid command:list, read, delete, create, update')
}

function listBooks() {
  request(`${url}/books?_limit=20`,
    (err, res, body) => {
      if (err) return console.log('資料抓取錯誤', err)
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
}

function readBook(id) {
  request(`${url}/books/${id}`,
    (err, res, body) => {
      if (err) return console.log('資料抓取錯誤', err)
      if (res.statusCode === 404) return console.log('抓取失敗，找不到書籍資訊')
      let data
      try {
        data = JSON.parse(body)
      } catch (err) {
        console.log(err)
        return
      }
      console.log(`${data.name}`)
    }
  )
}

function deleteBook(id) {
  request.delete(`${url}/books/${id}`,
    (err, res, body) => {
      if (err) return console.log('資料刪除失敗', err)
      if (res.statusCode === 404) return console.log('刪除失敗，找不到書籍資訊')
      console.log('資料刪除成功')
    }
  )
}

function createBook(name) {
  request.post(
    {
      url: `${url}/books`,
      form: {
        name
      }
    }, (err, res, body) => {
      if (err) return console.log('資料新增失敗', err)
      let data
      try {
        data = JSON.parse(body)
      } catch (err) {
        console.log(err)
        return
      }
      console.log('資料新增成功')
      console.log(`${data.id} ${data.name}`)
    }
  )
}

function updateBook(id, newName) {
  request.patch(
    {
      url: `${url}/books/${id}`,
      form: {
        name: newName
      }
    }, (err, res, body) => {
      if (err) return console.log('資料更新失敗', err)
      if (res.statusCode === 404) return console.log('更新失敗，找不到書籍資訊')
      let data
      try {
        data = JSON.parse(body)
        console.log('資料更新成功')
      } catch (err) {
        console.log(err)
        return
      }
      console.log(`${data.id} ${data.name}`)
    }
  )
}
