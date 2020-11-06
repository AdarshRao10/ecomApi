let mongoose = require('mongoose');
let Joi = require('Joi');
let subcat = require('./subcategoryModel');
let categorySchema = mongoose.Schema({
    categoryName:{type:String,min:4,max:250,required:true},
    subcategory:[subcat.subcategorySchema]
});

let category = mongoose.model('category',categorySchema);

function validationError(error){
    let schema = Joi.object({
        categoryName:Joi.string().min(4).max(250).required(),
        subcategoryId:Joi.string().min(4).max(250).required()
    });
    return schema.validate(error);
}
module.exports = {category,categorySchema,validationError};