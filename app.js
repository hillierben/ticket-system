const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const dbURI = 'mongodb+srv://hillierben:JCNZXhpMDnf4vvT0@expresscluster.nwygtof.mongodb.net/expressDb?retryWrites=true&w=majority'

// this is an async function
// we don't want to start listening for requests, until the server has connected to the database. 
// So, use the .then to start listening after databse is connected
mongoose.connect(dbURI)
  .then((result => app.listen(3000)))
  .catch((err) => console.log(err))

// use EJS to insert dynamic content
app.set('view engine', 'ejs');



// app.use((req, res, next) => {
//   console.log('new request made')
//   console.log(`host: ${req.hostname}`)
//   console.log(`path: ${req.path}`)
//   console.log(`method: ${req.method}`)

//   // you have to tell the server to move onto the next function, other wise it hangs
//   next();
// })

// middleware - Add static files
app.use(express.static('./static'))

// going to use Morgan instead, to log data about the request
app.use(morgan('combined'))

//

app.get('/', (req, res) => {
  const blogs = [
    {title: 'bob', role: ' dick', age: 5},
    {title: 'crispin', role: ' gum', age: 6},
    {title: 'trdfg', role: ' glirb', age: 7}
  ]
  res.render('index', {
    title: 'Home',
    blogs
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About'
  })
})

// redirect
app.get('/blogs/create', (req, res) => {
  res.render('create', {
    title: 'Create'
  })
})

// use this function for every single request - if a previous get request is actioned, and a response is returned, then the code will not reach this point
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Error'
  })
})