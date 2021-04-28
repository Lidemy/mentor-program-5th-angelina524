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
  for (let i = 1; i < lines.length; i++) {
    const [a, b, k] = lines[i].split(' ')

    if (BigInt(a) === BigInt(b)) {
      console.log('DRAW')
    } else if (BigInt(a) > BigInt(b) && Number(k) === 1) {
      console.log('A')
    } else if (BigInt(a) < BigInt(b) && Number(k) === -1) {
      console.log('A')
    } else {
      console.log('B')
    }
  }
}
