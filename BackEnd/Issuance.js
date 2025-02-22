const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
router.post("/issuance", async (req, res) => {
    try {
      const { book_id, issuance_member, issuance_date, issued_by, target_return_date, issuance_status } = req.body;
      if (!book_id || !issuance_member || !issuance_date || !issued_by || !target_return_date || !issuance_status) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const bookExists = await prisma.book.findUnique({
        where: { book_id }
      });
      if (!bookExists) {
        return res.status(400).json({ error: `Book with ID ${book_id} does not exist.` });
      }  
      const memberExists = await prisma.member.findUnique({
        where: { mem_id: issuance_member }
      });
      if (!memberExists) {
        return res.status(400).json({ error: `Member with ID ${issuance_member} does not exist.` });
      }
      const newIssuance = await prisma.issuance.create({
        data: {
          book_id,
          issuance_member,
          issuance_date: new Date(issuance_date),
          issued_by,
          target_return_date: new Date(target_return_date),
          issuance_status
        },
      });
      res.status(201).json(newIssuance);
    } catch (error) {
      console.error("❌ Error creating issuance:", error);
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/issuance/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { book_id, issuance_member, issuance_date, issued_by, target_return_date, issuance_status } = req.body;
  
      if (!book_id || !issuance_member || !issuance_date || !issued_by || !target_return_date || !issuance_status) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const issuanceId = parseInt(id);
      if (isNaN(issuanceId)) {
        return res.status(400).json({ error: "Invalid issuance ID format" });
      }
  
      const existingIssuance = await prisma.issuance.findUnique({
        where: { issuance_id: issuanceId }, 
      });
  
      if (!existingIssuance) {
        return res.status(404).json({ error: `Issuance record with ID ${issuanceId} not found.` });
      }
      const bookExists = await prisma.book.findUnique({
        where: { book_id },
      });
  
      if (!bookExists) {
        return res.status(400).json({ error: `Book with ID ${book_id} does not exist.` });
      }  
      const memberExists = await prisma.member.findUnique({
        where: { mem_id: issuance_member },
      });
  
      if (!memberExists) {
        return res.status(400).json({ error: `Member with ID ${issuance_member} does not exist.` });
      }
  
      console.log("Updating issuance record:", {
        issuance_id: issuanceId,
        book_id,
        issuance_member,
        issuance_date,
        issued_by,
        target_return_date,
        issuance_status,
      });
  
      const updatedIssuance = await prisma.issuance.update({
        where: { issuance_id: issuanceId }, 
        data: {
          book_id,
          issuance_member,
          issuance_date: new Date(issuance_date),
          issued_by,
          target_return_date: new Date(target_return_date),
          issuance_status,
        },
      });
  
      res.status(200).json(updatedIssuance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.get("/listIssuances", async (req, res) => {
    try {
      const issuances = await prisma.issuance.findMany();
      res.status(200).json(issuances);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
module.exports = router;
