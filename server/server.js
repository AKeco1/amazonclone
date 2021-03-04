const express = require('express');
const morgan = require('morgan');   //it is a logger of requests
const bodyParser = require('body-parser'); //parsing the data from front to backend
const mongoose = require('mongoose');

//we need to add two middlewares
const uri = `mongodb+srv://root:fRW5S26rofYbXl4c@amazonclone.mvn2u.mongodb.net/amazonclone?retryWrites=true&w=majority`;
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

//retreaive data from the servers
app.get('/', (req, res) => {
    res.json("Hello amazon clone!");
});

//send data from front to backend
app.post('/', (req, res) => {
    console.log(req.body.name);
})

app.listen(3000, (err) => {
    if(err)
    console.log(err);
    else
    console.log("Listening on port: ", 3000);
});