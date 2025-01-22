import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/shotSequences'; // Remplace par l'URL de ton backend

// Récupérer toutes les séquences de tir
export const getShotSequences = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des séquences de tir :", error);
        throw error;
    }
};

// Récupérer une séquence de tir par ID
export const getShotSequenceById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la séquence de tir :", error);
        throw error;
    }
};

// Créer une nouvelle séquence de tir
export const createShotSequence = async (shotSequenceData) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, shotSequenceData);	
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de la séquence de tir :", error);
        throw error;
    }
};

// Récupérer l'historique des séquences pour un utilisateur donné
export const getUserHistory = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'historique de l'utilisateur :", error);
        throw error;
    }
};

// Modifier une séquence de tir par ID
export const modifyShotSequence = async (id, updates) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la modification de la séquence de tir :", error);
        throw error;
    }
};

// Supprimer une séquence de tir par ID
export const deleteShotSequence = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la séquence de tir :", error);
        throw error;
    }
};
