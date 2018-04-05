const route=require('express').Router()
const User=require('../db/models').User
const passport=require('../passport')
route.get('/signin',(r,s)=>{
    s.render('signin')
})
route.get('/signup',(r,s)=>{

    s.render('signup')
})
route.post('/signin', passport.authenticate('local', {
    successRedirect: '/user/home',
    failureRedirect: '/login/signin'
}))
exports=module.exports=route
