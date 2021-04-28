const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const line = lines[0].split(' ')
  const startNum = Number(line[0])
  const endNum = Number(line[1])
  for (let i = startNum; i <= endNum; i++) {
    if (isNarcissistic(i)) {
      console.log(i)
    }
  }
}

function isNarcissistic(i) {
  const str = i.toString()
  const digits = Number(str.length)
  let result = 0
  for (let j = 0; j < str.length; j++) {
    result += Math.pow(Number(str[j]), digits)
  }
  if (i === result) {
    return true
  } else {
    return false
  }
}
