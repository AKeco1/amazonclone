const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});

var storage = multer.diskStorage({});  
  
var upload = multer({storage:storage});  

module.exports = upload;
