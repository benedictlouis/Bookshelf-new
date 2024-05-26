const express = require('express');
const { getBooksFromAPI, getAllBooks, getBookByIdFromDB, deleteBook, deleteAllBooks, updateBook, getBookByIdFromAPI, addBookByIdFromAPI } = require('../controllers/BookController');

const router = express.Router();

router.get('/', getBooksFromAPI); // Route to search and add books from Google Books API
router.get('/getAllBooks', getAllBooks);           // Route to get all books
router.get('/:id', getBookByIdFromAPI);         // Route to update a book by ID
router.get("/getBookById/:id", getBookByIdFromDB)
router.post('/:id', addBookByIdFromAPI);
router.put('/:id', updateBook);         // Route to update a book by ID
router.delete('/deleteBook/:id', deleteBook);      // Route to delete a book by ID
router.delete('/', deleteAllBooks);   

module.exports = router;
