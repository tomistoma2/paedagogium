const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const exceljs = require('exceljs');
const mongoose = require('mongoose');


module.exports = router;


//getting all
router.get('/api', async (req, res) => {
    try{
        const users = await Users.find();
        res.json(users)
    }catch(err){
        res.status(500).json({message: err.message})
    
    }
});

//getting one
    //users by id
router.get('/api/id/:id', getUser, (req, res) => {
res.json(res.user);
})

//create one user
router.post('/api/user', async (req, res) => {
const user = new Users ({
name: req.body.name,
surname: req.body.surname,
email: req.body.email,
institution: req.body.institution,
})
let userId; //v této proměnné je uloženo Id useras
try{
    const newUser = await user.save();
    res.status(201).json(newUser._id);
   userId = newUser._id._id;
   console.log("created!");
}catch(err){
    res.status(400).json({message: err.message});
}})


router.delete("/api/id/:id", getUser, async (req, res) => {
try{
await res.user.remove();
res.json({message: "deleted"});
}catch(err){
res.status(500).json({message: err.message});
}
})

router.delete("/api/deleteAllUsers", async (req, res) => {

  try {
    // Use the deleteMany method to delete all documents
    const result = await Users.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(200).json({ message: `${result.deletedCount} documents deleted` });
    } else {
      res.status(404).json({ message: "No documents found to delete" });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Failed to delete documents", error: err });
  }
});



  router.get('/api/export-to-excel', async (req, res) => {
    try {
      const users = await Users.find();
  
      // Create a new Excel workbook and worksheet
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Users');
  
      // Define Excel headers
      worksheet.addRow(['Jméno', 'Příjmení', 'Email', 'Instituce', 'Čas registrace']);
  
      // Populate the worksheet with data from the MongoDB collection
      users.forEach((user) => {
        worksheet.addRow([user.name, user.surname, user.email, user.institution, user.timeOfRegistration]);
      });
  
      // Set the content type and disposition for the response
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
  
      // Send the Excel file to the client
      const buffer = await workbook.xlsx.writeBuffer();
      res.send(buffer);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


async function getUser(req, res, next){
    try{
        user = await Users.findById(req.params.id);
        if(user == null){
            return res.status(404).json({message: "User doesnt exist"});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
res.user = user;
next();
}
