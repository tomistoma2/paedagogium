const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');

mongoose.connect("mongodb+srv://cczv:drsq89chem@paedagogium.us6wrrx.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to database"));
app.use(express.json());

const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:3000', "dev-zbydz5ck.us.auth0.com", 'http://localhost:3001', 'nirus.is.cuni.cz'],
  credentials: true,
  accessControlAllowCredentials: true,
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}

app.use(cors(corsOptions));
const posts = require('./routes/posts');
app.use('/posts/', posts);
const users = require('./routes/users');
app.use('/users/', users);
const parse = require('./routes/parseServer.js');
app.use('/parse/', parse);
const carousel = require('./routes/carousel.js');
app.use('/carousel/', carousel);
const search = require('./routes/search.js');
app.use('/search/', search);


var dir = path.join(__dirname, 'build');
app.use(express.static(dir));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(27017, () => {
console.log("Server is running")
});
