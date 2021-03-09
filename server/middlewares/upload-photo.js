const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});


// const storage = multer.diskStorage({});  
  
// const upload = multer({storage:storage});    

// const upload = multer({
//     storage: cloudinaryStorage({
//         cloudinary: cloudinary,
//         folder: 'xxx',
//         filename: function(req, file, cb){
//             cb(undefined, file.originalname);
//         }
//     })
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'xxx',
      format: async (req, file) => 'jpg', // supports promises as well
      public_id: (req, file) => 'fileName',
    },
  });

const upload = multer({storage});

// const upload = cloudinary.uploader.upload(req.fi)


module.exports = upload;
