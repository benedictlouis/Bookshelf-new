import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, addBookById } from "../actions/book.action"; 
import Navbar from "../components/ui/navbar";
import { Button } from "@/components/ui/button";

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            console.log("Fetching book with ID:", id); 
            try {
                const response = await getBookById(id);
                if (response.success) {
                    setBook(response.data);
                } else {
                    setError("Failed to fetch book details.");
                }
            } catch (error) {
                setError("Error fetching book details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleAddToCollection = async () => {
        try {
            const response = await addBookById(id);
            if (response.success) {
                navigate("/book_collection");
                alert("Book added to collection successfully!"); 
            } else {
                setError("Failed to add book to collection.");
            }
        } catch (error) {
            setError("Error adding book to collection.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                {book && (
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-4">
                            <img src={book.imageUrl} alt={book.title} className="w-full h-96 object-contain rounded mt-8" />
                        </div>
                        <h1 className="text-3xl font-bold mb-10">{book.title}</h1>
                        <div className="text-left"> 
                            <p className="text-lg mb-4"><strong>Author:</strong> {book.author}</p>
                            <p className="text-lg mb-4"><strong>Release Year:</strong> {book.year}</p>
                            <p className="text-lg mb-4"><strong>Publisher:</strong> {book.publisher}</p>
                            <p className="text-lg mb-4"><strong>Page Count:</strong> {book.pageCount}</p>
                            <p className="text-lg mb-4"><strong>Info Link:</strong> <a href={book.infoLink} target="_blank" rel="noopener noreferrer">{book.infoLink}</a></p>
                            <p className="text-lg mb-4"><strong>Description:</strong></p>
                            <p className="text-base text-justify mb-4">{book.description}</p>
                        </div>
                        <div className="flex justify-center space-x-4 mt-10">
                            <Button 
                                onClick={handleAddToCollection} 
                                size="default"
                            >
                                Add to Collection
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetails;
