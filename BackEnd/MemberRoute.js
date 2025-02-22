const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
router.post("/member", async (req, res) => {
  try {
    const { mem_name, mem_phone, mem_email } = req.body;
    if (!mem_name || !mem_phone || !mem_email) {
      return res.status(400).json({ error: "Member name, phone number, and email ID are required" });
    }
    const newMember = await prisma.member.create({
      data: { mem_name, mem_phone, mem_email },
    });
    res.status(201).json(newMember);
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/member/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { mem_name, mem_phone, mem_email } = req.body;
  
      if (!mem_name || !mem_phone || !mem_email) {
        return res.status(400).json({ error: "Member name, phone number, and email ID are required" });
      }
  
      const memberId = parseInt(id);
      if (isNaN(memberId)) {
        return res.status(400).json({ error: "Invalid member ID format" });
      }  
      const existingMember = await prisma.member.findUnique({
        where: { mem_id: memberId },
      });
  
      if (!existingMember) {
        return res.status(404).json({ error: "Member not found" });
      }
  
      console.log("Updating member with data:", {
        mem_id: memberId,
        mem_name,
        mem_phone,
        mem_email,
      });
  
      const updatedMember = await prisma.member.update({
        where: { mem_id: memberId }, 
        data: { mem_name, mem_phone, mem_email },
      });
  
      res.status(200).json(updatedMember);
    } catch (error) {
      console.error("Error updating member:", error);
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/listMembers", async (req, res) => {
    try {
      const members = await prisma.member.findMany();
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
module.exports = router;
