const route=require('express').Router()
const passport=require('../passport')
const ctrl=require('../controllers/user')
route.get('/signin',(r,s)=>{
    s.render('signin')
})
route.get('/signup',(r,s)=>{
    s.render('signup')
})
route.post('/signin', passport.authenticate('local', {
    failureRedirect: '/auth/signin'
}),(req,res)=>{
    res.redirect('/'+req.user.name)
})
route.post('/signup',(req,res)=>{
    console.log(req.body.email)
    if(req.body.email==="")
    {
        let alert1="enter the email address"
        res.render('signup',{alert1,layout:false})
    }else{

        ctrl.check_email(req.body)
            .then((data)=>{
                //console.log(data)
                if(data){
                    let alert1="already a existing user through this mail"
                    res.render('signup',{alert1,layout:false})
                }
                else{
                    if(req.body.password===req.body.conf_password)
                    {
                        ctrl.add_user(req.body)
                            .then(()=>{
                                res.redirect('/auth/signin')
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                    }
                    else{

                        let alert2="Password and Conf_password is not same"
                        res.render('signup',{alert2,layout:false})
                    }
                }
            })

    }
})

exports=module.exports=route
