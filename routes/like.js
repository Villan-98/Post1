const route=require('express').Router()
const ctrl=require('../controllers/like')
route.post('/',(req,res)=>{
   console.log("reachint to like post")
    console.log("printing body "+req.body.userId)
    ctrl.addLike(req.body)
        .then(()=>{
           // res.redirect('user/Mypost?userId=8343')       //an error of not null occurred in db but it goes further with 200 status
            //why page is not getting refreshed
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({message:err})
        })
})

exports=module.exports=route