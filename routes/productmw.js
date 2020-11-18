let express = require('express');
let router = express();
let prodmodel = require('../schema/products');
let port = "http://localhost:4800";
let multer = require('multer');
let catmodel = require('../schema/categoryModel');
let subcatmodel = require('../schema/subcategoryModel');
const { subcategory } = require('../schema/subcategoryModel');
const { category } = require('../schema/categoryModel');
const { product } = require('../schema/products');
const { string } = require('Joi');
var imageName;

//let bcrypt = require('bcrypt');

//upload product images
let storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./uploads/');//cb(error hua toh kya hoga,agar error nahi hua toh ye destination folder hai)
  },
  
  filename: function(req,file,cb){
      cb(null,file.originalname);
  }
});

// file jo upload hoga usko check kiya jyenga i.e qo ek certain type ka hi hona chahiye.
let filefilter = function(req,file,cb){
  if(file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg")
  {
      cb(null,true);
  }
  else
  {
     cb(null,false);
  }
}

let upload = multer({
  storage: storage,
  limits:{
    fieldSize: 1024*1024*5 //(1024*1024)i.e 1mb*5 = 5mb
  },
  fileFilter: filefilter
});

//creating product
router.post('/createProduct',upload.single('image'), async(req,res)=>{
    //joi validation some error occurs
    // let result = prodmodel.validationError(req.body);
    // if(result.error)
    // {
    //     return res.status(400).send(result.error.details[0].message)
    // };
    let productItem = await prodmodel.product.findOne({"name":req.body.name});
    
    if(productItem)
    {
       return res.status(400).send({message:'product with similar name already exist!'})
    };

// fetching category data, 1st validate incoming data then fetch the object    
  // let result0 = prodmodel.validationError(req.body.category);
  // if(result0.error)
  // {
  //     return res.status(400).send(result0.error.details[0].message)
  // }
  // console.log(result0);

  let findobj = await catmodel.category.findById(req.body.category);
    if(!findobj)
    {
      return res.status(404).send({message:'Invalid category id'}); 
    }
    
 

  //fetchting subcategory data
// let result1 = prodmodel.validationError(req.body.subcategory);
// if(result1.error)
// {
//     return res.status(400).send(result1.error.details[0].message);
// }
// console.log(result1);

let findobj1 = await subcatmodel.subcategory.findById(req.body.subcategory);
  if(!findobj1)
  {
    return res.status(404).send({message:'Invalid subcategory id'}); 
  }
 // console.log(req.body.subcategory);
    
    
    
  
    let productobj = new prodmodel.product({
        name:req.body.name,
        image:port + "/uploads/"+ req.file.filename,
        //https:localhost:4800/uploads/
        description:req.body.description,
        price:req.body.price,
        offerprice:req.body.offerprice,
        isAvailable:req.body.isAvailable,
        isTodayoffer:req.body.isTodayoffer,
        category:{
          categoryName:findobj.categoryName
      },
      subcategory:{
        name:findobj1.name
      },
    });
    console.log(productobj);
     await productobj.save();
     res.send({message:'product created'});
});


//updating productItem excluding images image updation will be performed later.
router.put('/updateProduct/:id',async(req,res)=>{
    let findobj = await prodmodel.product.findById(req.params.id);
    if(!findobj)
    {
      return res.status(404).send({message:'Invalid id'}); 
    }

   console.log(findobj);
 
    var attribute = req.body;
    var keys = Object.keys(attribute);
    var values= Object.values(attribute);
   console.log(keys);
    
    for (var i = 0; i < keys.length; i++) {
     var names = keys[i];
     var key_data = values[i];
     findobj[names]=key_data;
     await findobj.save();
    }
    res.send({message:'product updated'});
    
  })

  
  //Deleting product along with its image from folder.
  router.delete('/deleteProduct/:id',async(req,res)=>{
    let findobj = await prodmodel.product.findByIdAndRemove(req.params.id);
    if(!findobj)
    {
      return res.status(404).send({message:'Invalid id'}); 
    }

    console.log(findobj); 

    //find image path.
    // Initialize string 
    var str = findobj.image; 
    var seperator = "/";  
    splitStr(str, seperator);

    function splitStr(str, seperator) { 
      
      // Function to split string 
      var string = str.split(seperator); 
        
      console.log(string); 
      //we now obtained image name from url
       imageName = string[string.length-1];
      console.log(imageName);
  } 

    //before deleting the product we must delete the image from the server
      const fs = require('fs')
      const path = './uploads/'+imageName;
      fs.unlink(path, (err) => {
      if (err) {
      console.error(err);
      return;
      }
      //file removed
      })

    res.send({message:'product deleted'});
});



//show all products
router.post('/showProducts/:page',async(req,res)=>{
  let perpage = 4;
  let currentpage = req.params.page || 1;
  let data = await prodmodel.product.find()
                              .skip((perpage * currentpage) - perpage)
                              .limit(perpage);
 let totalcount = await prodmodel.product.find().count();
 let totalpages = Math.ceil(totalcount/perpage);
 res.send({
  perpage: perpage,
  currentpage: currentpage,
  data: data,
  totalcount: totalcount,
  totalpages:totalpages
 });

});module.exports = router;
//5fb4e62c47c45f3060f2d960