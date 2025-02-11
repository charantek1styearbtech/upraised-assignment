const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/users.db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User extends Model {
    async comaprePassword(password) {
        return await bcrypt.compare(password, this.password);
    }
    genrateToken() {
        if (!process.env.JWT_SECRETKEY) {
            throw new Error('JWT_SECRETKEY is not defined in environment variables');
        }
        return jwt.sign(
            { id: this.id }, 
            process.env.JWT_SECRETKEY, 
            { expiresIn: '24h' }
        );
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
});

module.exports = User;