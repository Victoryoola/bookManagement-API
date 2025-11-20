const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// protect all book routes - user must be authenticated
router.use(auth);

const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/book');

router.route('/')
    .get(getBooks)
    .post(createBook);

router.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook);

module.exports = router;