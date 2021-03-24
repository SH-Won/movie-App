const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post('/favoriteNumber',(req,res)=>{
    Favorite.find({movieId:req.body.movieId})
    .exec((err,favorites)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true, number:favorites.length})
    })
})
router.post('/favorited',(req,res)=>{
    Favorite.find({movieId:req.body.movieId,userFrom:req.body.userFrom})
    .exec((err,favorited)=>{
        if(err) return res.status(400).json({success:false,err})

        let result=false;
        if(favorited.length !== 0){
            result=true
        }
        res.status(200).json({success:true,result})
    })
})
router.post('/addFavorite',(req,res)=>{
    const favorite = new Favorite(req.body)
    favorite.save((err,result)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
   

    })
    
})
router.post('/subFavorite',(req,res)=>{
    Favorite.findOneAndDelete({movieId:req.body.movieId,userFrom:req.body.userFrom})
    .exec((err,result)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
   
    })
})
router.post('/userFavorite',(req,res)=>{
   Favorite.find({'userFrom':req.body.userFrom})
   .exec((err,favorite)=>{
       if(err) return res.status(400).json({success:false,err})
       res.status(200).json({success:true, favorite})
   })
    
})
router.post('/removeUserFavorite',(req,res)=>{
    Favorite.findOneAndDelete({movieId:req.body.movieId,userFrom:req.body.userFrom})
    .exec((err,result)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })
     
 })


module.exports = router;
