import React, { useState, useEffect } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "../components/ui/card";
import Navbar from "../components/ui/navbar";
import { getAllBooks } from '../actions/book.action';
import { useNavigate } from 'react-router-dom';

const BookCollection = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getAllBooks();
                if (response.success) {
                    setBooks(response.data);
                } else {
                    console.error("Failed to fetch books:", response.data);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    const truncateDescription = (description, numWords) => {
        if (description) {
            return description.split(" ").slice(0, numWords).join(" ") + (description.split(" ").length > numWords ? "..." : "");
        } else {
            return "";
        }
    };

    const handleCardClick = (id) => {
        navigate(`/book_collection/${id}`);
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {books.map((book) => (
                        <Card
                            key={book._id}
                            className="flex flex-col justify-between cursor-pointer mt-5 bg-gray-700 text-gray-100 hover:bg-gray-600 transition duration-300"
                            onClick={() => handleCardClick(book._id)}
                        >
                            <CardContent className="p-4">
                                <div className="mb-4">
                                    <img
                                        src={book.imageUrl}
                                        alt={book.title}
                                        className="w-full h-48 object-contain rounded"
                                    />
                                </div>
                                <CardTitle className="text-lg font-semibold mb-3">{book.title}</CardTitle>
                                <CardDescription className="text-sm text-gray-400 text-justify">
                                    {truncateDescription(book.description, 20)}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookCollection;
