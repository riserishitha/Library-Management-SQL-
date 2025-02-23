const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
router.post("/collection", async (req, res) => {
  try {
    const { collection_name } = req.body;
    if (!collection_name) {
      return res.status(400).json({ error: "collection_name is required" });
    }
    const newCollection = await prisma.collection.create({
      data: { collection_name },
    });
    res.status(201).json(newCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getcollection", async (req, res) => {
  try {
    const collections = await prisma.collection.findMany();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
