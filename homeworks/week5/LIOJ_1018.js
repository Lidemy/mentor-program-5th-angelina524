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
  const arr = lines[1].split(' ').map(Number)
  console.log(longest(arr))
}

function longest(arr) {
  let max = -Infinity
  const last = Number(arr[arr.length - 1])
  for (let i = 1; i <= last; i++) {
    let temp = 0
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === i) {
        temp++
      }
    }
    if (temp > max) {
      max = temp
    }
  }
  return max
}
