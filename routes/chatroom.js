const route=require('express').Router()
const user=require('../controllers/user')
route.get('/',(req,res)=>{
    if(!req.user)
    {
        res.redirect('./login/signin')
    }
    else{
        user.getallUser_clg(req)
            .then((data)=>{
                res.render('chat',{data,layout:false})
            })
            .catch((err)=>{
                res.status(404).json(err)
            })
    }
})
exports=module.exports=route