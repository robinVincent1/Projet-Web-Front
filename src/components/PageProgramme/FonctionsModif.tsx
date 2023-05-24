import { Exercice, Programme, Seance } from "./RechercheProgrammeUser"
const apiUrl = "http://localhost:3001/api";

export const PutProgramme = async (prog: Programme, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/programmes/${prog._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(prog),
        });
    
        const data = await response.json();
    
        console.log(data._id);
        return data._id
      } catch (error) {
        console.error(error);
      }
}

export const PutSeance = async (seance: Seance, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/seances/${seance._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(seance),
        });
    
        const data = await response.json();
    
        console.log(data._id);
        return data._id
      } catch (error) {
        console.error(error);
      }
}

export const PutExercice = async (exercice: Exercice, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/exercices/${exercice._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(exercice),
        });
    
        const data = await response.json();
    
        console.log(data._id);
        return data._id
      } catch (error) {
        console.error(error);
      }
}


export const DeleteProgramme = async (_id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/programmes/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
    
        console.log(data._id);
        return data._id
      } catch (error) {
        console.error(error);
      }
}

export const DeleteSeance = async (_id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/seances/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
    
        console.log(data._id);
        return data._id
      } catch (error) {
        console.error(error);
      }
}

export const DeleteExercice = async (_id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/exercices/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
    
        console.log(data._id);
        return data._id
      } catch (error) {
        console.error(error);
      }
}


