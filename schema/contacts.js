let mongoose = require('mongoose');
let Joi = require('Joi');
let contactSchema = mongoose.Schema({
    name:{type:String,min:4,max:250,required:true},
    email:{type:String,min:4,max:250,required:true},
    personalmessage:{type:String,min:4,max:250,required:true}
});

let contact = mongoose.model('contacts',contactSchema);

function validationError(error){
    let schema = Joi.object({
        name:Joi.string().min(4).max(250).required(),
        email:Joi.string().min(4).max(250).required(),
        personalmessage:Joi.string().min(4).max(250).required()
    });
    return schema.validate(error);
}
module.exports = {contact,contactSchema,validationError};