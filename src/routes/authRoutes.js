const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res)=>{
    const { name, email, password,  selectedTermsAndCondition} = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(422).send({ error : 'This email already exists.'});

        const user = new User({ name, email, password, selectedTermsAndCondition });
        await user.save();
        
        const token = jwt.sign({userId : user._id, userName: user.name }, 'MY_SECRET_KEY');
        
        // let category1 = new Category({
        //     title : 'Child',
        //     description: `To track child expense`,
        //     userId: user._id
        // });
        // await category1.save();

        // let category2 = new Category({
        //     title : 'Education',
        //     description: `To track education expense`,
        //     userId: user._id
        // });
        // await category2.save();

        // let category3 = new Category({
        //     title : 'Nutrition',
        //     description: `To track nutrition expense`,
        //     userId: user._id
        // });
        // await category3.save();
    
        res.send({ token });
    } catch (error) {
        return res.status(422).send('Unable to create user account.');
    }
    
});

router.post('/signin', async (req, res)=>{
    const { email, password} = req.body;
    
    if(! email || !password) return res.status(422).send({ error : 'Must provide email and password.'});
    
    const user = await User.findOne({ email });

    if(!user) return res.status(422).send({ error : 'Inavalid password or email.'});

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId : user._id, userName: user.name },'MY_SECRET_KEY');
        res.send({ token });
    } catch (error) {
        return res.status(422).send({error : 'Error in try catch block'})
    }

});

module.exports = router;

