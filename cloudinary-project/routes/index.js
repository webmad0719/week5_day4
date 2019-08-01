const express = require('express');
const router = express.Router();

const Movie = require('../models/movie.model')

const uploadCloud = require('../configs/cloudinary.config');


router.get('/', (req, res, next) => {

  Movie.find()
    .then((movies) => {
      res.render('index', { movies });
    })
    .catch((error) => {
      console.log(error);
    })
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add');
})



router.post('/movie/add', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  Movie.create({ title, description, imgPath, imgName })
    .then(movie => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router;
