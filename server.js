const express =require('express')
const session=require('express-session')
//const passport=require('./passport/1')
const path=require('path')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine','hbs')


app.use('/',express.static(path.join(__dirname,'public')))
app.use('/products',require('../Pitching/routes/products'))
app.use('/categories',require('../Pitching/routes/categories'))
app.use('/cart',require('../Pitching/routes/cart'))
//app.use('/login',require('./routes/abc'))
app.use('/login',require('./routes/user1'))
app.use('/user', require('./routes/pages'))
app.use('/post',require('./routes/posts'))
app.listen(2400,()=>{
    console.log("listening to port 2400")
})


