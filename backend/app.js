const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const app = express();

mongoose
  .connect('mongodb://ryanthtra:Qwer1234@ds161062.mlab.com:61062/mean-db-toy')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed!!!');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((createdPost) => {
    console.log(res);
    res.status(201).json({
      message: 'Post added successfully!',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [];
  Post.find()
    .then((docs) => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: docs
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'Post deleted!'
    });
  });
});

module.exports = app;
