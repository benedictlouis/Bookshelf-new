import axios from "axios";

const baseApiResponse = (data, isSuccess) => {
    return {
        success: isSuccess,
        data: data || null,
    };
};

const API_URL = "http://localhost:4000";

export const addBook = async (title, author, description, coverImage, releaseYear) => {
    try {
        const response = await axios.post(`${API_URL}/book/addBook`, { title, author, description, cover_image: coverImage, release_year: releaseYear });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Add book error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const addBookById = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/book/${id}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Add book by ID error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const getBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/book/`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Get all books error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/book/${id}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Get book by id error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const getBookByIdDB = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/book/getBookById/${id}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Get book by id error:", error);
        return baseApiResponse(error.response.data, false);
    }
};


export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/book/getAllBooks`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Get all books error:", error);
        return baseApiResponse(error.response.data, false);
    }
};


export const updateBook = async (id, title, author, description, coverImage, releaseYear) => {
    try {
        const response = await axios.put(`${API_URL}/book/${id}`, { title, author, description, cover_image: coverImage, release_year: releaseYear });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Update book error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/book/deleteBook/${id}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Delete book error:", error);
        return baseApiResponse(error.response.data, false);
    }
};
