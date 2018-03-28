const Like=require('../db/models').Like
const Dislike=require('../db/models').Dislike
exports=module.exports={

    addLike:async(reqQuery)=>{
        console.log("reaching in con of like")
        Like.upsert({
            value:reqQuery.value,
            Post_key:reqQuery.postId,
            User_key:reqQuery.userId
        })
    },
    add_dislike:async(reqQuery)=>{
        console.log("reaching in con of like")
        Dislike.upsert({
            value:reqQuery.value,
            Post_key:reqQuery.postId,
            User_key:reqQuery.userId
        })

    },
    delete_like:async(reqQuery)=>{
        console.log("reaching in con of like")
        Like.destroy({
            where:{

                Post_key:reqQuery.postId,
                User_key:reqQuery.userId
            }
        })

    },
    delete_dislike:async(reqQuery)=>{
        console.log("reaching in con of like")
        Dislike.destroy({
            where:{

                Post_key:reqQuery.postId,
                User_key:reqQuery.userId
            }
        })

    },
     getAll:async()=>{
        console.log("reched in all")
        return Like.findAll({

                order:[['postId','DESC']]


            }
        )
    },
    getOne:async(reqQuery)=>{
        return Like.findOne({
            where:{
                User_key:reqQuery.userId,
                Post_key:reqQuery.postId
            }
        })
    }
}