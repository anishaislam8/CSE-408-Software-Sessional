require('./config/config');


var express = require('express');
const _ = require('lodash');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');

const port = process.env.PORT;

// routes files
const nttnRouter = require("./routes/nttn");
const ispRouter = require('./routes/isp');
const userRouter = require('./routes/user');

// send json to express application
app.use(express.json());

var app = express();

// //API ROUTES

// app.use("/api/nttn", nttnRouter);
// app.use("/api/isp", ispRouter);
// app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

module.exports = app;

