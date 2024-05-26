import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Navbar from './components/ui/navbar';
import Login from "./pages/Login";
import Register from './pages/Register';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import EditBook from './pages/EditBook';
import Profile from './pages/Profile';
import BookCollection from './pages/BookCollection';
import BookCollectionDetails from './pages/BookCollectionDetails';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  return (
    <Router>
      <Navbar onSearch={handleSearch} />

      <div className='grid grid-cols-1 justify-content-center'>
        <div className='flex items-center justify-center'>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add_book" element={<AddBook />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/edit_book/:id" element={<EditBook />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/book_collection" element={<BookCollection />} />
            <Route path="/book_collection/:id" element={<BookCollectionDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
