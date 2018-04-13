const express =require('express')
const session=require('express-session')
const passport=require('./passport')
const path=require('path')
const hbs=require('express-hbs')
////
FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
        clientID: "1723550591000838",
        clientSecret: "1723550591000838|uVqJyxhGT6ouLzcmtcyljmpuMHo",
        callbackURL: "http://localhost:2400/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate( function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));

///
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret:'something vey secret',
    resave:false,
    saveUninitialized:false
}))
app.engine('hbs',hbs.express4({
    defaultLayout:path.join(__dirname,'views/layouts/default'),
    layoutDir:path.join(__dirname,"views/layouts")
}))
app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: 'read_stream' })
);
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views/pages'))
app.get('/logout',(req,res)=>{
    console.log("reached in logout")
    req.user=null
    req.logout()
    req.session.destroy((err)=>{
        res.redirect('/')
    })
})
//app.get('/auth/facebook',passport.authenticate('facebook'))
app.get('auth/facebook/callback',passport.authenticate('facebook',{successRedirect:'/home',failureRedirect:'/login/signin'}))
app.use('/',express.static(path.join(__dirname,'public')))
app.use('/login',require('./routes/user'))
app.use('/login1',require('./routes/user1'))
app.use('/user', require('./routes/pages'))
app.use('/leader',require('./routes/achievement'))
app.use('/post',require('./routes/posts'))
app.use('/like',require('./routes/like'))
app.use('/test',require('./routes/test'))

app.listen(2400,()=>{
    console.log("listening to port 2400")
})


