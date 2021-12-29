var express = require("express");
const { model } = require("mongoose");
var router = express.Router();
const Post = require("../models/post");
const User = require("../models/user")


// https://riptutorial.com/mongoose/example/21388/saving-current-time-and-update-time
router.post("/newpost",async (req,res,next)=>{
 
  console.log(req.fullname)
  let now = new Date();
  let addservice = new Post({
    user:req.fullname,
    comment:req.body.comment,
    types:req.body.types,
    title:req.body.title,
    description:req.body.description,
    created_at: req.created_at,
  });
  await addservice.save();
    res.json({data:addservice})
});



router.get("/:types",async (req,res)=>{
  let result = req.params.types;
  if(result==='helper'){
    const getHelper = await Post.find({types:'helper'}).sort({created_at:-1})
    res.json({getHelper})
  }if(result==='service'){
    const getService = await Post.find({types:'service'}).sort({created_at:-1})
    res.json({getService})
  }
})

router.get("/:pid/comment/:cid",async(req,res,next)=>{
  const comment = await Post.find({
         _id:req.params.pid,"comment.id":req.params.cid},
       )
       res.send({data: comment});
 })

router.put("/:pid/comment",async (req,res)=>{
  const commentInfo = {
    user:req.fullname,
    comment:req.body.comment,
    city:req.city
  }
  await Post.updateOne({_id: req.params.pid},{$push:{comment:commentInfo}} 
  )
  const stu = await Post.findById({_id: req.params.pid});
res.json({data: stu});
  
})



router.get("/user/:id", async(req, res) => {
  let user = await User.findById({ _id: req.params.id }).sort({created_at:-1})
  res.json({data:user})
});



router.post("/user/:cid", async (req, res) => {
  const result = await User.updateOne({_id:req.params.cid},{$set:{
    fullname: req.body.fullname,
    city:req.body.city,
    state:req.body.state,
    zipcode:req.body.zipcode,
    phone:req.body.phone
  
  }},{upsert:true})
  res.json(result)

 });


 
// https://www.tutorialguruji.com/node-js/mongoose-delete-records-after-certain-time/
// 86400 is 3600 seconds (1 hour) by 24 (hours)
async function deleteOldPost(){
  const xcurentDate = new Date(Date.now());
  const hours48 = xcurentDate - 48*60*60*8000;
  await Post.deleteMany({"created_at":{$lt : hours48}})
  
  // recall the function after 1 days,
  setTimeout(async function(){
    await deleteOldPost();
  },86400)
}

// deleteOldPost();

module.exports = router;