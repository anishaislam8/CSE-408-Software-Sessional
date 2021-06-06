// Load the library and connect to the database

// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect(
    "mongodb://localhost:27017/EasyInternetService", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err,client)=>{
        if(err){
            return console.log("Unable to connect mongodb server");
        }

        console.log("Connected to MongoDB server");

        const db = client.db('EasyInternetService');

        //collection
        db.collection('Union').insertOne({
            name : "Anisha",
            union_id : "1",
            upazilla_id : "1"
        },(err, result) =>{
            if(err){
                return console.log("Unable to insert division. ", err);
            }
            console.log(JSON.stringify(result.ops, undefined, 2));
            client.close();
        })

      
        
    }
)
