/*const route=require('express').Router()
const ctrl=require('../controllers/user')
const passport=require('../passport/1')

route.post('/signup',(req,res)=>{
    ctrl.addNewUser(req.body)
        .then((result)=>{
            res.redirect('/sign')
        })

})
route.post('/signin',passport.authenticate('local',{
    successRedirect:'/pages/profile',
    failureRedirect:'/pages/abc'
})
)
*/
const route=require('express').Router()
const ctrl=require('../controllers/user')
//route.get('/profile',(r,s)=>s.render('profile'))
route.get('/signup',(req,res)=>{
    console.log(req.params)
    res.render('signup',{layout:false})
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
                console.log(data)
                if(data){
                    let alert1="already a existing user through this mail"
                    res.render('signup',{alert1,layout:false})
                }
                else{
                    if(req.body.password===req.body.conf_password)
                    {
                        ctrl.add_user(req.body)
                            .then((user)=>{
                                res.redirect('/login/signin')
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
route.get('/signin',(r,s)=>s.render('signin',{layout:false}))
route.post('/signin',(r,s)=>{
    s.redirect('/user/home?userid=12')
   // s.render('profile')
    /*ctrl.fetch_user(r.body)
        .then((user)=>{
        })
        .catch((err)=>{
            console.log(err)
        })*/
})
route.get('/',(r,s)=>{
    ctrl.validate_user(r.query)
        .then((user)=>{
            console.log("user is"+user)
            s.status(500).json({user})

        })
        .catch((err)=>{
            s.status(500).json({message:err})
        })
})
exports=module.exports=route