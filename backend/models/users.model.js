const {Model,Datatype}=require('sequelize');
const sequelize=require('../db/Gadgets.db');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
class User extends Model{
    async comaprePassword(password){
        return await bcrypt.compare(password,this.password);
    }
    genrateToken(){
        return jwt.sign({id:this.id},process.env.JWT_SECRETKEY,{expiresIn:'24h'});
    }
    async hashPassword(password){
        return await bcrypt.hash(password,10);
    }
}

User.init({
    id:{
        type:Datatype.UUID,
        defaultValue:Datatype.UUIDV4,
        primaryKey:true,
    },
    name:{
        type:Datatype.STRING,
        allowNull:false,
    },
    email:{
        type:Datatype.STRING,
        allowNull:false,
    },
    password:{
        type:Datatype.STRING,
        allowNull:false,
    }

},{sequelize,modelName:'User'});

module.exports=User;