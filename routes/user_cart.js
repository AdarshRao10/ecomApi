let express = require('express');
const userCartModel = require('../schema/userCartModel');
let router = express();
let cartdmodel = require('../schema/userCartModel');
let prodmodel = require('../schema/products');
const { cartItemRecords } = require('../schema/userCartModel');
var objfound;
var Arr = new Array();
var Arr1 = new Array();
var Arr2 = new Array();

//insert products in a cart
router.post('/AddToCart', async(req,res)=>{
    let result = cartdmodel.validationError2(req.body);
    if(result.error)
    {
        return res.status(400).send(result.error.details[0].message)
    };
    let user = await cartdmodel.userCartItem.findOne({"userEmail":req.body.userEmail});
    
    if(user)
    {
       return res.status(400).send({message:'email already exist!'})
    };

    //fetch all product details
    for (var i = 0; i < req.body.cartItems.length; i++) 
  {

         objfound = await prodmodel.product.findById(req.body.cartItems[i]);
         if(!objfound) 
         {
           return res.status(404).send({message:'invalid product id'});
         };
       
         Arr.push(objfound);
     }
     console.log(Arr);
     
     //get product quantity
    for (var i = 0; i < req.body.quantity.length; i++) 
    {
        
        Arr1.push( req.body.quantity[i]);

       }
       console.log(Arr1);

 //fetching product details and adding it to cartItemRecord model
 for (var i = 0; i < Arr.length; i++) 
 {
    let CartObj = new cartdmodel.cartItemRecords({
        prodId:Arr[i]._id,
        name:Arr[i].name,
        image:Arr[i].image,
        offerprice:Arr[i].offerprice,
        quantity:Arr1[i]
        // totalprice:Arr[i].totalprice
    });
        
      
        Arr2.push(CartObj);
}
console.log(Arr2);
// var p =parseInt(Arr2[1].offerprice);
//      var q =parseInt(Arr2[1].quantity);
//      var sum=p*q;
//      console.log(sum);
var sum=0;
for (var i = 0; i < Arr2.length; i++) 
 {
          var p =parseInt(Arr2[i].offerprice);
          var q =parseInt(Arr2[i].quantity);
          sum=sum+(p*q);
}
console.log(sum);

let FinalCartObj = new cartdmodel.FinalCart({
   userEmail:req.body.userEmail,
   cartItems:Arr2,
   grandtotal:sum
});
console.log(FinalCartObj);

   await FinalCartObj.save();
   res.send({message:'products added to cart'});
   Arr = [];
   Arr1 = [];
   Arr2 = [];

});

module.exports = router;