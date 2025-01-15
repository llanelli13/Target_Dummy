import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users"; // Remplace par l'URL de ton backend

// Inscription d'un utilisateur
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        throw error;
    }
};

// Connexion d'un utilisateur
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        console.log('response', response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

// Récupérer un utilisateur par ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        throw error;
    }
};

// Modifier un utilisateur
export const modifyUser = async (id, updates) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la modification de l'utilisateur :", error);
        throw error;
    }
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        throw error;
    }
};
