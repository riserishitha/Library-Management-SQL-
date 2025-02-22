const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
router.post("/membership", async (req, res) => {
  try {
    const { member_id, status } = req.body;
    if (!member_id || !status) {
      return res.status(400).json({ error: "Member ID and status are required" });
    }
    const newMembership = await prisma.membership.create({
      data: { member_id, status },
    });
    res.status(201).json(newMembership);
  } catch (error) {
    console.error("Error creating membership:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
