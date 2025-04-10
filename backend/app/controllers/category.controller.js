const db = require("../models");
const Category = db.category;

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while getting categories" });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while adding a new category" });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.status(200).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating a category" });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.status(200).json("Category deleted");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting a category" });
    }
};
