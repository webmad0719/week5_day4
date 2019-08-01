const express = require('express');
const router = express.Router();

const Picture = require('../models/picture.model')


const multer = require('multer')
const upload = multer({ dest: './public/uploads/' });


router.get('/', (req, res, next) => {
  Picture.find()
    .then(data => res.render('index', { pictures: data }))
    .catch(err => console.log(err))
})





router.post('/upload', upload.single('photo'), (req, res, next) => {

  console.log(req.file)

  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  })

  pic.save()
    .then(x => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router;
