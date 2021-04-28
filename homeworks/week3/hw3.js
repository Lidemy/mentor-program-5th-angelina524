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
  const n = Number(lines[0])
  const arr = []
  for (let i = 1; i <= n; i++) {
    arr.push(Number(lines[i]))
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      console.log('Composite')
    } else {
      let temp = 0
      for (let j = 1; j <= arr[i]; j++) {
        if (arr[i] % j === 0) {
          temp++
        }
      }
      if (temp === 2) {
        console.log('Prime')
      } else {
        console.log('Composite')
      }
    }
  }
}
