import React, { useState } from "react";

export default function NonConformities() {
  const [nonConformities, setNonConformities] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNonConformity, setNewNonConformity] = useState({
    id: "",
    title: "",
    description: "",
    control: "",
    severity: "minor", // minor, major
    status: "open", // open, in-progress, closed, verified
    discoveredDate: "",
    dueDate: "",
    responsible: "",
    correctiveAction: "",
    verificationMethod: "",
    verificationDate: "",
    notes: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNonConformity({
      ...newNonConformity,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique ID (in a real app, this would come from the backend)
    const nonConformityWithId = {
      ...newNonConformity,
      id: Date.now().toString()
    };
    
    setNonConformities([...nonConformities, nonConformityWithId]);
    setShowAddForm(false);
    setNewNonConformity({
      id: "",
      title: "",
      description: "",
      control: "",
      severity: "minor",
      status: "open",
      discoveredDate: "",
      dueDate: "",
      responsible: "",
      correctiveAction: "",
      verificationMethod: "",
      verificationDate: "",
      notes: ""
    });
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

  // ISO 27001:2013 Annex A controls (same as in AuditChecklist.js)
  const isoControls = [
    { id: "A.5.1", name: "Politiques de sécurité de l'information" },
    { id: "A.5.2", name: "Rôles et responsabilités" },
    { id: "A.6.1", name: "Organisation interne" },
    { id: "A.6.2", name: "Télébureau et télétravail" },
    { id: "A.7.1", name: "Sélection" },
    { id: "A.7.2", name: "Formation et sensibilisation" },
    { id: "A.7.3", name: "Processus disciplinaire" },
    { id: "A.8.1", name: "Responsabilité des actifs" },
    { id: "A.8.2", name: "Classification de l'information" },
    { id: "A.8.3", name: "Médias sur support amovible" },
    { id: "A.9.1", name: "Contrôles d'accès aux locaux" },
    { id: "A.9.2", name: "Contrôles d'accès aux systèmes" },
    { id: "A.9.3", name: "Gestion des droits d'accès" },
    { id: "A.9.4", name: "Gestion des secrets d'authentification" },
    { id: "A.10.1", name: "Contrôles contre les codes malveillants" },
    { id: "A.10.2", name: "Sauvegarde" },
    { id: "A.11.1", name: "Contrôles physiques" },
    { id: "A.11.2", name: "Contrôles techniques" },
    { id: "A.12.1", name: "Contrôles opérationnels" },
    { id: "A.12.2", name: "Protection contre les logiciels malveillants" },
    { id: "A.12.3", name: "Sauvegarde" },
    { id: "A.12.4", name: "Journalisation et surveillance" },
    { id: "A.12.5", name: "Contrôle des logiciels d'exploitation" },
    { id: "A.12.6", name: "Gestion de la vulnérabilité technique" },
    { id: "A.12.7", name: "Considérations relatives à la sécurité des systèmes d'information" },
    { id: "A.13.1", name: "Contrôles de sécurité réseau" },
    { id: "A.13.2", name: "Sécurité des services réseau" },
    { id: "A.14.1", name: "Sécurité des systèmes d'information" },
    { id: "A.14.2", name: "Sécurité dans les cycles de développement" },
    { id: "A.15.1", name: "Politique de sécurité de l'information dans les relations avec les fournisseurs" },
    { id: "A.15.2", name: "Gestion de la fourniture de services" },
    { id: "A.16.1", name: "Gestion des événements de sécurité de l'information" },
    { id: "A.16.2", name: "Gestion des failles de sécurité de l'information" },
    { id: "A.17.1", name: "Continuité de l'activité" },
    { id: "A.17.2", name: "Redondance" },
    { id: "A.18.1", name: "Conformité avec les exigences légales et contractuelles" },
    { id: "A.18.2", name: "Revue des politiques de sécurité de l'information et de la conformité technique" },
  ];

  return (
    <section className="relative block py-24 lg:pt-0 bg-blueGray-800 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
          <div className="w-full lg:w-10/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 mt-50">
              <div className="flex-auto p-5 lg:p-10">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-2xl font-semibold text-blueGray-800">
                    Gestion des non-conformités
                  </h4>
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    onClick={() => setShowAddForm(!showAddForm)}
                  >
                    {showAddForm ? "Annuler" : "Ajouter une non-conformité"}
                  </button>
                </div>

                {showAddForm && (
                  <div className="bg-white rounded shadow-md p-6 mb-6">
                    <h5 className="text-lg font-semibold text-blueGray-700 mb-4">
                      Nouvelle non-conformité
                    </h5>
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="relative w-full">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="title"
                          >
                            Titre
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={newNonConformity.title}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>

                        <div className="relative w-full">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="control"
                          >
                            Contrôle ISO 27001
                          </label>
                          <select
                            id="control"
                            name="control"
                            value={newNonConformity.control}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          >
                            <option value="">Sélectionnez un contrôle</option>
                            {isoControls.map((control) => (
                              <option key={control.id} value={control.id}>
                                {control.id} - {control.name}
                              </option>
                            ))}
                          </select>
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
                            value={newNonConformity.severity}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          >
                            <option value="minor">Mineure</option>
                            <option value="major">Majeure</option>
                          </select>
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
                            value={newNonConformity.responsible}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>

                        <div className="relative w-full">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="discoveredDate"
                          >
                            Date de découverte
                          </label>
                          <input
                            type="date"
                            id="discoveredDate"
                            name="discoveredDate"
                            value={newNonConformity.discoveredDate}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
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
                            value={newNonConformity.dueDate}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative w-full mb-4">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="description"
                        >
                          Description détaillée
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={newNonConformity.description}
                          onChange={handleInputChange}
                          rows="3"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          required
                        />
                      </div>

                      <div className="relative w-full mb-4">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="correctiveAction"
                        >
                          Action corrective
                        </label>
                        <textarea
                          id="correctiveAction"
                          name="correctiveAction"
                          value={newNonConformity.correctiveAction}
                          onChange={handleInputChange}
                          rows="3"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="relative w-full">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="verificationMethod"
                          >
                            Méthode de vérification
                          </label>
                          <input
                            type="text"
                            id="verificationMethod"
                            name="verificationMethod"
                            value={newNonConformity.verificationMethod}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>

                        <div className="relative w-full">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="verificationDate"
                          >
                            Date de vérification
                          </label>
                          <input
                            type="date"
                            id="verificationDate"
                            name="verificationDate"
                            value={newNonConformity.verificationDate}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>

                      <div className="relative w-full mb-4">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="notes"
                        >
                          Notes additionnelles
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={newNonConformity.notes}
                          onChange={handleInputChange}
                          rows="2"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button
                          type="submit"
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="bg-white rounded shadow-md p-4">
                  <h5 className="text-lg font-semibold text-blueGray-700 mb-4">
                    Liste des non-conformités
                  </h5>
                  
                  {nonConformities.length === 0 ? (
                    <p className="text-blueGray-500 text-center py-4">
                      Aucune non-conformité enregistrée. Cliquez sur "Ajouter une non-conformité" pour en créer une.
                    </p>
                  ) : (
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
                          {nonConformities.map((item) => (
                            <tr key={item.id} className="border-t border-blueGray-200">
                              <td className="py-3 px-4 text-sm text-blueGray-700">
                                {item.title}
                              </td>
                              <td className="py-3 px-4 text-sm text-blueGray-700">
                                {item.control}
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
                                  className="text-red-500 hover:text-red-700 mr-2"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Supprimer
                                </button>
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() => alert("Fonctionnalité de visualisation à implémenter")}
                                >
                                  Voir détails
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 





