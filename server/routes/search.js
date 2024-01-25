const express = require('express');
const router = express.Router();
const Posts = require('../models/post');

module.exports = router;



//get posts by string
router.get('/api/string/:string', getPostByString, (req, res) => {
    res.json(res.post); 
    })  




async function getPostByString(req, res, next){
    try{
        const searchString = req.params.string;
        post = await Posts.find({
          $or: [
            { "content": { "$regex": searchString, "$options": "i" } },
            { "contentShort": { "$regex": searchString, "$options": "i" } },
            { "caption": { "$regex": searchString, "$options": "i" } },
          ]
        }).exec();

        if(post == null){
            return res.status(404).json({message: "No post contains this string"});
        }
}catch(err){
        return res.status(500).json({message: err.message});
}
res.post = post;
next();
}