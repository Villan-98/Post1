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
    },
    get_tot_post:async(reqQuery)=>{
        return Posts.count({
            where:{
                userId:1
            }
        })
    },
    get_tot_like:async(reqQuery)=>{
        return Posts.sum('vote',{
            where:{
                userId:1
            }
        })

    }
}