const route=require('express').Router()
const ctrl=require('../controllers/posts')
const chk=require("./achievements")
route.post('/',(req,res)=>{
    console.log("reached")

    ctrl.addPost(req.body)
        .then(()=>{
            res.redirect('user/Mypost?userId=8343')       //an error of not null occurred in db but it goes further with 200 status
                                            //why page is not getting refreshed
        })
        .catch((err)=>{
            res.status(500).json({message:'oops some error occur'})
        })
})
route.get('/mydata',(req,res)=>{
    console.log("my data")
    ctrl.getpost(req.query)
        .then((post)=>{
            res.status(201).json({post})
        })
        .catch((err)=>{
            res.status(500).json({message:err})
        })
})
route.get('/',(req,res)=>{
    let str;
    ctrl.getallpost(req.query)
        .then((post)=>{

            console.log(post)
            res.status(201).json({post})
        })
        .catch((err)=>{
            res.status(500).json({message:err})
        })
})
route.delete('/',(req,res)=>{
    console.log('listening to delete')
    ctrl.deletePost(req.body)
        .then((deleted)=>{
          res.status(200).json({deleted})
        })
        .catch((err)=>{
            res.status(500).json({message:err})
        })
})
route.patch('/',(req,res)=>{
        console.log("reached in patch route")
        ctrl.fetchPost(req.body)
            .then((post)=>{

                req.body['vote']=parseInt(post.dataValues.vote)+parseInt(req.body.value)
                ctrl.addlike(req.body)
                    .then((post)=>{
                        res.status(204).json({post})
                        console.log("like add")
                    })
                    .catch((err)=>{
                        res.status(400).json({message:err})
                    })
            })
            .catch((err)=>{
               res.status(400).json({message:err})
            })


        /**/

})
exports=module.exports=route