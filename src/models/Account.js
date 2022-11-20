const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    amount : {
        type : Number,
        required : true
    },
    description: {
        type: String,
        required: true
    },
    expenseType : {
        type : String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
});

const Account = mongoose.model('Account', accountSchema);