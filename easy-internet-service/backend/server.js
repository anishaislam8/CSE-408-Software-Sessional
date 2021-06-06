require('./config/config');

const express = require('express');
const cors = require('cors');
var {mongoose} = require('./db/mongoose');

const { Contract } = require('./models/Contract');
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
 
app.post('/contract',async (request, response) => {
    var newContract = new Contract({
        user_type : request.body.user_type,
        package_id :request.body.package_id,
        isp_id : request.body.isp_id,
        user_id : request.body.user_id,
        union_id :request.body.union_id,
        area_id : request.body.area_id,
        duration : request.body.duration,
        current : request.body.current
    })

    let doc = await newContract.save();
    response.send(doc);
})


app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

