const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./src/config');

const app = express();

// require routes
const userRoutes = require('./src/routes/user');
const usersRoutes = require('./src/routes/users');
const postRoutes = require('./src/routes/post');
const postsRoutes = require('./src/routes/posts');
const commentRoutes = require('./src/routes/comment');
const commentsRoutes = require('./src/routes/comments');
const notificationsRoutes = require('./src/routes/notifications');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoUri, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/users', usersRoutes);
app.use('/post', postRoutes);
app.use('/posts', postsRoutes);
app.use('/comment', commentRoutes);
app.use('/comments', commentsRoutes);
app.use('/notifications', notificationsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('server started on port ' + PORT);
});
