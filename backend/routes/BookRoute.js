const express = require('express');
const { getBooksFromAPI, getAllBooks, getBookByIdFromDB, deleteBook, deleteAllBooks, updateBook, getBookByIdFromAPI, addBookByIdFromAPI } = require('../controllers/BookController');

const router = express.Router();

router.get('/', getBooksFromAPI);
router.get('/getAllBooks', getAllBooks);          
router.get('/:id', getBookByIdFromAPI);         
router.get("/getBookById/:id", getBookByIdFromDB)
router.post('/:id', addBookByIdFromAPI);
router.put('/:id', updateBook);        
router.delete('/deleteBook/:id', deleteBook);     
router.delete('/', deleteAllBooks);   

module.exports = router;
