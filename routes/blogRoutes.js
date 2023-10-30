const express = require('express');
const Blog = require('../models/blog')

const router = express.Router();

router.get('/', (req,res) => {
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

router.post('/', (req, res) => {
  const blog = new Blog(req.body)
  
  blog.save()
    .then((result) => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create'
  })
})

// :id allows you to input a parameter from the url, such as an ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('singleBlog', { blog: result, title: 'Blog Details'});
    })
    .catch((err) => {
      console.log(err)
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id)
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({redirect: '/blogs'});
    })
    .catch((err) => {
      console.log(err)
    })
})



module.exports = router;