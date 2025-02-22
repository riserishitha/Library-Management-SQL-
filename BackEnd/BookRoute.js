const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
router.post("/book", async (req, res) => {
  try {
    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;
    if (!book_name || !book_cat_id || !book_collection_id || !book_launch_date || !book_publisher) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBook = await prisma.book.create({
      data: {
        book_name,
        book_cat_id,
        book_collection_id,
        book_launch_date: new Date(book_launch_date),
        book_publisher,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/book/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;
  
      if (!book_name || !book_cat_id || !book_collection_id || !book_launch_date || !book_publisher) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const bookId = parseInt(id);
      if (isNaN(bookId)) {
        return res.status(400).json({ error: "Invalid book ID format" });
      }  
      const existingBook = await prisma.book.findUnique({
        where: { book_id: bookId },
      });
  
      if (!existingBook) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      console.log("Updating book with data:", {
        book_id: bookId,
        book_name,
        book_cat_id,
        book_collection_id,
        book_launch_date: new Date(book_launch_date),
        book_publisher,
      });
  
      const updatedBook = await prisma.book.update({
        where: { book_id: bookId }, 
        data: {
          book_name,
          book_cat_id,
          book_collection_id,
          book_launch_date: new Date(book_launch_date),
          book_publisher,
        },
      });
  
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get("/listBooks", async (req, res) => {
    try {
      const books = await prisma.book.findMany();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get("/listBooks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const bookId = parseInt(id);
      if (isNaN(bookId)) {
        return res.status(400).json({ error: "Invalid book ID format" });
      }
      const book = await prisma.book.findUnique({
        where: { book_id: bookId }, 
      });
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

module.exports = router;
