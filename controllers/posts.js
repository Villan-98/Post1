const Post=require('../db/models').Post
const User=require('../db/models').User
exports=module.exports={
    getpost:async(reqQuery)=>Post.findAll({
        include:[{
            model:User,
            attributes:['id','name']
        }]
    }),
    addPost:async(reqQuery)=>{
        Post.create({
            text:reqQuery.text,
            clgId:1,
            userId:reqQuery.userId
        })
    }
}