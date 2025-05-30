import React, { useState } from "react";

export default function NonConformities() {
  // Données d'exemple avec auditType ajouté
  const [nonConformities, setNonConformities] = useState([
    {
      id: "nc-1681234567890",
      auditType: "Audit Type 1",
      title: "Politique non documentée",
      description: "La politique de sécurité n'est pas formalisée et approuvée",
      control: "A.5.1",
      severity: "major",
      status: "open",
      discoveredDate: "2023-05-15",
      dueDate: "2023-06-15",
      responsible: "Jean Dupont",
      correctiveAction: "Rédiger la politique et la faire approuver",
      verificationMethod: "Revue documentaire",
      verificationDate: "",
      notes: "Priorité haute - à traiter avant l'audit de certification"
    },
    {
      id: "nc-1681234567891",
      auditType: "Audit Type 2",
      title: "Contrôles d'accès manquants",
      description: "Absence de système d'authentification forte pour les accès admin",
      control: "A.9.2",
      severity: "minor",
      status: "in-progress",
      discoveredDate: "2023-05-10",
      dueDate: "2023-05-30",
      responsible: "Marie Martin",
      correctiveAction: "Mettre en place une authentification à 2 facteurs",
      verificationMethod: "Test technique",
      verificationDate: "",
      notes: "En attente de la livraison par l'équipe IT"
    }
  ]);

  const auditTypes = [
    "Audit Type 1",
    "Audit Type 2",
    "Audit Type 3"
  ];

  const [selectedAuditType, setSelectedAuditType] = useState(auditTypes[0]);
  const [editingNonConformity, setEditingNonConformity] = useState(null);
  const [originalNonConformity, setOriginalNonConformity] = useState(null);

  const isoControls = [
    { id: "A.5.1", name: "Politiques de sécurité de l'information" },
    { id: "A.5.2", name: "Rôles et responsabilités" },
    { id: "A.9.2", name: "Contrôles d'accès aux systèmes" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingNonConformity({
      ...editingNonConformity,
      [name]: value
    });
  };

  const handleSave = () => {
    setNonConformities(nonConformities.map(item => 
      item.id === editingNonConformity.id ? editingNonConformity : item
    ));
    setEditingNonConformity(null);
    setOriginalNonConformity(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setNonConformities(
      nonConformities.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleDelete = (id) => {
    setNonConformities(nonConformities.filter(item => item.id !== id));
  };

  const filteredNonConformities = nonConformities.filter(nc => nc.auditType === selectedAuditType);

  return (
    <section className="relative block py-24 lg:pt-0 bg-blueGray-800 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center mt-10">
          <div className="w-full lg:w-10/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 mt-50">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold text-blueGray-800 mb-6">
                  Gestion des non-conformités
                </h4>

                {/* Dropdown for audit types */}
                <div className="mb-6">
                  <label htmlFor="auditType" className="block mb-2 text-blueGray-600 font-medium">
                    Sélectionnez le type d'audit
                  </label>
                  <select
                    id="auditType"
                    value={selectedAuditType}
                    onChange={(e) => setSelectedAuditType(e.target.value)}
                    className="border border-blueGray-400 rounded-lg p-2 w-full max-w-xs"
                  >
                    {auditTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white rounded shadow-md p-4">
                  <h5 className="text-lg font-semibold text-blueGray-700 mb-4">
                    Liste des non-conformités
                  </h5>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                            Titre
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                            Contrôle
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                            Sévérité
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                            Date limite
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredNonConformities.map((item) => (
                          <React.Fragment key={item.id}>
                            <tr className="border-t border-blueGray-200">
                              <td className="py-3 px-4 text-sm text-blueGray-700">
                                {item.title}
                              </td>
                              <td className="py-3 px-4 text-sm text-blueGray-700">
                                {isoControls.find(c => c.id === item.control)?.name || item.control}
                              </td>
                              <td className="py-3 px-4 text-sm">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  item.severity === 'major' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {item.severity === 'major' ? 'Majeure' : 'Mineure'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm">
                                <select
                                  className="border-0 px-2 py-1 text-sm rounded focus:outline-none focus:ring"
                                  value={item.status}
                                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                >
                                  <option value="open">Ouverte</option>
                                  <option value="in-progress">En cours</option>
                                  <option value="closed">Fermée</option>
                                  <option value="verified">Vérifiée</option>
                                </select>
                              </td>
                              <td className="py-3 px-4 text-sm text-blueGray-700">
                                {item.dueDate}
                              </td>
                              <td className="py-3 px-4 text-sm">
                                <button
                                  className="text-blue-500 hover:text-blue-700 mr-2"
                                  onClick={() => {
                                    setOriginalNonConformity(item);
                                    setEditingNonConformity(item);
                                  }}
                                >
                                  Compléter
                                </button>
                                <button
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Supprimer
                                </button>
                              </td>
                            </tr>
                            
                            {editingNonConformity?.id === item.id && (
                              <tr className="bg-blueGray-100">
                                <td colSpan="6" className="py-4 px-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="relative w-full">
                                      <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="description"
                                      >
                                        Description détaillée
                                      </label>
                                      <textarea
                                        id="description"
                                        name="description"
                                        value={editingNonConformity.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                      />
                                    </div>
                                    
                                    <div className="relative w-full">
                                      <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="correctiveAction"
                                      >
                                        Action corrective
                                      </label>
                                      <textarea
                                        id="correctiveAction"
                                        name="correctiveAction"
                                        value={editingNonConformity.correctiveAction}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                      />
                                    </div>
                                    
                                    <div className="relative w-full">
                                      <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="responsible"
                                      >
                                        Responsable
                                      </label>
                                      <input
                                        type="text"
                                        id="responsible"
                                        name="responsible"
                                        value={editingNonConformity.responsible}
                                        onChange={handleInputChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                      />
                                    </div>
                                    
                                    <div className="relative w-full">
                                      <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="dueDate"
                                      >
                                        Date limite de correction
                                      </label>
                                      <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={editingNonConformity.dueDate}
                                        onChange={handleInputChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                      />
                                    </div>
                                    
                                    <div className="relative w-full">
                                      <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="severity"
                                      >
                                        Sévérité
                                      </label>
                                      <select
                                        id="severity"
                                        name="severity"
                                        value={editingNonConformity.severity}
                                        onChange={handleInputChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                      >
                                        <option value="major">Majeure</option>
                                        <option value="minor">Mineure</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <button
                                      className="bg-gray-400 text-white active:bg-gray-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                      onClick={() => {
                                        setEditingNonConformity(originalNonConformity);
                                        setOriginalNonConformity(null);
                                      }}
                                    >
                                      Annuler
                                    </button>
                                    <button
                                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                      onClick={handleSave}
                                    >
                                      Enregistrer
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
  );
}





