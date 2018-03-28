const Comment=require('../db/models').Comment
exports=module.exports={
    addComment:async(reqQuery)=>{
        return Comment.create({
            Ctext:reqQuery.text,
            CPost_key:reqQuery.postId,
            CUser_key:reqQuery.userId
        })
    },
    getComment:async(reqQuery)=>{
      return Comment.findAll({
          where: {
              CPost_key:reqQuery.postId
          }
      })
    }
}