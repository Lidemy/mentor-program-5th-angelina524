const request = require('request')

const url = 'https://restcountries.eu/rest/v2/name'

function main() {
  const param = process.argv[2]
  if (!param) {
    return console.log('請輸入國家名稱')
  }
  request(`${url}/${param}`,
    (error, res, body) => {
      if (res.statusCode === 404) return console.log('找不到國家資訊')
      let data
      try {
        data = JSON.parse(body)
      } catch (err) {
        console.log('資料抓取失敗', error)
        return
      }
      console.log('============')
      console.log(`國家：${data[0].name}`)
      console.log(`首都：${data[0].capital}`)
      console.log(`貨幣：${data[0].currencies[0].code}`)
      console.log(`國碼：${data[0].callingCodes}`)
    }
  )
}
main()
