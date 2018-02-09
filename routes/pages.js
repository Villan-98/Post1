const route=require('express').Router()
const ctrl_post=require('../controllers/posts')
route.get('/profile',(req,res)=>{
    /*if(req.user){
        res.render('/profile')
    }
    else{
        res.redirect('/login/signin')
    }*/

    res.render('profile')
})
route.get('/home',(req,res)=>{
    ctrl_post.getpost()
        .then((posts)=>{
            res.render('home',{posts})
        })
    if(req.user){

    }
    console.log("sdkjf"+req.body)

})

exports=module.exports=route