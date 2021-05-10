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
  const total = Number(lines[0])
  let aSum = 0
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === 'A') {
      aSum++
    }
  }
  const bSum = total - aSum
  if (aSum === bSum || aSum === 0 || bSum === 0) {
    console.log('PEACE')
  } else {
    const whoLose = aSum > bSum ? 'B' : 'A'
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === whoLose) {
        console.log(i)
      }
    }
  }
}
