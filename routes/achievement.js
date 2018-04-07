const route=require('express').Router()
const ctrl=require('../controllers/achievements')
const Post=require('../controllers/posts')

route.get('/',(req,res)=>{
    Post.HVPost()
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{
          console.log(err)
        })
})
exports=module.exports=route