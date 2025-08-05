const express = require("express");
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controller/product.controller.js");
const { upload } = require("../middleware/multer.middleware.js");

const router = express.Router();

// (upload.fields([
//     {
//         name: "avatar",
//         maxCount: 1
//     },
//     {
//         name: "coverImage",
//         maxCount: 1
//         'productImage'
//     }
// ]),

router.post("/product", upload.fields([{
    name: "productImage",
    maxCount: 1
}]), createProduct);

router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
