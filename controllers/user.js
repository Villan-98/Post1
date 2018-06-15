const User=require('../db/models').User
exports=module.exports= {
    add_user:(reqQuery)=> {

        return User.create({
            name: reqQuery.name,
            password: reqQuery.password,
            email:reqQuery.email
        })
    },
    validate_user:async(reqQuery)=>{
        console.log("entered in validate user")
       return User.findOne({
            where:id=parseInt(reqQuery.id)
        })
    },
    getallUser_clg:async(reqQuery)=>{
       return User.findAll(
           {
               where:{
                   college:'DTU'
               }
           }
       )

    },
    getUser:async(reqQuery)=>{
        return User.findOne({
            where:{
                id:parseInt(reqQuery.id)
            }
        })
    },
    check_email:async(reqQuery)=>{
        console.log("entered in validate user")
        return User.findOne({
            where:{
                email:reqQuery.email
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
    },
    get_tot_user:async(reqQuery)=>{
        return User.count({})

}

}