const express = require('express');
const bodyParser = require('body-parser');
const mongoose = requrie('mongoose');
const keys = require('./src/config');

const app = express();

// require routes
const userRoutes = require('./src/routes/user');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoUri, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('server started on port ' + PORT);
});
