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
const College=db.define('college',{
    collegeName:{
        type:DataTypes.STRING
    }
})
const Ranker=db.define('ranker',{
    username:{
        type:DataTypes.STRING
    },
    scope:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    period:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    courseYear:{
        type:DataTypes.INTEGER,
    }
})
const User=db.define('Puser',{
    name:{
        type:DataTypes.STRING,

    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,

    },
    college:{
        type:DataTypes.STRING,
    },
    rights:{
        type:DataTypes.STRING,
    },
    courseYear:{
        type:DataTypes.STRING,

    },
    googleId:{
        type:DataTypes.STRING
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
    college:{
      type:DataTypes.STRING,
      allowNull:false
    },
    pic:{
        type:DataTypes.BOOLEAN,
        defaultValue:0
    },
    address:{
        type:DataTypes.STRING
    },
    courseYear:{
        type:DataTypes.STRING,
        allowNull:false
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
    //alter:true
})
    .then(()=>{console.log("database syncronised")})
exports=module.exports={
    db,User,Post,Like,Dislike,Comment,url,Ranker,College

}
