const jwt = require('jsonwebtoken');
const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
            
            // Check token expiration
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                return res.status(401).json({
                    success: false,
                    message: 'Token expired'
                });
            }
            next();

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication error'
        });
    }
};

module.exports = authUser;