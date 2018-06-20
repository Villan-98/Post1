const route=require('express').Router()
const ctrl=require('../controllers/achievements')
const user=require('../controllers/user')
const url=require('../controllers/url')
const Post=require('../controllers/posts')
route.get('/abc',(req,res)=>{
    user.getallUser_clg(req)
        .then((data)=>{
        res.send(201).json(data)
    })
        .catch((err)=>{
            res.status(404).json(err)
        })
    /*ctrl.get_tot_post(req.user)
        .then((data)=>{
        console.log(data)
    })
        .catch((err)=>{
            console.log(err)
        })
    ctrl.get_tot_like(req.user)
        .then((data)=>{

            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    user.get_tot_user()
        .then((data)=>{
            console.log(data)
        })
    console.log("data is "+achv.ref_L_P)
    res.send("hi")*/


    ///let abc=req.user;
    //res.status(201).json({abc})
    /*ctrl.getAll()
        .then((data)=>{
            console.log(data)
            res.status(201).json({data})
        })
        .catch((err)=>{
            console.log(err)
            res.status(404).json({err})
        })*/


})
route.post('/abc',(req,res)=>{
    ctrl.getHVPost(req.body)
        .then((data)=>{
            res.send(data)
            console.log("data"+data)
            //res.status(201).json({data})
        })
    //res.send(req.body)
})
exports=module.exports=route