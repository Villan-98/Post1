const Post=require('../db/models').Post
const User=require('../db/models').User
const Like=require('../db/models').Like
exports=module.exports={
    getpost:async(reqQuery)=>{

        return Post.findAll({
           where:{
                userId:parseInt(reqQuery.userId)    //Ideally it should be parseInt(reqQuery.userId)
            },

            include:[{
                model:User,
                attributes:['id','name'],
                /*include:[{
                    model:Like,
                    attributes:['value'],
                    where:{Post.Id=Like.Post_key},
                    required:false
                }*/
            }],
            order:[['createdAt','DESC']]

        })
    }
      ,
    getallpost:async(reqQuery)=>{

        return Post.findAll({


            include:[{
                model:User,
                attributes:['id','name']
            }],
            order:[['createdAt','DESC']]

        })
    },
    addPost:async(reqQuery)=>{
        Post.create({
            text:reqQuery.text,
            clgId:1,
            userId:reqQuery.userId
        })
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
            where:{
                vote:Post.max('vote')
            }
        })
    }
}