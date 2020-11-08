let express = require('express');
let router = express();
let user_reg = require('../schema/userReg');
let bcrypt = require('bcrypt');

//creating user
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


//updating user
router.put('/update/:id',async(req,res)=>{
    let findobj = await user_reg.user.findById(req.params.id);
    if(!findobj)
    {
      return res.status(404).send({message:'Invalid id'}); 
    }
     
  let result = user_reg.validationError(req.body);
  console.log(result);
  if(result.error)
  {
      return res.status(400).send(result.error.details[0].message)
  }
    //findobj.name = req.body.name;
    findobj.firstname= req.body.firstname,
    findobj.lastname=req.body.lastname,
    findobj.userlogin=req.body.userlogin;
    //encrypt password
    let salt = await bcrypt.genSalt(10);
    findobj.userlogin.password = await bcrypt.hash(findobj.userlogin.password,salt);

    await findobj.save();
    res.send({message:'user updated'});
  })

  //for delete operation
  router.delete('/delete/:id',async(req,res)=>{
    let findobj = await user_reg.user.findByIdAndRemove(req.params.id);
    if(!findobj)
    {
      return res.status(404).send({message:'Invalid id'}); 
    }
    res.send({message:'user deleted'});
});

//to get all users
router.get('/data',async(req,res)=>{
  let customerdata = await user_reg.user.find();
  //model mese table name milega aur uss table me kitne collections hai wo milenge.
   res.send(customerdata);
   }); 

module.exports = router;