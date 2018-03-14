const Post=require('../db/models').Post
const User=require('../db/models').User
const Like=require('../db/models').Like
exports=module.exports={

    addLike:async(reqQuery)=>{
        console.log("reaching in con of like")
        Like.upsert({
            value:reqQuery.value,
            Post_key:reqQuery.postId,
            User_key:reqQuery.userId
        })
    },
     getAll:async()=>{
        console.log("reched in all")
        return Like.findAll({

                order:[['postId','DESC']]


            }
        )
    }
}