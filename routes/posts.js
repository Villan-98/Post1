const route=require('express').Router()
const ctrl=require('../controllers/posts')
route.post('/',(req,res)=>{
    console.log("reached")
    ctrl.addPost(req.body)
        .then(()=>{
            res.status(200).json({message:'product added'})
        })
        .catch((err)=>{
            res.status(500).json({message:'oops some error occur'})
        })
})
route.get('/',(req,res)=>{
    console.log("reaching in get")
    ctrl.getpost(req.body)
        .then((post)=>{
            res.status(201).json({post})
        })
        .catch((err)=>{
            res.status(500).json({message:err})
        })
})
exports=module.exports=route