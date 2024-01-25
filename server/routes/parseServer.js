const docx2html = require("docx2html");
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const { WordsApi, ConvertDocumentRequest } = require('asposewordscloud');
const path = require('path');
const axios = require('axios');

const upload = multer({ dest: 'build/static/js' });

module.exports = router;

router.post('/about/write/:section', upload.single('document'), function (req, res) {
  console.log(path.join(__dirname, '..', 'build', 'static', 'media', req.params.section + '.docx'));
  const file = req.file;

  fs.rename(file.path, path.join(__dirname, '..', 'build', 'static', 'media', req.params.section + '.docx'), function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send('Error occurred while saving the document');
    }
/*
    // Get Access Token from Aspose
    const tokenEndpoint = 'https://api.aspose.cloud/connect/token';
    const clientId = 'abc2a83f-93c2-4cbd-84d0-2a9d38099378';
    const clientSecret = 'a68db9ad8c15b0a9a36448fbee8e7f1d';

    const data = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
var token;
    axios.post(tokenEndpoint, data, config)
      .then(response => {
        const accessToken = response.data.access_token;
        token = response.data.access_token;
        console.log(accessToken);
      })
      .catch(error => {

        res.status(500).send('Error occurred while getting access token');
      });
      */
   // Initialize WordsApi with the obtained access token
   const wordsApi = new WordsApi("abc2a83f-93c2-4cbd-84d0-2a9d38099378", 'a68db9ad8c15b0a9a36448fbee8e7f1d');

   const doc = fs.createReadStream(path.join(__dirname, '..', 'build', 'static', 'media', req.params.section + '.docx'));
   const request = new ConvertDocumentRequest({
     document: doc,
     format: "html"
   });
   console.log("go");
   wordsApi.convertDocument(request)
     .then((convertDocumentResult) => {
       // Assuming `convertDocumentResult` contains the converted content
       // Write the converted content to a new file
       console.log("Result of ConvertDocument: ", convertDocumentResult.body);
       const htmlContent = convertDocumentResult.body;
       fs.writeFile(path.join(__dirname, '..', 'build', 'static', 'media', req.params.section + '.html'), htmlContent, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error occurred while saving the document');
        }

         res.status(200).json({ message: 'Document uploaded and converted successfully' });
         console.log('Document uploaded and converted successfully');
       });
     })
     .catch((err) => {
       console.log(err);
       res.status(500).send('Error occurred during document conversion');
     });
  });
});

router.get('/about/read/:section', (req, res) => {
  const filePath = path.join(__dirname, '..', 'build', 'static', 'media', req.params.section + ".html");
  res.sendFile(filePath);
});

router.get('/courses/read/:section', (req, res) => {
  const filePath = path.join(__dirname, '..', 'build', 'static', 'media', req.params.section + ".html");
  res.sendFile(filePath);
});
