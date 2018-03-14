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
    //res.status(201).json({req.})      what so i get when i donot pass any params in my get request
    res.render('signup')
    })
route.post('/signup',(req,res)=>{
    ctrl.add_user(req.body)
        .then((user)=>{
            res.redirect('/login/signin')
        })
        .catch((err)=>{
            console.log(err);
        })
})
route.get('/signin',(r,s)=>s.render('signin'))
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