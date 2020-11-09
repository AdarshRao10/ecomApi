let express = require('express');
const { array } = require('Joi');
let router = express();
let catmodel = require('../schema/categoryModel');
const { subcategory } = require('../schema/subcategoryModel');
let subcatmodel = require('../schema/subcategoryModel');
var objfound;
var Arr = new Array();
//let bcrypt = require('bcrypt');

//creating category
router.post('/createCategory', async(req,res)=>{
    let result = catmodel.validationError(req.body);
    if(result.error)
    {
        return res.status(400).send(result.error.details[0].message)
    };
    let catItem = await catmodel.category.findOne({"categoryName":req.body.categoryName});
    
    if(catItem)
    {
       return res.status(400).send({message:'category with similar name already exist!'})
    };

//      //for loop to fetch array elements
//    for (var i = 0; i < req.body.subcategory.length; i++) {
//     let value =req.body.subcategory[i] ;
//     console.log(value);
//   }


// console.log(req.body.subcategory);
// console.log(req.body.subcategory[0]);
// console.log(req.body.subcategory[1]);
// console.log(req.body.subcategory.length);
   
for (var i = 0; i < req.body.subcategory.length; i++) 
  {

        //here we get the subcategories with given category,here in subcat array we get elements whose id will be given as input
         objfound = await subcatmodel.subcategory.findById(req.body.subcategory[i]);
         if(!objfound) 
         {
           return res.status(404).send({message:'invalid subcat id'});
         };
       
         Arr.push(objfound);
     }
     console.log(Arr);
     

        //console.log(objfound.name);
        //console.log(objfound.catName);
        //  for (var i = 0; i < req.body.subcategory.length; i++) {
        //   let value =req.body.subcategory[i] ;
        //   console.log(value);
        // }

         let catobj = new catmodel.category({
             categoryName:req.body.categoryName,
             //subcat id must be mentioned here
             subcategory:Arr
         });

        await catobj.save();
        res.send({message:'category created'});
        Arr = [];
   
});

module.exports = router;