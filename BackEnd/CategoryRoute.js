const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
router.post("/category", async (req, res) => {
  try {
    const { cat_name, sub_cat_name } = req.body;
    if (!cat_name || !sub_cat_name) {
      return res.status(400).json({ error: "Both category name and sub-category name are required" });
    }
    const newCategory = await prisma.category.create({
      data: { cat_name, sub_cat_name },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getcategory", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error); 
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
