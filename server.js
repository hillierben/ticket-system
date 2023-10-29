const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {
  
  // random number
  const num = _.random(0, 20)
  console.log(num)

  // lodash function to only run function once
  const greet = _.once(() => {
    console.log('hello you bastard')
  })
  
  greet()
  greet()

  let path = './views/'

  switch(req.url) {
    case '/':
      path += 'index.html'
      res.statusCode = 200
      break
    case '/about':
      path += 'about.html'
      res.statusCode = 200
      break
    // redirect page
    case '/about-me':
      path += 'about.html'
      res.statusCode = 301
      break
    default:
      path += '404.html'
      res.statusCode = 404
      break
  }


  res.setHeader('content-type', 'text/html')
  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
      // always need to end, otherwise the request will continue spinning away
      res.end()
    } else {
      // you can ACTUALLY just to .end() instead of .wrtie(). Add the data as an argument
      // always need to end, otherwise the request will continue spinning away
      res.end(data)
    }
  })
})

server.listen(3000, 'localhost', () => {
  console.log('listening on port 3000')
})