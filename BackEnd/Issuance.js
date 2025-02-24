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

        const bookId = parseInt(book_id);
        const memberId = parseInt(issuance_member);
        if (isNaN(bookId) || isNaN(memberId)) {
            return res.status(400).json({ error: "Invalid book ID or member ID format" });
        }

        const bookExists = await prisma.book.findUnique({
            where: { book_id: bookId },
        });
        if (!bookExists) {
            return res.status(404).json({ error: `Book with ID ${bookId} does not exist.` });
        }

        const memberExists = await prisma.member.findUnique({
            where: { mem_id: memberId },
        });
        if (!memberExists) {
            return res.status(404).json({ error: `Member with ID ${memberId} does not exist.` });
        }

        const newIssuance = await prisma.issuance.create({
            data: {
                book_id: bookId,
                issuance_member: memberId,
                issuance_date: new Date(issuance_date),
                issued_by,
                target_return_date: new Date(target_return_date),
                issuance_status,
            },
        });

        res.status(201).json(newIssuance);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
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

        const bookId = parseInt(book_id);
        const memberId = parseInt(issuance_member);
        if (isNaN(bookId) || isNaN(memberId)) {
            return res.status(400).json({ error: "Invalid book ID or member ID format" });
        }

        const bookExists = await prisma.book.findUnique({
            where: { book_id: bookId },
        });
        if (!bookExists) {
            return res.status(404).json({ error: `Book with ID ${bookId} does not exist.` });
        }

        const memberExists = await prisma.member.findUnique({
            where: { mem_id: memberId },
        });
        if (!memberExists) {
            return res.status(404).json({ error: `Member with ID ${memberId} does not exist.` });
        }

        const updatedIssuance = await prisma.issuance.update({
            where: { issuance_id: issuanceId },
            data: {
                book_id: bookId,
                issuance_member: memberId,
                issuance_date: new Date(issuance_date),
                issued_by,
                target_return_date: new Date(target_return_date),
                issuance_status,
            },
        });

        res.status(200).json(updatedIssuance);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
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

router.get("/listIssuances/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const issuanceId = parseInt(id);
        if (isNaN(issuanceId)) {
            return res.status(400).json({ error: "Invalid issuance ID format" });
        }

        const issuance = await prisma.issuance.findUnique({
            where: { issuance_id: issuanceId },
        });

        if (!issuance) {
            return res.status(404).json({ error: `Issuance with ID ${issuanceId} not found.` });
        }

        res.status(200).json(issuance);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
