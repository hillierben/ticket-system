const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')


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
app.use(morgan('tiny'))


// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About'
  })
})


// blog routes
app.get('/blogs', (req,res) => {
  Blog.find().sort({ createdAt: -1})
    .then((result) => {
      res.render('index', {
        title: 'Blogs',
        blogs: result,
      })
    })
    .catch((err) => {
      console.log(err)
    })
})


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