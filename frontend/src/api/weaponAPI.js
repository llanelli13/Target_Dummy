import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/weapons'; // Remplace par l'URL de ton backend

// Récupérer toutes les armes
export const getWeapons = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des armes:", error);
        throw error;
    }
};

// Récupérer une arme spécifique
export const getWeaponById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'arme:", error);
        throw error;
    }
};

// Créer une arme
export const createWeapon = async (weaponData) => {
    try {
        const response = await axios.post(BASE_URL, weaponData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de l'arme:", error);
        throw error;
    }
};
