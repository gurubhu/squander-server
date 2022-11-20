const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next )=>{
    
    const { authorization }  = req.headers;

    //console.log('requireAuth', authorization);

    if(! authorization) return res.status(401).send({ error : 'You must be logged in.'});

    const token = authorization.replace('Squander ', '');

    //console.log('requireAuth', token);

    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload)=>{
        
        if(err) return res.status(401).send({ error : 'You must be logged in.'});

        const { userId } = payload;

        const user = await User.findById(userId);

        req.user = user;

        //console.log(req.user);

        next();
    });
}