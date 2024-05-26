const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    year: { type: String },
    publisher: { type: String },
    pageCount: { type: Number },
    imageUrl: { type: String },
    infoLink: { type: String }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
