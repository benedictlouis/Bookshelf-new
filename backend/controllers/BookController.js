const axios = require('axios');
const Book = require('../models/BookModel');

const getBooksFromAPI = async (req, res) => {
    const apiKey = process.env.API_KEY;
    const genre = "Fiction";
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&key=${apiKey}&maxResults=40`;
    
    try {
        const response = await axios.get(url);
        const books = response.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
            description: item.volumeInfo.description,
            year: item.volumeInfo.publishedDate,
            publisher: item.volumeInfo.publisher,
            pageCount: item.volumeInfo.pageCount,
            imageUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
            infoLink: item.volumeInfo.infoLink
        }));
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookByIdFromDB = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getBookByIdFromAPI = async (req, res) => {
    const { id } = req.params;
    const apiKey = process.env.API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const bookData = response.data;
        
        if (!bookData || !bookData.volumeInfo) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const book = {
            id: bookData.id,
            title: bookData.volumeInfo.title,
            author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(', ') : 'Unknown',
            description: bookData.volumeInfo.description,
            year: bookData.volumeInfo.publishedDate,
            publisher: bookData.volumeInfo.publisher,
            pageCount: bookData.volumeInfo.pageCount,
            imageUrl: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : null,
            infoLink: bookData.volumeInfo.infoLink
        };

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addBookByIdFromAPI = async (req, res) => {
    const { id } = req.params;
    const apiKey = process.env.API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const bookData = response.data;

        if (!bookData || !bookData.volumeInfo) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const newBook = new Book({
            id: bookData.id,
            title: bookData.volumeInfo.title,
            author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(', ') : 'Unknown',
            description: bookData.volumeInfo.description,
            year: bookData.volumeInfo.publishedDate,
            publisher: bookData.volumeInfo.publisher,
            pageCount: bookData.volumeInfo.pageCount,
            imageUrl: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : null,
            infoLink: bookData.volumeInfo.infoLink
        });

        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting book: ${error.message}` });
    }
};


const updateBook = async (req, res) => {
    const { id } = req.params;
    const { googleBooksId } = req.body;

    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const url = `https://www.googleapis.com/books/v1/volumes/${googleBooksId}?key=${apiKey}`;
        const response = await axios.get(url);
        const bookData = response.data.volumeInfo;

        const updatedData = {
            title: bookData.title,
            author: bookData.authors ? bookData.authors.join(', ') : 'Unknown',
            description: bookData.description,
            year: bookData.publishedDate,
            publisher: bookData.publisher,
            pageCount: bookData.pageCount,
            imageUrl: bookData.imageLinks ? bookData.imageLinks.thumbnail : null,
            infoLink: bookData.infoLink
        };

        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllBooks = async (req, res) => {
    try {
        // Delete all documents from the Book collection
        await Book.deleteMany();

        res.status(200).json({ message: 'All books deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getBooksFromAPI,
    getAllBooks,
    deleteBook,
    deleteAllBooks,
    updateBook,
    getBookByIdFromAPI,
    addBookByIdFromAPI,
    getBookByIdFromDB 
};
