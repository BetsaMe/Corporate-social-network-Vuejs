const express = require('express');
const app = express();
const userRoutes= require('./routes/user');
const postRoutes= require('./routes/post');
const commentRoutes= require('./routes/comment');
const likeRoutes= require('./routes/like');
const path = require('path');

// Accès au corps de la requete
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

//CORS sécurité
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/', (req, res, next) => {
  res.json('Hello world')
});  

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);

module.exports = app;
