const Product = require('../model/product.models');
const Category = require('../model/productCategory.model');
const { uploadOnCloudinary } = require('../db/cloudinary');

exports.createProduct = async (req, res) => {
  try {
    const { productName, category, price, rating, description } = req.body;
    console.log(uploadOnCloudinary()); 

    const avatarLocalPath = req.files?.productImage?.[0]?.path; 
    if (!avatarLocalPath) {
      return res.status(400).json({ error: 'Product image is required' });
    }
    console.log(avatarLocalPath, "avatarLocalPath");

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar?.url) {
      return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
    }

    const newProduct = new Product({
      productName,
      productImage: avatar.url, 
      category,
      price,
      rating,
      description,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Product creation failed:', err);
    res.status(500).json({ error: 'Product creation failed', details: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productName, productImage, categoryName, price, rating, description } = req.body;

    let existingCategory = await Category.findOne({ name: categoryName });
    if (!existingCategory) {
      existingCategory = new Category({ name: categoryName });
      await existingCategory.save();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        productImage, 
        category: existingCategory._id,
        price,
        rating,
        description,
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Product update failed:', err);
    res.status(500).json({ error: 'Product update failed', details: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Product deletion failed:', err);
    res.status(500).json({ error: 'Product deletion failed', details: err.message });
  }
};
