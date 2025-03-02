import axios from "axios";

const BASE_URL = "http://localhost:5000/api/shotSequenceGLOs"; // Remplace par l'URL de ton backend

// Récupérer toutes les séquences de tir
export const getShotSequencesGLO = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des séquences de tir :",
      error
    );
    throw error;
  }
};
// Récupérer toutes les séquences triées par score décroissant
export const getShotSequencesSortedByScore = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sorted`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des séquences triées par score :",
      error
    );
    throw error;
  }
};

// Récupérer une séquence de tir par ID
export const getShotSequenceByIdGLO = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la séquence de tir :",
      error
    );
    throw error;
  }
};

// Récupérer toutes les séquences de tir pour une arme spécifique
export const getShotSequencesByWeaponId = async (weaponId) => {
  try {
    const response = await axios.get(`${BASE_URL}/weapon/${weaponId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des séquences par arme :",
      error
    );
    throw error;
  }
};

// Créer une nouvelle séquence de tir
export const createShotSequenceGLO = async (shotSequenceData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, shotSequenceData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la séquence de tir :", error);
    throw error;
  }
};

// Modifier une séquence de tir par ID
export const modifyShotSequenceGLO = async (id, updates) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la modification de la séquence de tir :",
      error
    );
    throw error;
  }
};

// Supprimer une séquence de tir par ID
export const deleteShotSequenceGLO = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la séquence de tir :",
      error
    );
    throw error;
  }
};
