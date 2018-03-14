const User=require('../db/models').User
exports=module.exports= {
    add_user:(reqQuery)=> {

        return User.create({
            name: reqQuery.name,
            password: reqQuery.password
        })
    },
    validate_user:async(reqQuery)=>{
       return User.findOne({
            where:id=parseInt(reqQuery.userId)
        })
    },
    getallUser:async(reqQuery)=>{
       return User.findAll()

    }

}