const fs = require('fs')

const readStream = fs.createReadStream('./blogs/blog2.txt', {encoding: 'utf8'})
const writeSteam = fs.createWriteStream('./blogs/newBlog.txt')

// readStream.on('data', (chunk) => {
//   console.log('-----NEW CHUNK-------')
//   console.log(chunk)
//   writeSteam.write('\nNEW CHUNK\n')
//   writeSteam.write(chunk)
// })

// piping is an easier way to do this

readStream.pipe(writeSteam)