const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

router.post('/likeNumber',(req,res)=>{
    let variable ={}
    if(req.body.movieId){
        variable={movieId:req.body.movieId}
    }
    else{
        variable={commentId:req.body.commentId}
    }
    Like.find(variable)
    .exec((err,likes)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,likes})
    })
})
router.post('/dislikeNumber',(req,res)=>{
    let variable ={}
    if(req.body.movieId){
        variable={movieId:req.body.movieId}
    }
    else{
        variable={commentId:req.body.commentId}
    }
    Dislike.find(variable)
    .exec((err,disLikes)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,disLikes})
    })
})
router.post('/addLike',(req,res)=>{
    let variable ={}
    if(req.body.movieId){
        variable={movieId:req.body.movieId,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
    const like = new Like(variable)
    like.save((err,like)=>{
        if(err) res.status(400).json({success:false,err})
        Dislike.findOneAndDelete(variable)
        .exec((err,result)=>{
            if(err) res.status(400).json({success:false,err})
            res.status(200).json({success:true})
        })
    })
})

router.post('/subLike',(req,res)=>{
    let variable ={}
    if(req.body.movieId){
        variable={movieId:req.body.movieId,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
    Like.findOneAndDelete(variable)
    .exec((err,result)=>{
        if(err) res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })
})
router.post('/addDisLike',(req,res)=>{
    let variable ={}
    if(req.body.movieId){
        variable={movieId:req.body.movieId,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
    const disLike = new Dislike(variable)
    disLike.save((err,disLike)=>{
        if(err) res.status(400).json({success:false,err})
        Like.findOneAndDelete(variable)
        .exec((err,result)=>{
            if(err) res.status(400).json({success:false,err})
            res.status(200).json({success:true})
        })
    })
})
router.post('/subDisLike',(req,res)=>{
    let variable ={}
    if(req.body.movieId){
        variable={movieId:req.body.movieId,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
    Dislike.findOneAndDelete(variable)
    .exec((err,result)=>{
        if(err) res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })
})



module.exports = router;
