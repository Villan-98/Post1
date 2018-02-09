const User=require('../db/models').User
const route=require('express')


exports=module.exports= {
    add_user:(reqQuery)=> {

        return User.create({
            name: reqQuery.name,
            password: reqQuery.password
        })
    },

}