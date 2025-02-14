const User = require('../models/users.model');
const {validationResult} = require('express-validator');
const userService = require('../service/user.service');

const userRegister = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()});
        }

        const {name, email, password} = req.body;
        
        

        const hashedPassword = await (new User()).hashPassword(password);
        const user = await userService.createUser({name, email, password: hashedPassword});
        const token = user.genrateToken();
        
        return res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error in registration',
            error: error.message
        });
    }
}

const userLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()});
        }

        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        
        if (!user) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        const isMatched = await user.comaprePassword(password);
        if (!isMatched) {
            return res.status(401).json({message: 'Invalid Email or Password'});
        }

        const token = user.genrateToken();
        res.cookie('token', token);
        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error in login',
            error: error.message
        });
    }
}

const userLogout = async (req, res) => {
    try {
        if (req.cookies.token) {
            res.clearCookie('token');
        }
        
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error in logout',
            error: error.message
        });
    }
};

module.exports = {
    userRegister,
    userLogin,
    userLogout
};