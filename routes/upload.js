const route=require('express').Router()
const ctrl=require('../controllers/posts')
const ctrlRanker=require("../controllers/ranker")
const path=require('path')
const multer=require('multer')
const ctrlComment=require('../controllers/comment')
const storage=multer.diskStorage({
    destination:'public/upload',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage,
    limits:{fileSize:10000000},
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    }
}).single('Mypost')
const checkFileType=function(file,cb){
    const filetypes=/jpeg|jpg|gif|png/
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=filetypes.test(file.mimetype)
    if(mimetype && extname)
    {
        cb(null,file)
    }
    else{
        "err: input type of file is not valid"
    }
}
route.post('/',(req,res)=>{
    if(!req.isAuthenticated())
    {
        res.redirect('/auth/signin')
    }
    console.log("reached in post upload")
    console.log(req.user.college)
   //console.log(req)

    req.body['userId']=req.user.id
    req.body['userCollege']=req.user.college
    req.body['courseYear']=req.user.courseYear
    if(req.headers['content-type']==='application/x-www-form-urlencoded')
    {
        console.log(req.body.college)
        console.log(req.user)
        req.body['img']=0
        ctrl.addPost(req.body)
            .then(()=>{
                res.redirect('/'+req.user.username)

            },(err)=>{
                console.log(err)
            })
            .catch((err)=>{
                res.status(500).json({message:'oops some error occur'})
            })
    }
    else{
        console.log("naanan")
        upload(req,res,(err)=>{
            if(err){

                res.send("oops")
            }
            else{

                if(req.file==undefined)
                {
                    res.send("upload the file")
                }
                else{
                    console.log(req.file)
                            console.log("file name  is"+req.file.filename)
                            req.file['id']=req.user.dataValues.id
                                req.file['img']=1
                                ctrl.addPost(req.file)
                                    .then(()=>{

                                        res.redirect('user/home')
                                    })
                }
            }
        })
    }
})
route.get('/:username',(req,res)=>{
    ctrl.postByUsername(req.params)
        .then((data)=>{
            ctrlRanker.getRanker(req.user)
                .then((ranker)=>{
                    let nav=req.user
                    res.render('post',{posts:data,nav,ranker,otherUsername:req.params.username})
                })
            console.log(data)
            res.render('post',{nav,posts:data,})
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
            console.log("item is deleted ")
          res.redirect(`/`+req.user.name+`/Mypost`)
        })
        .catch((err)=>{
            res.status(500).json({message:err})
        })
})
route.patch('/',(req,res)=>{
        console.log("reached in patch route")
        ctrl.fetchPost(req.body)
            .then((post)=>{
                /*fetching the current vote and increment
                or decrement it based on req.body.value
                and resend updated vote to the database
                 */
                //req.body['vote']=parseInt(post.dataValues.vote)+parseInt(req.body.value)
                req.body['vote']=parseInt(req.body.vote)
                ctrl.addlike(req.body)
                    .then(()=>{
                        console.log("like added to post")
                        /*ctrl.getOne(req.body)
                            .then((data)=>{
                                res.send(data)
                            })*/
                        res.send()
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
route.post('/comment',(req,res)=>{
    console.log("reaching in the comment ")
    console.log("userid"+req.user.id)
    console.log("userid"+req.body.Ctext)
    //req.body['userId']=req.user.dataValues.id
    req.body['userId']=req.user.id

    ctrlComment.addComment(req.body)
        .then(()=>{
            console.log("ldskjfkjalsdfjlkasfjlskdjfks"+req.user.dataValues.id)
            req['query']={

                postId:req.body.postId,

            }
            ctrlComment.getComment(req.query)
                .then((data)=>{
                   res.send(data)
                }).catch((err)=>{
                console.log(err)
            })
            console.log("comment added"+req.query.postId)
        })
        .catch((err)=>{
            console.log(err)
        })

})
route.get('/comment',(req,res)=>{
    console.log(req.params)
    console.log("reaching in the comment "+req.query.postId)

    ctrlComment.getComment(req.query)
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            console.log(err)
    })
})
exports=module.exports=route