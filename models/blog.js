const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the Schema is what describes the layout of Documents inside the mongo database. 
// it states the name of each item, the TYPE of the item, and whether is is requires and any other 
// you can also add extra options for other items it should include, such as the timestamp for when it was added.

const blogSchema = Schema({
  title: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
}, { timestamps: true});


// models are the interface that allows us to communicate, read, post, with the Documents in the database
// declare the model and link it to the Schema

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;