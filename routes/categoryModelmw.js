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

//show all categories
router.post('/showCategories/:page',async(req,res)=>{
    let perpage = 4;
    let currentpage = req.params.page || 1;
    let data = await catmodel.category.find()
                                .skip((perpage * currentpage) - perpage)
                                .limit(perpage);
   let totalcount = await catmodel.category.find().count();
   let totalpages = Math.ceil(totalcount/perpage);
   res.send({
    perpage: perpage,
    currentpage: currentpage,
    data: data,
    totalcount: totalcount,
    totalpages:totalpages
   });

});

//update categories
router.put('/updateCat/:id',async(req,res)=>{
    let findobj = await catmodel.category.findById(req.params.id);
    if(!findobj)
    {
      return res.status(404).send({message:'Invalid id'}); 
    }
     
  let result = catmodel.validationError(req.body);
  if(result.error)
  {
      return res.status(400).send(result.error.details[0].message)
  }

    findobj.categoryName= req.body.categoryName;
    for (var i = 0; i < findobj.subcategory.length; i++) 
  {
    findobj.subcategory[i].catName=req.body.categoryName;
  }
    //findobj.subcategory[0].catName=req.body.categoryName
    //findobj.subcategory.catName=req.body.categoryName,
    //console.log(findobj.subcategory[0].catName);

   await findobj.save();
   console.log(findobj.subcategory[0].catName);
   res.send({message:'Category updated,please change the catName in subcategory table.'});

   //logic incomplete.
//    // simultanous updation of subcategory catName
//    for (var i = 0; i < findobj.subcategory.length; i++) 
//    {
//       let findobj1 =await subcatmodel.subcategory.findById(findobj.subcategory[i]._id); 
//       if(!findobj1)
//        {
//           return res.status(404).send({message:'Invalid id'}); 
//        }
    
//         let result1 = subcatmodel.validationError(req.body);
//         console.log(result1);
//         if(result1.error)
//           {
//              return res.status(400).send(result1.error.details[0].message)
//           }
   
//          findobj.catName=req.body.categoryName

//    await findobj.save();
//    res.send({message:'subcategory '+i+' updated'});
// }
  });



//for delete subcategory
router.delete('/deleteCat/:id',async(req,res)=>{
    let findobj = await catmodel.category.findByIdAndRemove(req.params.id);
    if(!findobj)
    {
      return res.status(404).send({message:'Invalid id'}); 
    }
    res.send({message:'category deleted'});
});
   

module.exports = router;