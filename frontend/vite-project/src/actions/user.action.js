import axios from "axios";

const API_URL = "http://localhost:4000"; // Sesuaikan dengan URL server Anda

const baseApiResponse = (data, isSuccess) => {
    return {
        success: isSuccess,
        data: data || null,
    };
};

export const signup = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, { username, email, password });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Signup error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, { username, password });
        localStorage.setItem("token", response.data.token);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Login error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Get all users error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/user/${id}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Get user by id error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const updateUser = async (user_id, username, email, password) => {
    try {
        const response = await axios.put(`${API_URL}/user/${user_id}`, { username, email, password });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Update user error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const deleteUser = async (user_id) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${user_id}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Delete user error:", error);
        return baseApiResponse(error.response.data, false);
    }
};
