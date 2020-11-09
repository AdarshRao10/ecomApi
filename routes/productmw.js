let express = require('express');
let router = express();
let prodmodel = require('../schema/products');
//let bcrypt = require('bcrypt');

//creating product
router.post('/createProduct', async(req,res)=>{
    let result = user_reg.validationError(req.body);
    if(result.error)
    {
        return res.status(400).send(error.details[0].message)
    };
    let productItem = await prodmodel.product.findOne({"name":req.body.name});
    
    if(productItem)
    {
       return res.status(400).send({message:'product with similar name already exist!'})
    };

    let productobj = new prodmodel.product({
        name:req.body.name,
        image:req.body.image,
        description:req.body.description,
        price:req.body.price,
        offerprice:req.body.offerprice,
        isAvailable:req.body.isAvailable,
        isTodayoffer:req.body.isTodayoffer
    });

    await productobj.save();
    res.send({message:'product created'});
});


//updating productItem
router.put('/update/:id',async(req,res)=>{
    let findobj = await user_reg.productItem.findById(req.params.id);
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
    res.send({message:'productItem updated'});
  })

  //for delete operation
  router.delete('/delete/:id',async(req,res)=>{
    let findobj = await user_reg.productItem.findByIdAndRemove(req.params.id);
    if(!findobj)
    {
      return res.status(404).send({message:'Invalid id'}); 
    }
    res.send({message:'productItem deleted'});
});

//to get all users
router.get('/data',async(req,res)=>{
  let customerdata = await user_reg.productItem.find();
  //model mese table name milega aur uss table me kitne collections hai wo milenge.
   res.send(customerdata);
   }); 

module.exports = router;