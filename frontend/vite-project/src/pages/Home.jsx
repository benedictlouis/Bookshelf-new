import React, { useState, useEffect } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "../components/ui/card";
import Navbar from "../components/ui/navbar";
import { getBooks } from "../actions/book.action";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const resultsPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
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
        navigate(`/book/${id}`);
    };

    const handleSearch = async (event, page = 1) => {
        event.preventDefault();
        if (searchQuery.trim() === '') return;

        const startIndex = (page - 1) * resultsPerPage;
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${resultsPerPage}`);
            const data = await response.json();
            setSearchResults(data.items || []);
            setTotalResults(data.totalItems);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleNextPage = (event) => {
        event.preventDefault();
        if (currentPage * resultsPerPage < totalResults) {
            handleSearch(event, currentPage + 1);
        }
    };

    const handlePreviousPage = (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            handleSearch(event, currentPage - 1);
        }
    };

    const displayBooks = searchResults.length > 0 ? searchResults : books;

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <form onSubmit={handleSearch} className="flex items-center justify-center mb-3 mt-10">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for books"
                        className="p-2 rounded-md text-black w-1/2 border-2 border-black focus:outline-none focus:border-blue-700"
                    />
                    <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">Search</button>
                </form>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {displayBooks.map((book) => (
                        <Card
                            key={book.id}
                            className="flex flex-col justify-between cursor-pointer mt-5 bg-gray-700 text-gray-100 hover:bg-gray-600 transition duration-300"
                            onClick={() => handleCardClick(book.id)}
                        >
                            <CardContent className="p-4">
                                <div className="mb-4">
                                    <img
                                        src={book.volumeInfo?.imageLinks?.thumbnail || book.imageUrl}
                                        alt={book.volumeInfo?.title || book.title}
                                        className="w-full h-48 object-contain rounded"
                                    />
                                </div>
                                <CardTitle className="text-lg font-semibold mb-3">{book.volumeInfo?.title || book.title}</CardTitle>
                                <CardDescription className="text-sm text-gray-400 text-justify">
                                    {truncateDescription(book.volumeInfo?.description || book.description, 20)}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {searchResults.length > 0 && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handlePreviousPage}
                            className={`mr-2 p-2 bg-blue-500 text-white rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            className={`p-2 bg-blue-500 text-white rounded-md ${currentPage * resultsPerPage >= totalResults ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage * resultsPerPage >= totalResults}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
