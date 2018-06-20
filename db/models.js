const Sequelize=require('sequelize')
const DataTypes=Sequelize.DataTypes
const dbconfig=require('../config').DB
const db=new Sequelize(

    dbconfig.NAME,
    dbconfig.USERNAME,
    dbconfig.PASSWORD,
    {
        dialect:'mysql'
    }
)
const User=db.define('user',{
    name:{
        type:DataTypes.STRING
    },
    username:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING
    },
    college:{
        type:DataTypes.STRING,
    },
    rights:{
        type:DataTypes.STRING,
        defaultValue:"you can only send one post"
    }
})
const Post=db.define('post',{
    text:{
        type:DataTypes.STRING,

    },
    vote:{
        type:DataTypes.SMALLINT,
        defaultValue:0
    },
    clgId:{
      type:DataTypes.SMALLINT,
      allowNull:false
    },
    pic:{
        type:DataTypes.BOOLEAN,
        defaultValue:0
    },
    address:{
        type:DataTypes.STRING
    }

})
Post.belongsTo(User)

const Like=db.define('likes',{

    value:{

        type:DataTypes.SMALLINT,
        allowNull:false
    },


},{
    timestamps:false
})

Like.removeAttribute('id')
Like.belongsTo(User,{foreignKey:{
        name:'User_key',
        allowNull:false,
        defaultValue:0,
        primaryKey:true,

    }
})

Post.hasMany(Like,{foreignKey:{
        name:'Post_key',
        allowNull:false,
        defaultValue:1,
        primaryKey:true
    }
})
const Dislike=db.define('dislikes',{

    value:{

        type:DataTypes.SMALLINT,
        allowNull:false
    },


},{
    timestamps:false
})
const url=db.define('url',{
    userUrl:{
        type:DataTypes.STRING,
        allowNull:false
    },
    originalUrl:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
Dislike.removeAttribute('id')
Dislike.belongsTo(User,{foreignKey:{
        name:'User_key',
        allowNull:false,
        defaultValue:0,
        primaryKey:true,

    }
})
Post.hasMany(Dislike,{foreignKey:{
        name:'Post_key',
        allowNull:false,
        defaultValue:1,
        primaryKey:true
    }
})

const Comment=db.define('comment',{
    Ctext:{
        type:DataTypes.STRING,
        allowNull:false,
    }
})
Post.hasMany(Comment,{foreignKey:{
    name:'CPost_key',
        allowNull:false

    }})

Comment.belongsTo(User,{foreignKey:{
    name:'CUser_key',
        allowNull:false
    }})
db.sync({
  //force:true
   // alter:true
})
    .then(()=>{console.log("database syncronised")})
exports=module.exports={
    db,User,Post,Like,Dislike,Comment,url

}
