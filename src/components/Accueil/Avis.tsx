import { useEffect, useState } from "react";


type AvisUtilisateur = {
    utilisateur: string;
    identifiant: string;
    objet: string;
    message: string;
}

export const Avis = () => {

    const getAvis = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/avis`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) {
              throw new Error(`Erreur lors de la récupération des avis: ${response.status}`);
            }
            const data = await response.json();
            return data.length > 0 ? data : [];
          } catch (error) {
            console.error(error);
            return [];
          }
    }

    const getUtilisateur = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3001/api/utilisateurs/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) {
              throw new Error(`Erreur lors de la récupération de l'utilisateur: ${response.status}`);
            }
            const data = await response.json();
            console.log(data)
            return data
          } catch (error) {
            console.error(error);
            return "";
          }
    }

    const [listeMessage, setListeMessage] = useState<AvisUtilisateur[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const avis = await getAvis();
        const listeAvis = await Promise.all(
          avis.map(async (tab: any) => {
            const identifiant = await getUtilisateur(tab.utilisateur);
            return {
              utilisateur: tab.utilisateur,
              identifiant: identifiant,
              objet: tab.objet,
              message: tab.message,
            };
          })
        );
        setListeMessage(listeAvis);
      };
  
      fetchData();
    }, []);

    return (
        <div className="grid grid-cols-4">
            {
                listeMessage.map((elem) => {
                    return (
                        <div className="border p-4 pb-32 mr-2 ml-2 text-[white] rounded-xl">
                        <h1 className="font-bold  text-xs sm:text-xs md:text-xs lg:text-md xl:text-lg">
                            {elem.identifiant}
                        </h1>
                        <h2 className="text-xs sm:text-xs md:text-xs lg:text-md xl:text-lg">
                            {elem.objet}
                        </h2>
                        <p className="italic text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm">
                            {elem.message}
                        </p>
                        </div>
                    )
                })
            }
        </div>
    )
}