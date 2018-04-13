const route=require('express').Router()
const ctrl=require('../controllers/like')
route.post('/',(req,res)=>{
   //console.log("reachint to like post")
    if(req.body.value==='1'||req.body.value==='2')
    {

        req.body['userId']=req.user.dataValues.id
        ctrl.addLike(req.body)
            .then(()=>{

                ctrl.delete_dislike(req.body)
                    .then(()=>{
                         //   console.log("delete dislike done")

                        }
                    )
                    .catch((err)=>{
                        console.log(err)
                    })

                console.log("like done")
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).json({message:err})
            })
    }
    else
    {
        req.body['userId']=req.user.dataValues.id
        ctrl.add_dislike(req.body)
            .then(()=>{
                ctrl.delete_like(req.body)
                    .then(()=>{
                        console.log("delete like done")
                        }
                    )
                    .catch((err)=>{
                        console.log(err)
                    })
                // res.redirect('user/Mypost?userId=8343')       //an error of not null occurred in db but it goes further with 200 status
                //why page is not getting refreshed
                console.log("dislike done")
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).json({message:err})
            })

    }
})
route.delete('/',(req,res)=>{
    req.body['userId']=req.user.dataValues.id
    //console.log("reached in delete like"+req.body.like+typeof (req.body.like))
    if(req.body.like==='1')             //since type of req.body.like is string
    {

        ctrl.delete_like(req.body)
            .then(()=>{
                console.log("like deleted from route")

            })
            .catch((err)=>{
                res.status(404).json({message:err})
            })
    }
    else if(req.body.like==='0')
    {

        ctrl.delete_dislike(req.body)
            .then(()=>{
                console.log("dislike deleted form post")
            })
            .catch((err)=>{
                res.status(404).json({message:err})
            })
    }
})

exports=module.exports=route