
let express= require('express');
//console.log(express);

//now to use any function we must use the variable express.
let app= express();
let mongoose = require('mongoose');

app.use(express.json());

app.listen(4800,()=> console.log('port working on 4800'));

let register = require('./routes/user_Regmw');

 app.use('/api/',register);
mongoose.connect('mongodb+srv://Adarsh10:sarita222@cluster0.kemhz.mongodb.net/ecommerce?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})//ecommerce is db name
         .then(() => console.log('db connected'))
         .catch(error => console.log(`something went wrong ${error.message}`)); 
