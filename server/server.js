const express = require('express');
const morgan = require('morgan');   //it is a logger of requests
const bodyParser = require('body-parser'); //parsing the data from front to backend
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

//we need to add two middlewares
//we take connection string from the env cause to be secure
const uri = process.env.DATABASE;
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

const app = express();
mongoose.connect(uri, connectionParams).then(() => {
    console.log('Connected to database!');
}).catch((err) => {
    console.error(`Error connection to the database. \n${err}`);
})
   

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require apis
const productRoutes = require('./routes/product');
app.use('/api', productRoutes);


app.listen(3000, (err) => {
    if(err)
    console.log(err);
    else
    console.log("Listening on port: ", 3000);
});