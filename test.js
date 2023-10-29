

// console.log(global)


setTimeout(() => {
  console.log('timeout!')
  clearInterval(int)
}, 3000)

const int = setInterval(() => {
  console.log('interval')
}, 1000)


const dir = __dirname
const file = __filename

console.log(dir, file)