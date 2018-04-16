const Comment=require('../db/models').Comment
const User=require('../db/models').User
exports=module.exports= {
    addComment: async (reqQuery) => {
        return Comment.create({
            Ctext: reqQuery.Ctext,
            CPost_key: reqQuery.postId,
            CUser_key: reqQuery.userId
        })
    },
    getComment: async (reqQuery) => {
        return Comment.findAll({
            where: {
                CPost_key: reqQuery.postId
            },
            include: [{
                model: User,
                attributes: ['name']
            }],
            order:['createdAt']
        })
    }
}