let mongoose = require('mongoose');
let Joi = require('Joi');
const { string } = require('Joi');
let subcategorySchema = mongoose.Schema({
    name:{type:String,min:4,max:250,required:true},
    catName:{type:String}//root category name
});

let subcategory = mongoose.model('subCategory',subcategorySchema);

function validationError(error){
    let schema = Joi.object({
        name:Joi.string().min(4).max(250).required()
    });
    return schema.validate(error);
}
module.exports = {subcategory,subcategorySchema,validationError};