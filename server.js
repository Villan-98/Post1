const express =require('express')
const session=require('express-session')
const passport=require('./passport')
const path=require('path')
const hbs=require('express-hbs')
const sessionStore=require('express-session-sequelize')(session.Store)
const database=require('./db/models').db
const http = require('http')
const socketio = require('socket.io')
const ctrlChat=require('./controllers/chat')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

const sequelizeSessionStore=new sessionStore({
    db:database,
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
    if(req.isAuthenticated())
    {
        res.redirect('/'+req.user.username)
    }
    else{
        res.render('home')
    }
})
app.use('/',express.static(path.join(__dirname,'public')))
app.use('/auth',require('./routes/Rauth'))
app.use('/:name', require('./routes/Ruser'))
app.use('/leader',require('./routes/achievement'))
app.use('/upload',require('./routes/upload'))
app.use('/like',require('./routes/like'))
app.use('/test',require('./routes/test'))

io.on('connection',function(socket){
    socket.broadcast.emit('user connected')
    socket.on('joinRoom',(data)=>{
        console.log(data)
        socketIdName[socket.id]=data.username
        socket.join(data.room)
        ctrlChat.getMessage(data)
            .then((messages)=>{
                socket.emit('joined',messages)
            })
       /* socket.join(data.username)
        console.log(data.username)
        console.log(socketIdName)*/

    })
    socket.on('discuss',(data)=>{
        io.sockets.in(data.room).emit('message',{
            message:data.message,
            sender:socketIdName[socket.id]
        })
        data['sender']=socketIdName[socket.id]
        ctrlChat.insertMessage(data)
    })
})
server.listen(8888,()=>{
    console.log("listening to port 2400")
})


