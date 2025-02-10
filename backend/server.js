const http=require('http');
const app=require('./app');
const gconnectToDB=require('./db/Gadgets.db');
const uconnectToDB=require('./db/users.db')
const port=process.env.PORT||3000;
gconnectToDB.authenticate();
uconnectToDB.authenticate();
const server=http.createServer(app);
server.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
})
