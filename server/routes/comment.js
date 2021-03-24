const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");


router.post('/saveComment',(req,res)=>{
    const comment = new Comment(req.body)
    comment.save((err,comment)=>{
      if(err) return res.status(400).json({success:false,err})

      Comment.find({'_id':comment.id})
      .populate('writer')
      .exec((err,comments)=>{
          if(err) return res.status(400).json({success:false,err})
          res.status(200).json({success:true,comments})
      })

    })
})

router.post('/getComment',(req,res)=>{
    Comment.find({movieId:req.body.movieId})
    .populate('writer')
    .exec((err,comments)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,comments})
    })
})


module.exports = router;
