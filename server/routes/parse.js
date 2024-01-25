var mammoth = require("mammoth");
const express = require('express');
var fs = require('fs');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const upload = multer({dest: '../build/static/js'})
module.exports = router;
var html;
/*
app.get('/api/about/read/:section', (req, res) => {
  const filePath = path.join(__dirname, 'build', 'static', 'js', 'document.html');
  res.sendFile(filePath);
});*/


//save and convert to html

router.post('/about/write/:section', upload.single('document'), function (req, res) {
  //uloží to docx soubor nahranej z frontendu do server/build/static/media 
  const file = req.file;
  console.log(file.path)
  console.log(file.originalname)
  fs.rename(file.path, 'server/build/static/media/'+req.params.section+'.docx', function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error occurred while saving the document');
    } else {
      res.status(200).json({ message: 'document uploaded successfully' });
      console.log('document uploaded successfully')
    }
  });
//transformuje to nově uložený soubor do html
setTimeout(()=>{
  mammoth.convertToHtml({path: 'server/build/static/media/'+req.params.section+'.docx'})
  .then(function(result){
  html = result.value; // The generated HTML C:\Users\tomas\Coding\ukforum\frontend\src\InfoContent
  fs.writeFile("server/build/static/media/"+req.params.section+".html", result.value, function (err) {
      if (err) return console.log(err);
      console.log(err);
    });
  var messages = result.messages; // Any messages, such as warnings during conversion
      })
      .done();
      console.log("HTML Document generated");
    }, 250)
  })




//takes a request and replies with html file of a name stated in request
  router.get('/about/read/:section', (req, res) => {
    const filePath = path.join(__dirname, "..",'build', 'static', 'media', req.params.section+".html" );
    res.sendFile(filePath);
  });

  router.get('/courses/read/:section', (req, res) => {
    const filePath = path.join(__dirname, "..",'build', 'static', 'media', req.params.section+".html" );
    res.sendFile(filePath);
  });





/*


async function convertor(req, res, next){
        

          mammoth.convertToHtml({path: 'server/htmlbuilder/document.docx'})
          .then(function(result){
          html = result.value; // The generated HTML C:\Users\tomas\Coding\ukforum\frontend\src\InfoContent
          fs.writeFile("server/build/static/js/document.html", result.value, function (err) {
              if (err) return console.log(err);
              console.log(err);
            });
          var messages = result.messages; // Any messages, such as warnings during conversion
              })
              .done();
              console.log("HTML Document generated");
       
    res.post = post;
    next();
    }*/