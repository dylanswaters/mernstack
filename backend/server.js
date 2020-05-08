const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connects to db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection established")
})

const postsRouter = require('./routes/posts');
const mongoose = require('mongoose');

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
})
