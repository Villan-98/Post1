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
route.get('/',(req,res)=>{                             //active post button is removed
    if(!req.isAuthenticated())
    {
        res.redirect('/auth/signin')
    }
    else {
        console.log("username is"+req.user.username)
        ctrl_post.getallpost(req.user)
            .then((posts)=>{
                ctrl_post.HVPost()
                    .then((data)=>{
                        console.log("data zero is"+data)        //why is printing object object in console
                        posts['UserId']=req.user.id
                        posts["UserName"]=req.user.name
                        posts['clg']=req.user.college
                        posts['active']=req.active
                        console.log("active is "+req.active)

                        console.log(data[0].dataValues['user'].dataValues['name'])
                        posts['hv_post']=data[0].dataValues['user'].dataValues['name']
                        console.log(posts.hv_post)
                        //res.status(201).json(data)
                        let nav=req.user
                        console.log("nav is ")
                        console.log(nav)
                        res.render('abc',{posts,nav})
                    })
            })
            .catch((err)=>{
                res.status(200).json({message:"cannot fetch all post"})
            })



    }/*
    if(req.user.college===''||(!req.user.username))
    {
        res.redirect('/user/profile')
    }*/

})
route.get('/MyPost',ActivePostButton,(req,res)=>{
    if(!req.user){
        res.redirect('/auth/signin')
    }
    console.log("req user is "+req.user.name)
    ctrl_post.getpost(req.user)
        .then((posts)=>{
           // chk.achieved(posts)
            let nav=req.user
          //  chk.leader()
            console.log("reched in post &")
            posts['UserId']=req.user.id
            posts["username"]=req.user.name
            posts['active']=req.active
            posts['college']=req.user.college
            posts['rights']=req.user.rights
            //res.send(posts)
             res.render('post',{posts,nav})
        })
        .catch((err)=>{
            console.log("error detected")
            console.log(err)
        })
})

route.get('/profile',(req,res)=>{
    if(!req.user)
    {
        res.redirect('https://wakatime.com/project/health_care?start=2018-06-09&end=2018-06-15')
    }
    else{
        console.log("in the user")
                let nav=req.user
                res.render('profile',{r:req,nav})
    }
})
route.get('/achievement',(req,res)=>{
    if(!req.user){
        res.redirect('/auth/signin')
    }
    else{
        ctrl_achieve.getHVPost(req.user)
            .then((data)=>{
                let nav=req.user
                res.render('achievement',{data,nav})

            }
        )
    }
})
route.get('/editProfile',(req,res)=>{
    if(req.isAuthenticated())
    {
        let nav=req.user
        res.render('editProfile',{user:req.user,nav})
    }
    else{
        res.redirect('/auth/signin')
    }
})
route.post('/editProfile',(req,res)=>{
    if(!req.user)
    {
        res.redirect('/auth/signin')
    }
    else{
        let nav=req.user
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
                                //console.log(data)
                                //console.log(req.user.password)
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
                                res.render('profile',{user,nav})
                            }
                        )
                }
                else{
                    user['success']=0
                    user['status']='Password did not matched'
                    res.render('profile',{user,nav})
                }
            }
            else
            {
                user['success']=0
                user['status']='wrong input in confirm password'
                res.render('profile',{user,nav})
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