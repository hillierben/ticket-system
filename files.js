const fs = require('fs')

// // read files - this is asynchronous

// fs.readFile('./blogs/blog1.txt', (err, data) => {
//   if (err) {
//     console.log(err)
//   }
//   console.log(data.toString())
// })

// console.log('last line')

// // write file
// fs.writeFile('./blogs/blog2.txt', 'hello booby jim', () => {
//   console.log('file was written')
// })


// make directory

const dir = './assets'

if (!fs.existsSync(dir)) {
  fs.mkdir(dir, (err) => {
    err ? console.log(err) : console.log('folder created')
  })
} else {
  fs.rmdir(dir, (err) => {
    err ? console.log(err) : console.log('deleted folder')
  })
}


// delete files
if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (err) => {
    err && console.log(err)
  })
}


