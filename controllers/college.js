const college=require('../db/models').College
const Sequelize=require('sequelize')
const Op = Sequelize.Op
const dateStore=require('date-store')
const store=new dateStore()
    let insertCollege=function(reQuery){
        college.create({
            collegeName:reQuery.college
        })
    }

//https://stackoverflow.com/questions/29798357/sequelize-where-statement-with-date
    //insertCollege({college:''})
module.exports={
    getAllCollege:()=>{
        return college.findAll()
    },
    test:()=>{
        return college.findAll({where:{createdAt:{[Op.lte]: store.date('today')}

            }})
    }
}