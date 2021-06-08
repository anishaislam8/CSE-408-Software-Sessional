//insertion purpose

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