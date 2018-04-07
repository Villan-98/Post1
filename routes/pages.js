const route=require('express').Router()
const ctrl_user=require('../controllers/user')
const ctrl_post=require('../controllers/posts')
const ctrl_achieve=require('../controllers/achievements')
const liked_post=require('../controllers/like')
const chk=require('../controllers/achievements')
function ActivePostButton(req,res,next){
        ctrl_post.getpost(req.user)
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
}/*
route.get('/profile',(req,res)=>{
    /*if(req.user){
        res.render('/profile')
    }
    else{
        res.redirect('/login/signin')
    }

    res.render('profile')
})*/

route.get('/home',(req,res)=>{                             //active post button is removed
    if(!req.user)
    {
        res.redirect('/login/signin')
    }
    ctrl_post.getallpost(req.user)
        .then((posts)=>{
            ctrl_post.HVPost()
                .then((data)=>{

                    console.log(req.user.name)
                    console.log(req.user.id)
                    posts['UserId']=req.user.id
                    posts["UserName"]=req.user.name
                    posts['active']=req.active
                    posts['hv_post']=data
                    console.log("active is "+req.active)
                    //res.status(201).json({posts})
                    res.render('abc',{posts})
                })
        })
        .catch((err)=>{
            res.status(200).json({message:"cannot fetch all post"})
        })



})
route.get('/MyPost',ActivePostButton,(req,res)=>{
    if(!req.user){
        res.redirect('/login/signin')
    }
    console.log("req user is "+req.user.name)
    ctrl_post.getpost(req.user)
        .then((posts)=>{
           // chk.achieved(posts)

          //  chk.leader()
            console.log("reched in post &")
            posts['UserId']=req.user.id
            posts["username"]=req.user.name
            posts['active']=req.active
            posts['college']=req.user.college
            posts['rights']=req.user.rights
            //res.send(posts)
             res.render('post',{posts,layout:false})
        })
        .catch((err)=>{
            console.log("error detected")
            console.log(err)
        })
})

route.get('/profile',(req,res)=>{
    if(!req.user)
    {
        res.redirect('/login/signin')
    }
    else{
        console.log("in the user")
                let user=req.user
                //console.log("sjdfklsjfksljfl"+req.user.name)
                //console.log("sdkjfklsdjfskljflsakfjdsal"+user)
                res.render('profile',{user,layout:false})



    }
})
route.get('/achievement',(req,res)=>{
    if(!req.user){
        res.redirect('/login/signin')
    }
    else{
        ctrl_achieve.getHVPost(req.user)
            .then((data)=>{
                res.render('achievement',{data})

            }
        )
    }
})
route.post('/profile',(req,res)=>{
    if(!req.user)
    {
        res.redirect('/login/signin')
    }
    else{
        console.log(req.body)
        let user=req.user
        req.body['id']=req.user.id
        console.log("req.user"+req.user.password)
        //console.log("user is"+user)
        if(req.body.changeP)
        {
            console.log("changeP")
            if(req.body.new_pass===req.body.conf_pass)
            {
                console.log((req.user.password).toString())
                if(req.body.old_pass===(req.user.password).toString())
                {

                    ctrl_user.updateUser(req.body)
                        .then((data)=>{
                                console.log(data)
                                if(data[0]===1)
                                {
                                    let user=req.user
                                    res.redirect('/user/profile')
                                }
                            }
                        )
                        .catch((err)=>{

                                user['success']=0
                                user['status']='Oops something went wrong. Please Retry!!!'
                                res.render('profile',{user,layout:false})
                            }
                        )
                }
                else{
                    user['success']=0
                    user['status']='Password did not matched'
                    res.render('profile',{user,layout:false})
                }
            }
            else
            {
                user['success']=0
                user['status']='wrong input in confirm password'
                res.render('profile',{user,layout:false})
            }

        }
        else{
            console.log("do not change p")

            req.body['new_pass']=req.body.password
            ctrl_user.updateUser(req.body)
                .then((data)=>{
                        if(data[0]===1){

                            let user=req.user
                            console.log(req.user)
                            user['success']=1
                            user['status']='Profile Updated'
                        }
                    }
                )
                .catch((err)=>{
                        console.log((err)=>{
                            console.log(err)
                        })
                    }
                )
        }
    }
})

exports=module.exports=route