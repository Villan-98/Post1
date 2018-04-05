const Posts=require('../db/models').Post
const Comment=require('../db/models').Comment
const User=require('../db/models').User
const sequelize=require('sequelize')
exports=module.exports={
    getHVPost:async(reqQuery)=>{
       return Posts.findOne({
            where:{
                userId:reqQuery.id
            },
           order:[['vote','DESC']]

        })
}
}