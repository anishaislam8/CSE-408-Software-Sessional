var mongoose = require('mongoose');

// Just one time
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true,
    useFindAndModify : false
});

mongoose.exports = {mongoose};