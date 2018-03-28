const User=require('../db/models').User
exports=module.exports= {
    add_user:(reqQuery)=> {

        return User.create({
            name: reqQuery.name,
            password: reqQuery.password
        })
    },
    validate_user:async(reqQuery)=>{
        console.log("entered in validate user")
       return User.findOne({
            where:id=parseInt(reqQuery.id)
        })
    },
    getallUser:async(reqQuery)=>{
       return User.findAll()

    },
    getUser:async(reqQuery)=>{
        return User.findOne({
            where:{
                id:parseInt(reqQuery.id)
            }
        })
    },
    updateUser:async(reqQuery)=>{
        return User.update({
            name:reqQuery.name,
            username:reqQuery.username,
            college:reqQuery.college,
            password:reqQuery.new_pass

        },
         {
            where:{
                id:reqQuery.id
            }
         })
    }

}