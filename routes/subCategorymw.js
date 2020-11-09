let express = require('express');
let router = express();
let subcatmodel = require('../schema/subcategoryModel');
//let bcrypt = require('bcrypt');

//creating subcategory
router.post('/createSubcat', async(req,res)=>{
    let result = subcatmodel.validationError(req.body);
    if(result.error)
    {
        return res.status(400).send(result.error.details[0].message)
    };
    let subcatItem = await subcatmodel.subcategory.findOne({"name":req.body.name});
    
    if(subcatItem)
    {
       return res.status(400).send({message:'subcategory with similar name already exist!'})
    };

    let subcatobj = new subcatmodel.subcategory({
        name:req.body.name,
        catName:req.body.catName
    });

    await subcatobj.save();
    res.send({message:'subcategory created'});
});

//show all subcategories
router.post('/showSubcat/:page',async(req,res)=>{
    let perpage = 4;
    let currentpage = req.params.page || 1;
    let data = await subcatmodel.subcategory.find()
                                .skip((perpage * currentpage) - perpage)
                                .limit(perpage);
   let totalcount = await subcatmodel.subcategory.find().count();
   let totalpages = Math.ceil(totalcount/perpage);
   res.send({
    perpage: perpage,
    currentpage: currentpage,
    data: data,
    totalcount: totalcount,
    totalpages:totalpages
   });

});

//update subcategories
router.put('/updateSubcat/:id',async(req,res)=>{
    let findobj = await subcatmodel.subcategory.findById(req.params.id);
    if(!findobj)
    {
      return res.status(404).send({message:'Invalid id'}); 
    }
     
  let result = subcatmodel.validationError(req.body);
  console.log(result);
  if(result.error)
  {
      return res.status(400).send(result.error.details[0].message)
  }
    
    findobj.name= req.body.name,
    findobj.catName=req.body.catName

    await findobj.save();
    res.send({message:'subcategory updated'});
  });

//for delete subcategory
router.delete('/deleteSubcat/:id',async(req,res)=>{
    let findobj = await subcatmodel.subcategory.findByIdAndRemove(req.params.id);
    if(!findobj)
    {
      return res.status(404).send({message:'Invalid id'}); 
    }
    res.send({message:'subcat deleted'});
});
   

module.exports = router;