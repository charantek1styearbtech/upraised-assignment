const http = require('http');
const app = require('./app');
const gconnectToDB = require('./db/Gadgets.db');
const uconnectToDB = require('./db/users.db');
const port = process.env.PORT || 3000;

const initializeDB = async () => {
    try {
        await gconnectToDB.authenticate();
        await uconnectToDB.authenticate();
        console.log('Database connections established successfully.');
        await gconnectToDB.sync({ alter: true });
        await uconnectToDB.sync({ alter: true });
        console.log('Database tables created/updated successfully.');
    } catch (error) {
        console.error('Database initialization error:', error);
        process.exit(1);
    }
};

initializeDB().then(() => {
    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        console.log(`HTTP Server is Running on port ${port}`);
    });
}).catch(error => {
    console.error('Server initialization failed:', error);
    process.exit(1);
});
