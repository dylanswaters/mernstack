const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
  Post.find()
    .then(posts => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const postTitle = req.body.postTitle;
  const postContents = req.body.postContents;

  const newPost = new Post({
    username,
    postTitle,
    postContents,
  });

  newPost.save()
    .then(() => res.json('post' + postTitle + 'added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
