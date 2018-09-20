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
  post.save();
  res.status(201).json({
    message: 'Post added successfully!'
  });
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'sdfsdf1234',
      title: 'First server-side post',
      content: ' This is coming from the server'
    },
    {
      id: 'sdfsdf1235',
      title: 'Second server-side post',
      content: ' This is coming from the server'
    }
  ];
  // Implicitly ends respsonse writing stream
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
