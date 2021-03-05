const router = require('express').Router();
const Product = require("../models/product");


// title: String,
// description: String,
// photo: String,
// price: Number,
// stockQuantity: Number,
// rating: [Number]



//POST request  - create a new product
router.post('/products', async (req, res) => {
    try{
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;
        product.photo = req.body.photo;
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