require('./config/config');

const express = require('express');
const cors = require('cors');
var {mongoose} = require('./db/mongoose');



//require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const {Division} = require('./models/Division');
const {District} = require('./models/District');
const {SubDistrict} = require('./models/Subdistrict');
const {Union} = require('./models/Union');
const {Area} = require('./models/Area');
const {NTTN} = require('./models/NTTN');
const {ISP} = require('./models/ISP');
const {User} = require('./models/User');
const {Contract} = require('./models/Contract');
const {Pending} = require('./models/Pending');
const {License} = require('./models/License');
const {Package} = require('./models/Package');

//Database connection for atlas
const uri = process.env.MONGODB_URI;
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb database connection established successfully");
})
//Finish connecting database

//define the routes
const nttnRouter = require('./routes/nttn');
const userRouter = require('./routes/user');
const ispRouter = require('./routes/isp');
const apiRouter = require('./routes/api');



app.use('/nttn', nttnRouter);
app.use('/isp', ispRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);
 
app.get('/area', (request, response) => {
    Area.find().then((docs) => {
        response.send(docs);
    }).catch((err) => {
        response.send(err);
    })
})

app.post('/area', (request, response) => {

   var newArea = new Area({
       union_id : request.body.union_id,
       name : request.body.name
   })
   newArea.save().then((docs) => {
       response.send(docs);
   }).catch((err) => {
       response.send(err);
   })
})

app.post('/division', (request, response) => {

    var newArea = new Division({
        division_id : request.body.division_id,
        name : request.body.name
    })
    newArea.save().then((docs) => {
        response.send(docs);
    }).catch((err) => {
        response.send(err);
    })
 })

 app.post('/district', (request, response) => {

    var newArea = new District({
        district_id : request.body.district_id,
        division_id : request.body.division_id,
        name : request.body.name
    })
    newArea.save().then((docs) => {
        response.send(docs);
    }).catch((err) => {
        response.send(err);
    })
 })
 app.post('/subdistrict', (request, response) => {

    var newArea = new SubDistrict ({
        district_id : request.body.district_id,
        upazilla_id : request.body.upazilla_id,
        name : request.body.name
    })
    newArea.save().then((docs) => {
        response.send(docs);
    }).catch((err) => {
        response.send(err);
    })
 })
 app.post('/union', (request, response) => {

    var newArea = new Union({
        union_id : request.body.union_id,
        upazilla_id : request.body.upazilla_id,
        name : request.body.name
    })
    newArea.save().then((docs) => {
        response.send(docs);
    }).catch((err) => {
        response.send(err);
    })
 })

app.get('/package', (request, response) => {
   Package.find().then((docs) => {
       response.send(docs);
   }).catch((err) => {
       response.send(err);
   })
})

app.post('/package', (request, response) => {

  var newPackage = new Package({
      name : request.body.name,
      package_type : request.body.package_type,
      up_speed : request.body.up_speed,
      down_speed : request.body.down_speed,
      duration : request.body.duration,
      bandwidth : request.body.bandwidth,
      price : request.body.price
  })
  newPackage.save().then((docs) => {
      response.send(docs);
  }).catch((err) => {
      response.send(err);
  })
})

app.post('/license', (request, response) => {

    var newLicense = new License({
        license_id : request.body.license_id,
        name : request.body.name,
        valid_until : request.body.valid_until
    })
    newLicense.save().then((docs) => {
        response.send(docs);
    }).catch((err) => {
        response.send(err);
    })
 })

 app.post('/isp', (request, response) => {

    var newISP = new ISP({
        license_id : request.body.license_id,
        name : request.body.name,
        password : request.body.password
    })
    newISP.save().then((docs) => {
        response.send(docs);
    }).catch((err) => {
        response.send(err);
    })
 })



 app.post('/user', async (request, response) => {
    
    var newUser = new User({
        name : request.body.name,
        password : request.body.password,
        nid : request.body.nid
    });

    let docs = await newUser.save();
    response.send(docs);
   
 })

 app.get('/user', async (request, response) => {
    let docs = await  User.find();
    response.send(docs);
 })

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

app.post('/nttn', async (request, response) => {
    var newContract = new NTTN({
        username : request.body.username,
        password : request.body.password
    })

    let doc = await newContract.save();
    response.send(doc);
})


app.post('/pending', async (request, response) => {
    var newContract = new Pending({
        isp_id : request.body.isp_id,
        package_id : request.body.package_id,
        "request_type" : 0
    })

    let doc = await newContract.save();
    response.send(doc);
})




app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

