import { ExerciceStockage, ProgStockage, SeanceStockage } from "./CreerProg";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken"

const apiUrl = "https://projet-web-api.onrender.com/api";

export const addSeance = async (seance: SeanceStockage, token: String) => {
  try {
    const response = await fetch(`${apiUrl}/seances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(seance),
    });

    const data = await response.json();

    console.log(data);
    return data._id;
  } catch (err) {
    console.error(err);
    return "";
  }
};

export const createExercice = async (exercice: ExerciceStockage, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/exercices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(exercice),
    });
    const data = await response.json();
    return data._id;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const addExercices = async (exercices: ExerciceStockage[], token: string) => {
  let ids: string[] = [];
  for (const exercice of exercices) {
    const id: string = await createExercice(exercice, token);
    if (id !== "") {
      ids.push(id);
    } else {
      console.error("Failed to create exercice:", exercice);
    }
  }
  console.log(ids);
  return ids;
};




export const AddProgramme = async (programme: ProgStockage, token: String) => {
  console.log(programme)
  try {
    const response = await fetch(`${apiUrl}/programmes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(programme),
    });

    const data = await response.json();

    console.log(data._id);
    return data._id
  } catch (error) {
    console.error(error);
  }
};

export const getProgrammes = async (userId: String, token: String) => {
  try {
    const response = await fetch(`${apiUrl}/programmes/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des programmes: ${response.status}`);
    }
    const data = await response.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProgrammesAdmin = async (token: String) => {
  try {
    const response = await fetch(`${apiUrl}/programmes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des programmes: ${response.status}`);
    }
    const data = await response.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getExercice = async (idSeance: String, token: String) => {
  try {
    const response = await fetch(`${apiUrl}/exercices/${idSeance}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des exercices: ${response.status}`);
    }
    const data = await response.json();
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSeance = async (idProgramme: String, token: String) => {
  try {
    const response = await fetch(`${apiUrl}/seances/${idProgramme}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des seances: ${response.status}`);
    }
    const data = await response.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
