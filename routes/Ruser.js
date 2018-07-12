const route=require('express').Router()
const ctrl_user=require('../controllers/user')
const ctrl_post=require('../controllers/posts')
const ctrl_achieve=require('../controllers/achievements')
const liked_post=require('../controllers/like')
const ctrlRanker=require('../controllers/ranker')

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
        ctrl_post.getallpost(req.user)
            .then((posts)=>{

                ctrlRanker.getRanker(req.user)
                    .then((ranker)=>{
                        posts['college']=req.user.college
                        let nav=req.user
                        res.render('abc',{nav,ranker,posts})
                    })
                /*
                ctrl_achieve.GlHScorer(req.user)
                    .then((data)=>{
                       // console.log("data zero is"+data)        //why is printing object object in console
                        let ranker={}
                        if(data)
                        {
                            ranker['global']=data.Puser
                        }
                        ctrl_achieve.ClGScorer(req.user)
                            .then((data)=>{
                                if(data)
                                {
                                    ranker['college']=data.Puser
                                }
                                ctrl_achieve.ClBScorer(req.user)
                                    .then((data)=>{
                                        if(data)
                                        {
                                            ranker['clBatch']=data.Puser
                                        }
                                        let date=(store.date('3 week ago'))
                                        console.log(date.toLocaleDateString())
                                        let nav=req.user
                                        //console.log(posts.Puser)
                                        // res.send(posts)
                                        res.render('abc',{posts,nav,ranker})
                                    })
                            })

                    })*/
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
route.get('/chat/:id',(req,res)=>{
    res.render('chat')
})
route.get('/MyPost',ActivePostButton,(req,res)=>{
    if(!req.user){
        res.redirect('/auth/signin')
    }
    console.log("req user is "+req.user.username)
    ctrl_post.getpost(req.user)
        .then((posts)=>{
            ctrlRanker.getRanker(req.user)
                .then((ranker)=>{

                    let nav=req.user
                    let delButton=true
                    //res.send(posts)
                    res.render('post',{posts,nav,delButton,ranker})
                })
           // chk.achieved(posts)
        })
        .catch((err)=>{
            console.log("error detected")
            console.log(err)
        })
})
route.delete('/Mypost',(req,res)=>{
    console.log(req.body)
    ctrl_post.deletePost(req.body)
        .then(()=>{
            res.status(200).json({
                success:true
            })
        })
})
route.get('/profile',(req,res)=>{
    if(!req.isAuthenticated())
    {
        res.redirect('/auth/signin')
    }
    else{
        let nav=req.user
        ctrl_achieve.get_tot_post(req.user)
            .then((data)=>{
                req.user['totalPost']=data
                ctrl_achieve.countBadge(req.user)
                    .then((data)=>{
                        req.user['badgeCount']=data
                    })
                res.render('profile',{r:req,nav})
            })
            .catch((err)=>{
                res.status(404).json({err:err})
            })
    }
})
route.get('/achievement',(req,res)=>{
    if(!req.user){
        res.redirect('/auth/signin')
    }
    else{
        ctrl_achieve.getHVPost(req.user)
            .then((data)=>{
                ctrl_achieve.getBadge(req.user)
                    .then((result)=>{
                        let nav=req.user
                        let badge={}
                        badge['Trophy']=0
                        badge['Gold']=0
                        badge['Silver']=0
                        badge['Bronze']=0
                        result.forEach((medal)=>{
                            if(medal.badgeType==='Trophy')
                            {
                                badge.Trophy++
                            }
                            else if(medal.badgeType==='Gold')
                            {
                                badge.Gold++
                            }
                            else if(medal.badgeType==='Silver')
                            {
                                badge.Silver++
                            }
                            else if(medal.badgeType==='Bronze')
                            {
                                badge.Bronze++
                            }
                        })
                        res.render('achievement',{data,badge,nav})
                    })

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
        let user=req.user
        req.body['id']=req.user.id
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
                                user['alert']='Oops something went wrong. Please Retry!!!'
                                res.render('editProfile',{user,nav})
                            }
                        )
                }
                else{
                    user['success']=0
                    user['alert']='Password did not matched'
                    res.render('editProfile',{user,nav})
                }
            }
            else
            {
                user['success']=0
                user['alert']='wrong input in confirm password'
                res.render('editProfile',{user,nav})
            }

        }
        else{
            req.body['new_pass']=req.user.password
            req.body['id']=req.user.id
            ctrl_user.updateUser(req.body)
                .then((data)=>{
                        if(data[0]===1){
                            ctrl_user.getUser(req.user)
                                .then((user)=>{
                                    res.redirect('/'+user.username+'/profile')
                                })
                        }
                    }
                )
                .catch((err)=>{
                        console.log(err)
                    }
                )
        }
    }
})
exports=module.exports=route