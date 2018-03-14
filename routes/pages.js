const route=require('express').Router()
const ctrl_user=require('../controllers/user')
const ctrl_post=require('../controllers/posts')
const liked_post=require('../controllers/like')
const chk=require('./achievements')
function activePost(req,res,next){
        ctrl_post.getpost(req.query)
        .then((post)=>{
            let arr=[]
            let db_date=0
            let today=1
            if(post.length>0)           //it is checking if user has not posted any of the post till now i.e checking for empty array comming from db
            {
                arr.push(post[0].dataValues['createdAt'])                       //function to check if the user hav posted his one limited post or not
                db_date= (String(arr[0])).slice(0,15)
                today=(String (new Date())).slice(0,15)
            }
            if(today===db_date){
                req['active']=0
            }
            else{
                req['active']=1
            }
        })
    next()
}
function fetchUser(req,res,next){
    console.log("in the fetch user")
    ctrl_user.validate_user(req.query)
        .then((user)=>{
            if(user){
                req['userName']=user.dataValues.name
                }
        })
        .catch((err)=>{
            console.log("err")
           // res.status(400).json({message:err})
        })


    next()
}
route.get('/profile',(req,res)=>{
    /*if(req.user){
        res.render('/profile')
    }
    else{
        res.redirect('/login/signin')
    }*/

    res.render('profile')
})

route.get('/home',fetchUser,activePost,(req,res)=>{
    ctrl_post.getallpost(req.query)
        .then((posts)=>{

            posts['UserId']=req.query.userId
            posts["UserName"]=req.userName
            posts['active']=req.active
            console.log("active is "+req.active)
            res.render('home',{posts})
        })
        .catch((err)=>{
            res.status(200).json({message:"cannot fetch all post"})
        })



})
route.get('/MyPost',fetchUser,activePost,(req,res)=>{
    ctrl_post.getpost(req.query)
        .then((posts)=>{
            chk.achieved(posts)

          //  chk.leader()
            console.log("reched in post &")
            posts['UserId']=req.query.userId
            posts["UserName"]=req.userName
            posts['active']=req.active
            //res.send(posts)
             res.render('post',{posts})
        })
        .catch((err)=>{
            console.log("error detected")
            console.log(err)
        })
})

exports=module.exports=route