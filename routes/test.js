const route=require('express').Router()
//const ctrl=require('../controllers/posts')

const ctrl=require('../controllers/like')
route.get('/abc',(req,res)=>{
    ctrl.getAll()
        .then((data)=>{
            console.log(data)
            res.status(201).json({data})
        })
        .catch((err)=>{
            console.log(err)
            res.status(404).json({err})
        })
  /*  ctrl.getallpost()
        .then((data)=>{
            console.log(data)
            res.status(201).json({data})
        })
*/
})
exports=module.exports=route