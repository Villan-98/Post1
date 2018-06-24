const Posts=require('../db/models').Post
const Comment=require('../db/models').Comment
const User=require('../db/models').User
const sequelize=require('sequelize')
exports=module.exports={
    getHVPost:async(reqQuery)=>{
       return Posts.findOne({
            where:{
                PuserId:reqQuery.id              //this HV post is to get the highest voted post in my achievement
            },
           order:[['vote','DESC']],
           /*include:[{
                model:User,
               attribute:['name']
           }]*/

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