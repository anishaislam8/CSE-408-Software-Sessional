// /nttn/pending --> get request
// /nttn/pedning/verify --> post method, liscense id req body ; name , id
// true --> insert in noti
// /nttn/pending/verify/notfy

const router = require('express').Router();
let Pending = require('../model/Pending').Pending;
let Notification = require('../model/Notification').Notification;
let ISP = require('../model/ISP').ISP;

//import Pending from '../model/Pending'

router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/pending').get((req, res) => {

    Pending.find({}).then((users)=>{
      res.send(users)
    }).catch((e) => {
      res.status(500)
    })

  });
  
  router.route('/pending/notify').post((req, res) => {
    const request_type = 0
    const isp_id = req.body.ispID
    const details = req.body.Notification.details
   // const request_arrival_time = req.body.Notification.details

  
    const newNotification = new Notification({
      request_type : 0,
      isp_id : isp_id,
      details : details
    });
    

  
    newNotification.save()
      .then(() => res.json('Notification added!'))
      .catch(err => res.status(400).json('Error: ' + err));

  });

  router.route('/renewal').get((req, res) => {

    temp = Pending.find("coll1_id");
    db.coll1.find({_id:{$nin:temp}})

    Pending.find({},{isp_id : 1}).then((isps)=>{
      ISP.find({ispconnection_status : false},{isp_id : 1}).then((isps)=>{
        status = isps.connection_status
      }).catch((e) => {
        res.status(500)
      })
    }).catch((e) => {
      res.status(500)
    })

    Pending.find({}).then((users)=>{
      res.send(users)
    }).catch((e) => {
      res.status(500)
    })

  });
  

  router.route('/renewal/notify').post((req, res) => {
    const request_type = 0
    const isp_id = req.body.ispID
    const details = req.body.Notification.details
   // const request_arrival_time = req.body.Notification.details

    var status 
    ISP.find({isp_id: isp_id}).then((isps)=>{
      status = isps.connection_status
    }).catch((e) => {
      res.status(500)
    })

    if(!status) {
      const newNotification = new Notification({
        request_type : 0,
        isp_id : isp_id,
        details : "Make Payment to renew Connection"
    });

    newNotification.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
    

});
  
  module.exports = router;