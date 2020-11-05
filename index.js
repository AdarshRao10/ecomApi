
let express= require('express');
//console.log(express);

//now to use any function we must use the variable express.
let app= express();
let mongoose = require('mongoose');


//conection



app.use(express.json());//the significance of this line is understood later in the code.

//now we re working on a local server so we need a port/website to work on i.e port 4800.
app.listen(4800,()=> console.log('port working on 4800'));


let genre = require('./routes/genremw');
let movie = require('./routes/moviemw');
let user = require('./routes/usermw');
let rental=require('./routes/rentalsmw');
//let fawn = require('fawn');
let register = require('./routes/user_regmw');
let auth = require('./routes/authmw');
let mailapi=require('./routes/mailapi');
let resetpassword = require('./routes/forgotpasswordapi');
//pagination
 let pagination = require('./routes/pagination');

//abhi course.js ek middle ware ki tarah kam karega.
let file = require('./routes/fileuploads');
//abhi uploads folder use karne ke liye niche ka line use kiya hai
app.use('/uploads',express.static("uploads"));
app.use('/api/',file);

app.use('/api/',genre);
app.use('/api/',movie);
app.use('/api/',user);
app.use('/api/',rental);
//fawn.init(mongoose);
app.use('/api/',register);
app.use('/api/',auth);
app.use('/api/',mailapi);
app.use('/api/',resetpassword);
//pagination
 app.use('/api/',pagination);
mongoose.connect('mongodb://localhost:27017/playground',{useNewUrlParser: true,useUnifiedTopology: true})//playgroud is db name
         .then(() => console.log('db connected'))
         .catch(error => console.log(`something went wrong ${error.message}`)); 
