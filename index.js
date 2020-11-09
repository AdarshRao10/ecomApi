
let express= require('express');
//console.log(express);

//now to use any function we must use the variable express.
let app= express();
let mongoose = require('mongoose');
let configuration = require('config');
const { config } = require('process');

app.use(express.json());

app.listen(4800,()=> console.log('port working on 4800'));

console.log(`mode:${process.env.NODE_ENV}`);
console.log(`default mode:${app.get('env')}`);
//to set mode use command SET MODE ENV-development
console.log(`name: ${configuration.get('name')}`);
console.log(`email: ${configuration.get('email')}`);
console.log(`password: ${configuration.get('key')}`);
console.log('mongodb+srv://Adarsh10:'+configuration.get('key')+'@cluster0.kemhz.mongodb.net/ecommerce?retryWrites=true&w=majority');

let register = require('./routes/user_Regmw');
let subcat = require('./routes/subCategorymw');
let category = require('./routes/categoryModelmw');

 app.use('/api/',register);
 app.use('/api/',subcat);
 app.use('/api/',category);
// mongoose.connect('mongodb+srv://Adarsh10:<password>@cluster0.kemhz.mongodb.net/ecommerce?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})//ecommerce is db name
//          .then(() => console.log('db connected'))
//          .catch(error => console.log(`something went wrong ${error.message}`)); 

mongoose.connect('mongodb+srv://Adarsh10:'+configuration.get('key')+'@cluster0.kemhz.mongodb.net/ecommerce?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})//ecommerce is db name
         .then(() => console.log('db connected'))
         .catch(error => console.log(`something went wrong ${error.message}`)); 



