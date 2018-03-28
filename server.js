const express =require('express')
const session=require('express-session')
const passport=require('./passport')
const path=require('path')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret:'something vey secret',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine','hbs')

app.use('/',express.static(path.join(__dirname,'public')))
//app.use('/products',require('../Pitching/routes/products'))
//app.use('/categories',require('../Pitching/routes/categories'))
//app.use('/cart',require('../Pitching/routes/cart'))
app.use('/login',require('./routes/user'))
app.use('/login1',require('./routes/user1'))
app.use('/user', require('./routes/pages'))
app.use('/post',require('./routes/posts'))
app.use('/like',require('./routes/like'))
app.use('/test',require('./routes/test'))
app.listen(2400,()=>{
    console.log("listening to port 2400")
})


