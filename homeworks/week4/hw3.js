const request = require('request')

const url = 'https://restcountries.eu/rest/v2/name'

function main() {
  const param = process.argv[2]
  if (!param) {
    return console.log('請輸入國家名稱')
  }
  request(`${url}/${param}`,
    (err, res, body) => {
      if (err) return console.log('資料抓取失敗', err)
      if (res.statusCode === 404) return console.log('找不到國家資訊')
      let data
      try {
        data = JSON.parse(body)
      } catch (err) {
        console.log(err)
        return
      }
      for (let i = 0; i < data.length; i++) {
        console.log('============')
        console.log(`國家：${data[i].name}`)
        console.log(`首都：${data[i].capital}`)
        console.log(`貨幣：${data[i].currencies[0].code}`)
        console.log(`國碼：${data[i].callingCodes}`)
      }
    }
  )
}
main()
