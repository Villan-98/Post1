const socketId=require('../db/models').socketId
const socketDiscuss=require('../db/models').socketDiscuss
module.exports={
    insertChatUser:(requery)=>{
        socketId.create({
            userName:requery.userName,
            socket:requery.socketId
        })

    },
    deleteChatUser:(requery)=>{
        socketId.delete({
            where:{
                socket:requery.socketId
            }
        })
    },
    insertMessage:async(requery)=>{
        socketDiscuss.create({
            sender:requery.sender,
            postId:requery.room,
            message:requery.message,
        })
    },
    getMessage:async(requery)=>{
        return socketDiscuss.findAll({
            where:{
                postId:requery.room
            }
        })
    }
}