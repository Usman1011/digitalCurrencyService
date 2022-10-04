const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const digitalWalletRoute = require('./routes/DigitalWalletRoutes');
const userRoute = require('./routes/userRoutes');
const authorization = require('./middlewares/authorization');
var bodyParser = require('body-parser')


async function connectToDb() {
    const mongoUriLocal = 'mongodb://admin:usman1234@localhost:27017/demodb?authSource=admin';
    const mongoUriDocker = 'mongodb://admin:usman1234@172.20.0.4:27017/demodb?authSource=admin';
    
    try {

        const res = await mongoose.connect(mongoUriLocal);
        console.log("DataBase Successfully Connected");
    }
    catch(err)
    {
        console.error("Error Connecting To DataBase: " + err);
    }
}

app.use(bodyParser.json());

app.use('/user', userRoute)
app.use('/', authorization);
app.use('/digitalwallet', digitalWalletRoute);

app.listen(port, ()=>{
    console.log("Server Listening to Port: " + port);
    connectToDb();
});