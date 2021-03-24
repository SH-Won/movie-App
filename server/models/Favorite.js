const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = mongoose.Schema({
    userFrom:{
        type:Schema.Types.ObjectId,
        ref:'User'

    },
    movieId:{
        type:String
    },
    movieTitle:{
        type:String
    },
    movieRunTime:{
        type:String
    },
    movieImage:{
        type:String

    }
    

},{timestamps:true})

const Favorite = mongoose.model("Favorite",FavoriteSchema)
module.exports={Favorite};