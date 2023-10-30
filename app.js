const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


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


// middleware - Add static files
app.use(express.static('./static'))
// need to use this middle to access POST / FORM data, eg, req.body
app.use(express.urlencoded({ extended: true}))
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


// blog routes - this separates out the routes - better to modularise different routes
app.use('/blogs', blogRoutes)


// use this function for every single request - if a previous get request is actioned, and a response is returned, then the code will not reach this point
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Error'
  })
})