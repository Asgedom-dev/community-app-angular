const mongoose = require('mongoose')
const express = require('express');

const router = express.Router();
module.exports = router;
const Schema = mongoose.Schema


const postSchema = new Schema({
    types:{
        type:String
    },
    description:{
        type: String

    },
    user:{
        type:String   
    },
    email:{
        type:String   
    },
    city:{
        type:String
    },
    created_at: {type: Date, default: Date.now},
    title:{
        type:String
    },
    comment:[
        {
        comment:String,
        created_at: {type: Date, default: Date.now},
        user:{
            type:String
        }
        }
    ]
    })

module.exports = mongoose.model('postSchema', postSchema,"Post")


