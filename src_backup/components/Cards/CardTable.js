import React from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";


// TODO: Importer les hooks nécessaires pour l'intégration backend
// import { useState, useEffect } from "react";
// import axios from "axios";

export default function CardTable() {
  // TODO: Ajouter les états pour gérer les données et le chargement
  // const [audits, setAudits] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // Données d'exemple - À remplacer par l'appel API
  const audits = [
    {
      id: 1,
      name: "Audit ISO 27001",
      date: "2024-03-15",
      status: "En cours",
      auditor: "John Doe",
      ecart: null // écart est null car l'audit n'est pas terminé
    },
    {
      id: 2,
      name: "Audit Sécurité",
      date: "2024-03-10",
      status: "Terminé",
      auditor: "Jane Smith",
      ecart: 3 // nombre d'écarts constatés
    }
  ];

  // TODO: Fonction pour récupérer les données depuis l'API
  // const fetchAudits = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get('YOUR_API_URL/audits');
  //     setAudits(response.data);
  //     setError(null);
  //   } catch (err) {
  //     setError('Erreur lors de la récupération des audits');
  //     console.error('Erreur:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // TODO: Effet pour charger les données au montage du composant
  // useEffect(() => {
  //   fetchAudits();
  // }, []);

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case "Terminé":
        return "bg-emerald-200 text-emerald-700";
      case "En cours":
        return "bg-orange-200 text-orange-700";
      default:
        return "bg-red-200 text-red-700";
    }
  };

  // Fonction pour afficher l'écart
  const renderEcart = (audit) => {
    if (audit.status !== "Terminé") {
      return "-";
    }
    return `${audit.ecart} écart${audit.ecart > 1 ? 's' : ''}`;
  };

  // Gestionnaires d'événements
  const handleEdit = (audit) => {
    console.log("Modifier audit:", audit);
  };

  const handleDelete = (audit) => {
    console.log("Supprimer audit:", audit);
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      {/* En-tête */}
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-blueGray-700">
              Liste des audits
            </h3>
          </div>
          {/* TODO: Le bouton d'ajout devrait rediriger vers la page de création d'audit */}
          {/* <Link to="/create-audit"> */}
          <div className="text-right w-full px-4 max-w-full flex-grow flex-1">
            <Link
              to="/FormAddAudit"
              className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded"
            >
              Planifier un audit
            </Link>
          </div>
          {/* </Link> */}
        </div>
      </div>

      {/* Corps du tableau */}
      <div className="block w-full overflow-x-auto">
        {/* TODO: Ajouter la gestion du chargement */}
        {/* {loading ? (
          <div className="text-center py-4">Chargement...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : */}
        {audits.length === 0 ? (
          <div className="text-center py-4 text-blueGray-500">
            Aucun audit disponible
          </div>
        ) : (
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nom de l'audit
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Date
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Statut
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Auditeur
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Écarts
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {audits.map((audit) => (
                <tr key={audit.id} className="hover:bg-blueGray-50">
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {audit.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {audit.date}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span className={`px-2 py-1 rounded-full font-bold ${getStatusColor(audit.status)}`}>
                      {audit.status}
                    </span>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {audit.auditor}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {renderEcart(audit)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleEdit(audit)}
                        className="text-blueGray-500 hover:text-blueGray-700 p-2"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(audit)}
                        className="text-blueGray-500 hover:text-blueGray-700 p-2"
                      >
                        <RiDeleteBin5Fill className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 
