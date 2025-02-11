const User = require('../models/users.model');

const createUser = async ({ name, email, password }) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password
        });

        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser
};