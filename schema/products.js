let mongoose = require('mongoose');
let Joi = require('Joi');
let cat = require('./categoryModel');
let subcat = require('./subcategoryModel');
let productSchema = mongoose.Schema({
    name:{type:String,min:4,max:250,required:true},
    image:{type:String,min:4,max:250,required:true},
    description:{type:String,min:4,max:250,required:true},
    price:{type:Number,minlength:1,required:true},
    offerprice:{type:Number,minlength:1,required:true},
    isAvailable:{type:Boolean,required:true},
    isTodayoffer:{type:Boolean,required:true},
    // category:{
    //     type:cat.categorySchema,required:true
    // },
    // subcategory:{
    //     type:subcat.subcategorySchema,required:true
    // },
    category:{type:cat.categorySchema},
    subcategory:{type:subcat.subcategorySchema},
    recordDate:{type:Date,default:Date.now},
    updateDate:{type:Date,default:Date.now}
});

let product = mongoose.model('products',productSchema);

function validationError(error){
    let schema = Joi.object({
        name:Joi.string().min(4).max(250).required(),
        description: Joi.string().min(4).max(250).required(),
        price:Joi.number().integer().min(0).max(200000).required(),
        offerprice:Joi.number().integer().min(0).max(200000).required(),
        isAvailable:Joi.boolean().required().invalid(false),
        isTodayoffer:Joi.boolean().required().invalid(false),
        category:Joi.object.required(),
        subcategory:Joi.object.required()
    });
    return schema.validate(error);
}
module.exports = {product,validationError};