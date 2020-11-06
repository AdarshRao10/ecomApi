let express = require('express');
let router = express();
let user_reg = require('../schema/userReg');
let bcrypt = require('bcrypt');

router.post('/register', async(req,res)=>{
    let result = user_reg.validationError(req.body);
    if(result.error)
    {
        return res.status(400).send(error.details[0].message)
    };
    let user = await user_reg.user.findOne({"userlogin.emailId":req.body.userlogin.emailId});
    
    if(user)
    {
       return res.status(400).send({message:'email id already exist!'})
    };

    let newcustomer = new user_reg.user({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        userlogin:req.body.userlogin,
        termsAcceptcheck:req.body.termsAcceptcheck
    });
    let salt = await bcrypt.genSalt(10);
    newcustomer.userlogin.password = await bcrypt.hash(newcustomer.userlogin.password,salt);
    await newcustomer.save();
    res.send({message:'registration sucessful'});
});

module.exports = router;