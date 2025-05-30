import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


import { FaEdit, FaSearch, FaInfoCircle, FaTimes } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../../styles/modal.css";
import { fetchAudits, createAudit, updateAudit, deleteAudit } from '../../api/api';


// import axios from "axios"; // CommentÃ© pour le moment

// URL de base de l'API
// const API_BASE_URL = "http://votre-api.com/api"; // CommentÃ© pour le moment

// TODO: Importer les hooks nÃ©cessaires pour l'intÃ©gration backend
// import { useEffect } from "react";
// import axios from "axios";

export default function TableAudit() {
  const [audits, setAudits] = useState([]); // âœ… DÃ©claration unique ici

  // Ã‰tats pour la gestion des donnÃ©es et de l'UI
  const auditTypes = [
    { id: "type1", label: "Audit Type 1" },
    { id: "type2", label: "Audit Type 2" },
    { id: "type3", label: "Audit Type 3" },
  ];
  const [selectedAuditType, setSelectedAuditType] = useState(auditTypes[0].id);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const initialFormState = {
  name: "",       // â¬…ï¸ remplace "title"
  type: "",
  startDate: "",
  endDate: "",
  auditor: "",
  department: "",
  priority: "",
  scope: "",
  description: "",
  status: "",
};

  const [selectedAudit, setSelectedAudit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    department: "",
    auditor: "",
    startDate: "",
    endDate: "",
    methodology: "",
    participants: [],
    scope: "",
    objectives: [],
    status: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
const [formData, setFormData] = useState(initialFormState);

  

  // ðŸ‘‡ Charger les audits Ã  l'ouverture
  useEffect(() => {
  fetchAudits()
    .then((res) => {
      console.log("âœ… Audits rÃ©cupÃ©rÃ©s :", res.data);
      setAudits(res.data);
    })
    .catch((err) => console.error("Erreur chargement audits :", err));
}, []);

const location = useLocation();

useEffect(() => {
  const shouldRefresh = new URLSearchParams(location.search).get("refresh");
  if (shouldRefresh) {
    fetchAudits()
      .then((res) => setAudits(res.data))
      .catch((err) => console.error("Erreur chargement audits :", err));
  }
}, [location]);

// âœ… Ajout pour actualisation via localStorage
useEffect(() => {
  const shouldRefresh = localStorage.getItem("shouldRefreshAuditTable");
  if (shouldRefresh === "true") {
    fetchAudits()
      .then((res) => {
        setAudits(res.data);
        localStorage.removeItem("shouldRefreshAuditTable"); // nettoyage
      })
      .catch((err) => console.error("Erreur rechargement localStorage :", err));
  }
}, []);



  // const [loading, setLoading] = useState(false); // CommentÃ© pour le moment
  // const [error, setError] = useState(null); // CommentÃ© pour le moment

  // TODO: Ã‰tats pour l'intÃ©gration backend
  // const [audits, setAudits] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // TODO: Cette fonction sera importÃ©e du backend
  // const calculateEcartPercentage = (auditResults) => {
  //   // Cette fonction sera fournie par le backend
  //   // Elle prendra en compte :
  //   // - Le nombre total de critÃ¨res Ã©valuÃ©s
  //   // - Le nombre de critÃ¨res non conformes
  //   // - La pondÃ©ration de chaque critÃ¨re
  //   // return (nombreCriteresNonConformes / nombreTotalCriteres) * 100;
  // };

  // TODO: Fonction pour rÃ©cupÃ©rer les audits depuis l'API
  // const fetchAudits = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`${API_BASE_URL}/audits`);
  //     setAudits(response.data);
  //   } catch (error) {
  //     setError("Erreur lors de la rÃ©cupÃ©ration des audits");
  //     console.error("Erreur API:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  
 
const filteredAudits = audits.filter(
  (audit) =>
    audit.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    audit.type === selectedAuditType // ðŸŸ¢ PAS `audit.auditType`
);


const handleAuditTypeChange = (e) => {
  setSelectedAuditType(e.target.value);
};



  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case "TerminÃ©":
        return "bg-emerald-200 text-emerald-700";
      case "En cours":
        return "bg-orange-200 text-orange-700";
      default:
        return "bg-red-200 text-red-700";
    }
  };

  // Fonction pour obtenir la couleur de l'Ã©cart
  const getEcartColor = (percentage) => {
    if (percentage === null) return "text-gray-500";
    if (percentage <= 5) return "text-emerald-500";
    if (percentage <= 15) return "text-orange-500";
    return "text-red-500";
  };

  // Fonction pour afficher l'Ã©cart
  const renderEcart = (audit) => {
    if (audit.status !== "TerminÃ©") {
      return "-";
    }
    return (
      <span className={getEcartColor(audit.ecartPercentage)}>
        {audit.ecartPercentage}%
      </span>
    );
  };

  // Gestionnaire pour l'Ã©dition
  const handleEdit = (audit) => {
    setEditFormData({
      name: audit.name,
      description: audit.description,
      department: audit.department,
      auditor: audit.auditor,
      startDate: audit.startDate,
      endDate: audit.endDate,
      methodology: audit.methodology,
      participants: audit.participants,
      scope: audit.scope,
      objectives: audit.objectives,
      status: audit.status,
    });
    setSelectedAudit(audit);
    setShowEditModal(true);
  };

  // Gestionnaire pour la mise Ã  jour du formulaire
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestionnaire pour la soumission du formulaire
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: IntÃ©gration API
      // await axios.put(`${API_BASE_URL}/audits/${selectedAudit.id}`, editFormData);
      console.log("Mise Ã  jour de l'audit:", editFormData);
      setShowEditModal(false);
    } catch (error) {
      console.error("Erreur lors de la mise Ã  jour:", error);
    }
  };

  // TODO: IntÃ©gration backend - Gestionnaire de suppression
  const handleDelete = (audit) => {
    // Exemple d'appel API pour la suppression
    // if (window.confirm("Voulez-vous vraiment supprimer cet audit ?")) {
    //   try {
    //     await axios.delete(`${API_BASE_URL}/audits/${audit.id}`);
    //     fetchAudits(); // Recharger la liste
    //   } catch (error) {
    //     console.error("Erreur lors de la suppression:", error);
    //   }
    // }
    console.log("Supprimer audit:", audit);
  };

  // Gestionnaire pour afficher les dÃ©tails
  const handleDetails = (audit) => {
    // fetchAuditDetails(audit.id); // CommentÃ© pour le moment
    setSelectedAudit(audit);
    setShowModal(true);
  };

  // Fonction pour exporter les donnÃ©es d'audit
  const handleExport = async () => {
    try {
      // ====== INTÃ‰GRATION BACKEND ======
      // 1. CrÃ©er une route dans votre API backend : GET /api/audits/:id/export
      // 2. Le backend devrait :
      //    - RÃ©cupÃ©rer l'audit avec l'ID spÃ©cifiÃ©
      //    - Formater les donnÃ©es selon vos besoins
      //    - Renvoyer un fichier JSON ou CSV
      // 3. Exemple d'appel API :
      // const response = await axios.get(`${API_BASE_URL}/audits/${selectedAudit.id}/export`);
      //
      // 4. Traitement de la rÃ©ponse :
      // const blob = new Blob([response.data], { type: 'application/json' });
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `audit_${selectedAudit.id}.json`);
      // document.body.appendChild(link);
      // link.click();
      // link.remove();

      console.log("Export des donnÃ©es d'audit:", selectedAudit.id);
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    }
  };

  // Fonction pour importer les donnÃ©es d'audit
  const handleImport = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      // TODO: ImplÃ©menter l'appel API pour l'import
      // const formData = new FormData();
      // formData.append('file', file);
      // await axios.post(`${API_BASE_URL}/audits/import`, formData);
      console.log("Import du fichier:", file.name);
    } catch (error) {
      console.error("Erreur lors de l'import:", error);
    }
  };
  const modalOverlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-in-out",
  };

  const modalContentStyle = {
    backgroundColor: "#f9fafb",
    borderRadius: "1rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    maxWidth: "32rem",
    width: "100%",
    padding: "2rem",
    overflow: "hidden",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  // Modal d'Ã©dition
  const EditModal = () => {
    if (!showEditModal) return null;

    return (
      <div style={modalOverlayStyle}>
        <div style={modalContentStyle}>
          <div className="modal-overlay">
            <div className="modal-content modal-container max-w-2xl">
              <div className="modal-header bg-gray-50 px-6 py-3 flex justify-between items-center border-b border-gray-200 flex justify-between items-center border-b border-gray-300 pb-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Modifier l'audit
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaTimes className="h-7 w-7" />
                </button>
              </div>

              <form
                onSubmit={handleEditSubmit}
                className=" space-y-6 overflow-y-auto max-h-[75vh] px-4"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom de l'audit
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    />
                  </div>

                  <div className="col-span-2 mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditFormChange}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ">
                      DÃ©partement
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={editFormData.department}
                      onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Auditeur
                    </label>
                    <input
                      type="text"
                      name="auditor"
                      value={editFormData.auditor}
                      onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date de dÃ©but
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={editFormData.startDate}
                      onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={editFormData.endDate}
                      onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      MÃ©thodologie
                    </label>
                    <input
                      type="text"
                      name="methodology"
                      value={editFormData.methodology}
                      onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    >
                      <option value="En cours">En cours</option>
                      <option value="TerminÃ©">TerminÃ©</option>
                      <option value="En attente">En attente</option>
                    </select>
                  </div>

                  <div className="col-span-2 mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      PÃ©rimÃ¨tre
                    </label>
                    <input
                      type="text"
                      name="scope"
                      value={editFormData.scope}
                      onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3 text-center mt-6">
                  {/* <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Annuler
                  </button> */}
                  <button
                    type="submit"
                    className="bg-emerald-500 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-emerald-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Mettre Ã  jour
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal de dÃ©tails
  const DetailsModal = () => {
    if (!showModal || !selectedAudit) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content modal-container">
          {/* En-tÃªte du modal */}
          <div className="modal-header">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                DÃ©tails de l'audit
              </h3>
            </div>
          </div>

          {/* Corps du modal */}
          <div className="modal-body">
            <div className="grid grid-cols-2 gap-6">
              {/* Informations gÃ©nÃ©rales */}
              <div>
                <h3 className="font-semibold mb-4 text-lg">
                  Informations gÃ©nÃ©rales
                </h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium">Nom:</span>{" "}
                    {selectedAudit.name}
                  </p>
                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {selectedAudit.description}
                  </p>
                  <p>
                    <span className="font-medium">Statut:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
                        selectedAudit.status
                      )}`}
                    >
                      {selectedAudit.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">DÃ©partement:</span>{" "}
                    {selectedAudit.department}
                  </p>
                  <p>
                    <span className="font-medium">Auditeur:</span>{" "}
                    {selectedAudit.auditor}
                  </p>
                </div>
              </div>

              {/* Dates et participants */}
              <div>
                <h3 className="font-semibold mb-4 text-lg">Planification</h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium">Date de dÃ©but:</span>{" "}
                    {selectedAudit.startDate}
                  </p>
                  <p>
                    <span className="font-medium">Date de fin:</span>{" "}
                    {selectedAudit.endDate}
                  </p>
                  <p>
                    <span className="font-medium">MÃ©thodologie:</span>{" "}
                    {selectedAudit.methodology}
                  </p>
                  <p>
                    <span className="font-medium">Participants:</span>
                  </p>
                  <ul className="list-disc ml-5">
                    {selectedAudit.participants?.map((participant, index) => (
                      <li key={index}>{participant}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Objectifs et pÃ©rimÃ¨tre */}
              <div>
                <h3 className="font-semibold mb-4 text-lg">
                  Objectifs et pÃ©rimÃ¨tre
                </h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium">PÃ©rimÃ¨tre:</span>{" "}
                    {selectedAudit.scope}
                  </p>
                  <p>
                    <span className="font-medium">Objectifs:</span>
                  </p>
                  <ul className="list-disc ml-5">
                    {selectedAudit.objectives?.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RÃ©sultats */}
              <div>
                <h3 className="font-semibold mb-4 text-lg">RÃ©sultats</h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium">Ã‰cart:</span>
                    <span
                      className={`ml-2 ${getEcartColor(
                        selectedAudit.ecartPercentage
                      )}`}
                    >
                      {selectedAudit.ecartPercentage
                        ? `${selectedAudit.ecartPercentage}%`
                        : "-"}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Constatations:</span>
                  </p>
                  {selectedAudit.findings?.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {selectedAudit.findings.map((finding, index) => (
                        <li key={index}>{finding}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 ml-5">Aucune constatation</p>
                  )}
                  <p>
                    <span className="font-medium">Recommandations:</span>
                  </p>
                  {selectedAudit.recommendations?.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {selectedAudit.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 ml-5">Aucune recommandation</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pied du modal */}
          <div className="modal-footer bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExport}
                className="bg-emerald-500 text-white active:bg-emerald-600 
                text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-50outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Exporter
              </button>
              <label className="bg-emerald-500 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-emerald-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Importer
                <input
                  type="file"
                  className="hidden"
                  accept=".json"
                  onChange={handleImport}
                />
              </label>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedAudit(null);
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  };
   const handleAddSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await createAudit(formData); // CrÃ©e dans MongoDB
    const nouveauAudit = res.data;

    // Ajoute le nouvel audit Ã  la liste actuelle sans refetch
    setAudits((prev) => [...prev, nouveauAudit]);

    setShowAddModal(false);
    setFormData(initialFormState); // Reset form
  } catch (err) {
    console.error("Erreur ajout audit :", err);
    alert("Erreur lors de l'ajout.");
  }
};


  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      {/* En-tÃªte */}
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center justify-between">
          <div className="relative flex items-center">
            <h3 className="font-semibold text-lg text-blueGray-700 mr-4">
              Liste des audits
            </h3>
            <div className="relative flex w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-blueGray-300" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un audit..."
                className="border border-blueGray-300 pl-10 pr-4 py-2 rounded-lg text-sm w-full focus:outline-none focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
  
          <select
            id="auditType"
            value={selectedAuditType}
            onChange={handleAuditTypeChange}
            className="border border-blueGray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
          >
            {auditTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
</div>

          <div>
            <Link
              to="/FormAddAudit"
              className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded"
            >
              Planifier un audit
            </Link>
          </div>
        </div>
      </div>

      {/* Corps du tableau */}
      <div className="block w-full overflow-x-auto">
        {filteredAudits.length === 0 ? (
          <div className="text-center py-4 text-blueGray-500">
            {searchTerm ? "Aucun audit trouvÃ©" : "Aucun audit disponible"}
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
                  % Ã‰cart
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAudits.map((audit) => (
                <tr key={audit.id} className="hover:bg-blueGray-50">
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {audit.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {audit.startDate?.substring(0, 10)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span
                      className={`px-2 py-1 rounded-full font-bold ${getStatusColor(
                        audit.status
                      )}`}
                    >
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
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDetails(audit)}
                        className="p-2"
                        title="Voir les dÃ©tails"
                      >
                        <FaInfoCircle className="text-lg text-blue-500 hover:text-blue-700" />
                      </button>
                      <button
                        onClick={() => handleEdit(audit)}
                        className="p-2"
                        title="Modifier"
                      >
                        <FaEdit className="text-lg text-emerald-500 hover:text-emerald-700" />
                      </button>
                      <button
                        onClick={() => handleDelete(audit)}
                        className="p-2"
                        title="Supprimer"
                      >
                        <RiDeleteBin5Fill className="text-lg text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Ajout du modal d'Ã©dition */}
      <EditModal />

      {/* Modal de dÃ©tails existant */}
      <DetailsModal />
    </div>
  );
  

}
