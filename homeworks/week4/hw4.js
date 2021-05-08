const request = require('request')

request(
  {
    method: 'GET',
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      'Client-ID': 'oeq8ksk29zz9hnioch4q8ffjhjahbw',
      Accept: 'application/vnd.twitchtv.v5+json'
    }
  }, (err, res, body) => {
    if (err) return console.log('資料抓取錯誤', err)
    let data
    try {
      data = JSON.parse(body)
    } catch (err) {
      console.log(err)
      return
    }
    for (let i = 0; i < data.top.length; i++) {
      console.log(`${data.top[i].viewers} ${data.top[i].game.name}`)
    }
  }
)
