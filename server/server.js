const express = require('express');
const morgan = require('morgan');   //it is a logger of requests
const bodyParser = require('body-parser'); //parsing the data from front to backend

//we need to add two middlewares

const app = express();

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