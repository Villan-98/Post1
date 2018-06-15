const Post=require('../db/models').Post
const User=require('../db/models').User
const Like=require('../db/models').Like
const Dislike=require('../db/models').Dislike
exports=module.exports={
    getpost:async(reqQuery)=>{
        console.log("reached in get post")
        /*Like.findAll({
            where:{
                userKey:reqQuery.user.id
            }
        })
            .then((likes)=>{
               return Post.findAll({
                    include:[{
                        model:User,
                        attributes:['id','name']
                    },
                        {
                            model:likes,
                            attributes:['value']
                        }],
                    order:[['createdAt','DESC']]

                })
            })*/
        return Post.findAll({
            where:{
                userId:reqQuery.id
            },
            include:[{
                model:User,
                attributes:['id','name']
            },
                {
                    model:Like,
                    attributes:['value'],
                    where:{
                        User_key:reqQuery.id
                    },
                    required:false
                },{
                    model:Dislike,
                    attributes:['value'],
                    where:{
                        User_key:reqQuery.id
                    },
                    required:false
                }],
            order:[['createdAt','DESC']]

        })

        /*return Post.findAll({

           where:{
                userId:parseInt(reqQuery.user.id)    //Ideally it should be parseInt(reqQuery.userId)
            },

            include:[{
                model:User,
                attributes:['id','name'],
                include:[{
                    model:Like,
                    attributes:['value'],
                    where:{Post.Id=Like.Post_key},
                    required:false
                }
            }],
            order:[['createdAt','DESC']]

        })*/
    }
      ,
    getallpost:async(reqQuery)=>{
                return Post.findAll({
                    include:[{
                        model:User,
                        attributes:['id','name']
                    },
                        {
                            model:Like,
                            attributes:['value'],
                            where:{
                              User_key:reqQuery.id
                            },
                            required:false
                        },{
                            model:Dislike,
                            attributes:['value'],
                            where:{
                                User_key:reqQuery.id
                            },
                            required:false
                        }],
                    order:[['createdAt','DESC']]

                })

        /*return Post.findAll({


            include:[{
                model:User,
                attributes:['id','name']
            }],
            order:[['createdAt','DESC']]

        })*/
    },
    addPost:async(reqQuery)=>{
        console.log("ghghghg")
        if(reqQuery.img===0)
        {

            console.log("reached in text and the user id is "+ reqQuery.id)
            Post.create({
                text:reqQuery.text,
                clgId:1,

                userId:reqQuery.userId
            })
        }
        else if(reqQuery.img===1)
        {
            console.log("reached in img")
            Post.create({
                address:reqQuery.filename,
                clgId:1,
                userId:reqQuery.id,
                pic:true
            })
        }
    },
    deletePost:(reQuery)=>{
        console.log("reched in delete")
       return Post.destroy({
            where:{
                id:reQuery.postId
            }
        })
    },
    addlike:(reqQuery)=>{
        console.log("reached in the adding  like")
        return Post.update({
            vote:reqQuery.vote},{
            where:{
                id:reqQuery.postId
            }
        })
    },
    fetchPost:(reqQuery)=>{
        return Post.findOne({
            where:{
                id:reqQuery.postId
            }
        })
    },
    HVPost:()=>{
        return Post.findAll({

            include:[{
                model:User,
                attributes:['name']
            }],

            order:[['vote','DESC']]

        })

    },
    getOne:async(reqQuery)=>{
        return Post.findOne({
            where:{
                id:reqQuery.postId
            }
        })
    }
}