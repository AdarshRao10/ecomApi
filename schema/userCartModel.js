let mongoose = require('mongoose');
let Joi = require('Joi');
let cartItemSchema = mongoose.Schema({
    prodId:{type:String,min:4,max:250},
    name:{type:String,min:4,max:250},
    image:{type:String,min:4,max:250},
    offerprice:{type:Number,minlength:1,required:true},
    quantity:{type:Number,minlength:1,required:true},
    //totalprice:{type:Number,minlength:1,required:true},
    recordDate:{type:Date,default:Date.now},
    updateDate:{type:Date,default:Date.now}
});

let cartItemRecords = mongoose.model('cartItemRecords',cartItemSchema);

let userCartSchema = mongoose.Schema({
    userEmail:{type:String,min:4,max:250,required:true},
    cartItems:{type:cartItemSchema,required:true},
    quantity:{type:Number,minlength:1,required:true}
});

let userCartItem = mongoose.model('userCartItem',userCartSchema);

//final cart
let FinalCartSchema = mongoose.Schema({
    userEmail:{type:String,min:4,max:250,required:true},
    cartItems:{type:Array,required:true},
    grandtotal:{type:Number,minlength:1,required:true}
});

let FinalCart = mongoose.model('userCart',FinalCartSchema);

//for cart
function validationError1(error){
    let schema = Joi.object({
        name:Joi.string().min(4).max(250).required(),
        email:Joi.string().min(4).max(250).required(),
        personalmessage:Joi.string().min(4).max(250).required()
    });
    return schema.validate(error);
}

//for usercart
function validationError2(error){
    let schema2 = Joi.object({
        userEmail:Joi.string().min(4).max(250).required(),
        //cartItems:Joi.string().required()
        cartItems:Joi.array().items(Joi.string()),
        quantity:Joi.array().items(Joi.number())
        
        
    });
    return schema2.validate(error);
}
module.exports = {cartItemRecords,userCartItem,FinalCart,cartItemSchema,userCartSchema,validationError1,validationError2};