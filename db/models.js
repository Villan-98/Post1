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
const Category=db.define('category',{
    name:{
        type:DataTypes.STRING,
        allowNULL:false
    },
    tax_perc:{
        type:DataTypes.FLOAT,
        defaultValue:0
    }
})
const Cart=db.define('cart',{

    quantity: {
        type:DataTypes.SMALLINT,
        defaultValue:1,
        allowNULL:false
    },

})
const User=db.define('user',{
    name:{
        type:DataTypes.STRING
    },
    username:{
        type:DataTypes.STRING,
    },
    address:{
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING
    }
})
const Product=db.define('product_a',{
    name:{
        type:DataTypes.STRING,
        allowNULL:false
    },

    vendor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type:DataTypes.FLOAT,
        defaultValue:0
    },
    /*categoryId:{
        type:DataTypes.STRING,
        defaultValue:null
    }*/
})
const Post=db.define('post',{
    text:{
        type:DataTypes.STRING,
        allowNull:false
    },
    vote:{
        type:DataTypes.SMALLINT,
        defaultValue:0
    },
    clgId:{
      type:DataTypes.SMALLINT,
      allowNull:false
    }
})
const Like=db.define('likes',{

    value:{

        type:DataTypes.SMALLINT,
        allowNull:false
    },


},{
    timestamps:false
})
Like.removeAttribute('id')
Post.belongsTo(User)
Like.belongsTo(User,{foreignKey:{
        name:'User_key',
        allowNull:false,
        defaultValue:0,
        primaryKey:true,

    }
})
Like.belongsTo(Post,{foreignKey:{
        name:'Post_key',
        allowNull:false,
        defaultValue:1,
        primaryKey:true
    }
})
Cart.belongsTo(Product)
Cart.belongsTo(User)
Product.belongsTo(Category)
//Product.belongsTo(Category)
db.sync({
    alter:true
})
    .then(()=>{console.log("database syncronised")})
exports=module.exports={
    db,Category,Product,Cart,User,Post,Like

}