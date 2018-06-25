const express =require('express')
const session=require('express-session')
const passport=require('./passport')
const path=require('path')
const hbs=require('express-hbs')
const sessionStore=require('express-session-sequelize')(session.Store)
const database=require('./db/models').db
const http = require('http')
const socketio = require('socket.io')


const app = express()

const server = http.createServer(app)
const io = socketio(server)

const sequelizeSessionStore=new sessionStore({
    db:database,
    expiration:100
})
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret:'something vey secret',
    resave:false,
    saveUninitialized:false,
    store:sequelizeSessionStore
}))
app.engine('hbs',hbs.express4({
    defaultLayout:path.join(__dirname,'views/layouts/default'),
    partialsDir:path.join(__dirname,'views/partials'),
    layoutDir:path.join(__dirname,"views/layouts")
}))

//Socket
let socketIdName = {}
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views/pages'))
app.get('/logout',(req,res)=>{
    console.log("reached in logout")
    req.user=null
    req.logout()
    req.session.destroy((err)=>{
        res.redirect('/auth/signin')
    })
})
app.get('/',(req,res)=>{

  res.render('home')

})
app.use('/',express.static(path.join(__dirname,'public')))
app.use('/auth',require('./routes/Rauth'))
app.use('/:name', require('./routes/Ruser'))
app.use('/leader',require('./routes/achievement'))
app.use('/upload',require('./routes/upload'))
app.use('/like',require('./routes/like'))
app.use('/test',require('./routes/test'))
app.use('/chat',require('./routes/chatroom'))

io.on('connection',function(socket){
    console.log("socket id is "+socket.id)
    socket.on('login',(data)=>{
        socketIdName[socket.id]=data.username
        socket.join(data.username)
        console.log(data.username)
        socket.emit('logged_in',{
            username:data.username,
            success:true
        })
    })
    socket.on('chat',(data)=>{
        if(socketIdName[socket.id])
        {
            if(data.message.charAt(0)==='@'){
                let receptient=data.message.split[0].substring(1)
                io.to(receptient).emit('chat',{
                    private:true,
                    sender:socketIdName[socket.id],
                    message:data.message,
                    timestamp:new Date()
                })
            }
            else{
                socket.setBroadcast.emit('chat',{
                    sender:socketIdName[socket.id],
                    message:data.message,
                    timestamp:new Date()
                })
            }
        }
    })
})
server.listen(8888,()=>{
    console.log("listening to port 2400")
})


