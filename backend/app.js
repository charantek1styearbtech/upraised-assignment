const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session=require('express-session');
const app = express();
const gadgetRouter = require('./routes/gadets.routes');
const userRouter = require('./routes/user.routes');

if (!process.env.JWT_SECRETKEY) {
    console.error('JWT_SECRETKEY is not defined in environment variables');
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SESSION_KEY || 'upraised',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(cookieParser());
app.use('/gadgets', gadgetRouter);
app.use('/user', userRouter);

module.exports = app;