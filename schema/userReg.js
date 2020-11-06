let mongoose = require('mongoose');
let Joi = require('Joi');
let user_reg = mongoose.Schema({
    firstname:{type:String,min:4,max:250,required:true},
    lastname:{type:String,min:4,max:250,required:true},
    newslettercheck:{type:Boolean},
    userlogin:{
        emailId:{type:String,required:true,unique:true},
        password:{type:String,required:true}
    },
    termsAcceptcheck:{type:Boolean,required:true},
    resetpasswordtoken:{type: String},
    resetpasswordexpires:{type:Date},
    recordDate:{type:Date,default: Date.now},
    updateDate:{type:Date,default: Date.now}
});

let user = mongoose.model('customers',user_reg);

function validationError(error){
    let schema = Joi.object({
        firstname:Joi.string().min(4).max(250).required(),
        lastname:Joi.string().min(4).max(250).required(),
        userlogin:{
            emailId:Joi.string().required(),
            password: Joi.string().required()
        },
        termsAcceptcheck:Joi.boolean().required().invalid(false)
    });
    return schema.validate(error);
}
module.exports = {user,user_reg,validationError};