const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client"); 
const app = express();
const prisma = new PrismaClient(); 
dotenv.config();
app.use(cors());
app.use(express.json());
app.post("/collection", async (req, res) => {
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
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
