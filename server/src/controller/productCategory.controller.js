const Category = require('../model/productCategory.model');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const checkCategory = await Category.findOne({ name });
    if (checkCategory) {
      return res.status(400).json({ message: "This category already exists" });
    }

    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, failed to create category" });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, failed to retrieve categories" });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, failed to retrieve category" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (name) {
      const existingCategory = await Category.findOne({ name, description  });
      if (existingCategory) {
        return res.status(400).json({ message: "Category with this name already exists" });
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, failed to update category" });
  }
};

// Delete category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, failed to delete category" });
  }
};
