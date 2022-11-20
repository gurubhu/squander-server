const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Account = mongoose.model('Account');

const router = express.Router();

router.use(requireAuth);

router.post('/account', async (req, res)=>{
    try {
        if(!req.body.amount || !req.body.description) return res.status(400).json("Post data amount not provided");
        const { amount, description, expenseType } = req.body;       
        let account = new Account({
            amount,
            description,
            expenseType,
            userId: req.user._id
        });
        await account.save();
        res.send(account);
  } catch (error) {
      res.status(500).json({message:`Error in adding amount ${error}`});
  }   
});

router.get('/account', async (req, res)=>{
    try {
        const accounts = await Account.find({ userId : req.user._id });
        if(!accounts) return res.status(404).json({message : 'Account for this user is not found'})
        res.send(accounts);
  } catch (error) {
      res.status(500).json({message:`Error in getting all transactions ${error}`});
  }
});

router.get('/account/:accountId',async (req, res)=>{
    try {
        const account = await Account.findById(req.params.accountId);
        if(!account) return res.status(404).send(`The account with the give ID is not found`);
        res.send(account);
    } 
    catch (error) {
        res.status(500).json({message:`Error in getting account ${error}`});
    } 
});

router.put('/account/:accountId', async (req, res)=>{
    try {
        if(!req.body.amount || !req.body.description) return res.status(400).json("Post data amount not provided");

        const { amount, description} = req.body;

        const account = await Account.findByIdAndUpdate(req.params.accountId,{
            amount,
            description
        },{
            new : true
        });

        if(!account) return res.status(404).send(`The account with the give Id not found`);
        res.send(account);
        
  } catch (error) {
      res.status(500).json({message:`Error in adding amount ${error}`});
  }   
});



router.get('/accounts/total', async (req, res)=>{
    try {
        console.log('total routes called')
        const accounts = await Account.find({ userId : req.user._id });
        console.log(accounts);
        if(!accounts) return res.status(404).json({message : 'Account for this user is not found'})
        let total = 0;
        for(let account of accounts){
            if(account.expenseType === 'A')
                total += account.amount
        }
        res.json({total});
  } catch (error) {
      res.status(500).json({message:`Error in getting all transactions ${error}`});
  }
});

module.exports = router;