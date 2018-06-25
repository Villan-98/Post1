const route=require('express').Router()
const passport=require('../passport')
const ctrl=require('../controllers/user')
const checkEmpty=function(data){
    if(data==='')
        return true
    else
        return false
}
route.get('/signin',(r,s)=>{
    s.render('signin')
})
route.get('/google',passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
route.get('/google/callback',passport.authenticate('google', { failureRedirect: '/signin' }),
    function(req, res) {
        res.redirect('/'+req.user.username+'/editProfile');
    })
route.get('/signup',(r,s)=>{
    s.render('signup')
})
route.post('/signin', passport.authenticate('local', {
    failureRedirect: '/auth/signin'
}),(req,res)=>{
    res.redirect('/'+req.user.username)
})
route.post('/signup',(req,res)=>{
    console.log(req.body)

    if(checkEmpty(req.body.email)||checkEmpty(req.body.userName))
    {
        console.log("email")
        let alert="enter the email address and Username are compulsory"
        res.render('signup',{alert})
    }else{
        if(checkEmpty(req.body.college))
        {
            console.log("clg")
            let alert="College Name and Course Year are compulsory"
            res.render('signup',{alert})
        }
        else
        {
            console.log("free")
            ctrl.check_email(req.body)
                .then((data)=>{
                    if(data){
                        let alert="Already a existing user through this email id"
                        res.render('signup',{alert})
                    }
                    else{
                        ctrl.checkUser(req.body.userName)
                            .then((user)=>{
                                if(user){
                                    let  alert="Already an existing user through this username"
                                    res.render('signup',{alert})
                                }
                                else
                                {
                                    if(req.body.password===req.body.confPassword && !checkEmpty(req.body.password))
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

                                        let alert="Password and Conf_password are not correct"
                                        res.render('signup',{alert})
                                    }
                                }

                            })

                    }
                })

        }

    }
   // res.render('signup',{alert})
})

exports=module.exports=route
