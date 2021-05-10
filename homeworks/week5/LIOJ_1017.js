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
  const takeNum = Number(lines[0])
  const total = Number(lines[1])
  const arr = []
  let result = 0
  if (takeNum === 0) {
    result = 0
  } else if (total < takeNum) {
    for (let i = 2; i < lines.length; i++) {
      result += Number(lines[i])
    }
  } else {
    for (let i = 2; i < lines.length; i++) {
      arr.push(Number(lines[i]))
    }
    arr.sort((a, b) => b - a)
    for (let i = 0; i < takeNum; i++) {
      result += arr[i]
    }
  }
  console.log(result)
}
