const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const auth = require("../middleware/auth");

// Get all books (protected)
router.get("/", auth, async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Add a book (protected)
router.post("/", auth, async (req, res) => {
    const book = await Book.create(req.body);
    res.status(201).json(book);
});

// Get a single book by ID (protected)
router.get("/:id", auth, async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
});

// Update book
router.put("/:id", auth, async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
});

// Delete book
router.delete("/:id", auth, async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
});

module.exports = router;
