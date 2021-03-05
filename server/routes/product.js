const router = require('express').Router();
const Product = require("../models/product");
const upload = require('../middlewares/upload-photo');
// // const cloudinary = require('cloudinary');  
// title: String,
// description: String,
// photo: String,
// price: Number,
// stockQuantity: Number,
// rating: [Number]

// cloudinary.config({  
//     cloud_name: process.env.CLOUDNAME,
//     api_key: process.env.APIKEY,
//     api_secret: process.env.APISECRET
// });  

//POST request  - create a new product
router.post('/products', upload.single("photo"),  async (req, res) => {
    try{
        //console.log(req);
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;
        product.photo = req.file.path;
        // product.rating = req.body.rating;

        await product.save();

        res.json({
            status: true,
            message: "Saved!"
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
    
});



//GET request - get all products


//GET request - get a single product


//PUT request - update a single product


//DELTE request - delete a single product

module.exports = router;