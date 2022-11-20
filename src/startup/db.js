const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){

    //const mongoUri = 'mongodb://localhost/squanderdb';
    const mongoUri = 'mongodb+srv://admin:admin@cluster0.fyb0my4.mongodb.net/squanderdb'
    mongoose.connect(mongoUri);

    mongoose.connection.on('connected',()=>{
        console.log('Connected to mongo instance');
    });

    mongoose.connection.on('error', (error)=>{
        console.log('Error connecting to mongo', error);
    });
}