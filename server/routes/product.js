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
router.get('/products', async(req, res) => {
    try {
        let products = await Product.find();

        res.json({
            products: products,
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

//GET request - get a single product
router.get('/products/:id', async(req, res) => {
   try {
       let product = await Product.findOne({_id: req.prams.id });

       res.json({
           products: product,
           success: true
       });
   } catch (err) {
       res.status(500).json({
           success: false,
           message: err.message
       });
   } 
});

//PUT request - update a single product
router.put('/products/:id', upload.single("photo"), async(req, res) => {
    try {
        let product = Product.findOneAndUpdate({ _id: req.params.id }, 
            {
                $set:{
                    title: req.body.title,
                    price: req.body.price,
                    category: req.body.categoryID,
                    photo: req.file.url,
                    description: req.body.description,
                    owner: req.body.ownerID
                }
            }, 
            {
                upsert: true
            });

            res.json({
            success: true,
            updatedProduct: product 
            });
            
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

//DELTE request - delete a single product
router.delete('/products/:id', async(req, res) => {
    try {
        let product = await Product.findByIdAndDelete(req.params.id);

        if(product){
                    res.json({
                        success: true,
                        message: "Product deleted!"
                    });
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;