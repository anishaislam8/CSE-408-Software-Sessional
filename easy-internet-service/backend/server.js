require('./config/config');

const express = require('express');
const cors = require('cors');
var {mongoose} = require('./db/mongoose');


//require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Database connection for atlas
//const uri = process.env.ATLAS_URI;
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("Mongodb database connection established successfully");
// })
// Finish connecting database

//define the routes
// const nttnRouter = require('./routes/nttn');
// const userRouter = require('./routes/user');
// const ispRouter = require('./routes/isp');


// app.use('/nttn', nttnRouter);
// app.use('/user', userRouter);
// app.use('/isp', ispRouter);
//end defining the routes

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

//server created :)

