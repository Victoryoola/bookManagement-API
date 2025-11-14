const Book = require('../models/book');

exports.getBooks = async (req, res, next) => {
  try {
    const { author, page = 1, limit = 10 } = req.query;
    const query = author ? { author: new RegExp(author, 'i') } : {};

    const books = await book.find(filter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
    
    const total = await book.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: books
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const bookItem = await book.findById(req.params.id);
    if (!bookItem) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: bookItem });
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
    try {
    const { title, author, year, genre   } = req.body;
    const newBook = await Book.create ({ title, author, year, genre  });
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    next(error);
  } 
};

exports.updateBook = async (req, res, next) => {
  try {
    const book= await book.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  }
  catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const bookItem = await book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
};
    