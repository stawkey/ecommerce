const db = require("../models");
const Category = db.category;

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        console.error("Error in getAllCategories:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        console.error("Error in addCategory:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.status(200).json(category);
    } catch (err) {
        console.error("Error in updateCategory:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.status(200).json("Category deleted");
    } catch (err) {
        console.error("Error in deleteCategory:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};
