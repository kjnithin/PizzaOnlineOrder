var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE_DEV);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', function(err) {
    console.log(err);
});