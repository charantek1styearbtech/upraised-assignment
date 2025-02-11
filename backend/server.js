const http = require('http');
const app = require('./app');
const gconnectToDB = require('./db/Gadgets.db');
const uconnectToDB = require('./db/users.db');
const User = require('./models/users.model');
const Gadgets = require('./models/gadget.model');

const port = process.env.PORT || 3000;

// Connect to databases and sync models
const initializeDB = async () => {
    try {
        // Authenticate database connections
        await gconnectToDB.authenticate();
        await uconnectToDB.authenticate();
        console.log('Database connections established successfully.');

        // Sync all models
        await gconnectToDB.sync({ alter: true }); // Use alter:true in development, force:false in production
        await uconnectToDB.sync({ alter: true });
        console.log('Database tables created/updated successfully.');
    } catch (error) {
        console.error('Database initialization error:', error);
        process.exit(1);
    }
};

// Initialize database and start server
initializeDB().then(() => {
    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        console.log(`HTTP Server is Running on port ${port}`);
    });
}).catch(error => {
    console.error('Server initialization failed:', error);
    process.exit(1);
});
