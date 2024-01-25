const express = require('express');
const router = express.Router();
var fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'Images/'})
const path = require('path');


module.exports = router;



//saving image to folder
router.post('/api/image', upload.single('image'), function (req, res) {
    const file = req.file;
    console.log(file.path)
    console.log(file.originalname)
    console.log(__dirname)
    fs.rename(file.path, path.join('build', 'static', 'media', file.originalname), function(err) {
 //   fs.rename(file.path, 'build/static/media/'+file.originalname, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('Error occurred while saving the image');
      } else {
        res.status(200).json({ message: 'image uploaded successfully' });
        console.log('image uploaded successfully')
      }
    });
  });
