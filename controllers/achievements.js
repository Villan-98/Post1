const Posts=require('../db/models').Post
const Comment=require('../db/models').Comment
const User=require('../db/models').User
const sequelize=require('sequelize')
const Op=sequelize.Op
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

    },
    /////////Admin functions to determine the rank
    ClGScorer:(reQuery)=>{
        Posts.findOne({

        })
        return Posts.findOne({
            where:{
                college:reQuery.college,
                /*vote:{
                    $gt:0
                }*/
            },order:[['vote','DESC']],
            include:[{
                model:User,
                attribute:['id','username']
            }]
        })
    },
    CHW:(reQuery)=>{
        return Posts.findOne({
            where:{
                college:reQuery.college,
                createdAt:{
                    [Op.gte]:reQuery.lastUpdation,
                    [Op.lte]:reQuery.nextUpdation
                },
                vote:{
                    $gt:0
                }
            },
            order:[['vote','DESC']],
            include:[{
                model:User,
                attribute:['id','username']
            }]
        })
    },
    GlHScorer:(reQuery)=>{
        return Posts.findOne({
            where:{
              vote:{
                  $gt:0
              }
            },
            include:[{
                model:User,
                attribute:['id','username']
            }],
            order:[['vote','DESC']],
        })
    },
    GHW:(reQuery)=>{
        return Posts.findOne({
            where:{
                createdAt:{
                    [Op.gte]:reQuery.lastUpdation,
                    [Op.lte]:reQuery.nextUpdation
                },
                vote:{
                    $gt:0
                }
            },
            order:[['vote','DESC']],
            include:[{
                model:User,
                attribute:['id','username']
            }]
        })
    },
    ClBScorer:(reQuery)=>{
        return Posts.findOne({
            where:{
                college:reQuery.college,
                //courseYear:reQuery.courseYear
            },order:[['vote','DESC']],
            include:[{
                model:User,
                attribute:['id','username'],
                where:{
                    courseYear:reQuery.courseYear
                }
            }]
        })
    },
    BHT:(reQuery)=>{
        return Posts.findOne({
            where:{
                college:reQuery.college,
                courseYear:reQuery.courseYear,

            },order:[['vote','DESC']],
            include:[{
                model:User,
                attribute:['id','username']
            }]
        })
    },
    BHW:(reQuery)=>{                              //BHW
    return Posts.findOne({
        where:{
            college:reQuery.college,
            createdAt:{
                [Op.gte]:reQuery.lastUpdation,
                [Op.lte]:reQuery.nextUpdation
            },
            courseYear:reQuery.courseYear

        },order:[['vote','DESC']],
        include:[{
            model:User,
            attribute:['id','username'],

        }]
    })
}
}