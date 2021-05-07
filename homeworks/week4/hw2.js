const request = require('request')

const url = 'https://lidemy-book-store.herokuapp.com'
const action = process.argv[2]
const param = process.argv[3]
const param2 = process.argv[4]

switch (action) {
  case 'list':
    readingList()
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

function readingList() {
  request(`${url}/books?_limit=20`,
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
}

function readBook(id) {
  request(`${url}/books/${id}`,
    (error, res, body) => {
      if (res.statusCode === 404) return console.log('資料不存在')
      let data
      try {
        data = JSON.parse(body)
      } catch (err) {
        console.log('資料抓取錯誤', error)
        return
      }
      console.log(`${data.name}`)
    }
  )
}

function deleteBook(id) {
  request.delete(`${url}/books/${id}`,
    (error, res, body) => {
      if (res.statusCode === 404) return console.log('資料不存在')
      try {
        console.log('資料刪除成功')
      } catch (err) {
        console.log('資料刪除失敗', error)
      }
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
    }, (error, res, body) => {
      let data
      try {
        data = JSON.parse(body)
        console.log('資料新增成功')
      } catch (err) {
        console.log('資料新增失敗', error)
        return
      }
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
    }, (error, res, body) => {
      if (res.statusCode === 404) return console.log('資料不存在')
      let data
      try {
        data = JSON.parse(body)
        console.log('資料更新成功')
      } catch (err) {
        console.log('資料更新失敗', error)
        return
      }
      console.log(`${data.id} ${data.name}`)
    }
  )
}
