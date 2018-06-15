const route=require('express').Router()
const Rauth=require('../db/models').User
const passport=require('../passport')
route.get('/signin',(r,s)=>{
    s.render('signin',{layout:false})
})
route.get('/signup',(r,s)=>{

    s.render('signup',{layout:false})
})
route.post('/signin', passport.authenticate('local', {
    successRedirect: '/user/home',
    failureRedirect: '/login/signin'
}))
exports=module.exports=route
