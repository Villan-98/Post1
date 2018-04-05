const route=require('express').Router()
const ctrl=require('../controllers/achievements')

//const ctrl=require('../controllers/like')
route.get('/abc',(req,res)=>{
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