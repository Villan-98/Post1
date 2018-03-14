const post=require('../controllers/posts')
const user=require('../controllers/user')
exports=module.exports={
    achieved:(post)=>{
        console.log("reached in achieved")
        let vote=0
        let no_post=0
        let no_user=0
        no_post=post.length
        for(let i=0;i<post.length;i++)
        {
            vote +=parseInt(post[i].dataValues.vote)

        }
        user.getallUser()
            .then((user)=>{
                console.log("user"+user)
                no_user=user.length

                console.log("vote"+vote+"no_post"+no_post+"user"+no_user)
            })
    },
    leader:()=>{
        console.log("reached in leader")
        post.HVPost()
            .then((data)=>{
                console.log(data)
            })
    }
}