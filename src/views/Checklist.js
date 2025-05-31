import React, { useState, useEffect } from "react";

export default function AuditChecklist() {
  const [selectedControl, setSelectedControl] = useState("");
  const [checklistItems, setChecklistItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [auditId, setAuditId] = useState(""); // This would come from props or URL params in a real app

  // ISO 27001:2013 Annex A controls
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

  // Load checklist items for the selected control
  useEffect(() => {
    if (selectedControl) {
      // In a real application, this would fetch from an API
      // For now, we'll just set some example items
      setChecklistItems([
        { id: 1, text: "La politique est-elle documentée et approuvée par la direction?", status: "pending" },
        { id: 2, text: "La politique est-elle communiquée à tous les employés?", status: "pending" },
        { id: 3, text: "La politique est-elle revue à intervalles planifiés?", status: "pending" },
      ]);
    } else {
      setChecklistItems([]);
    }
  }, [selectedControl]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim() === "") return;
    
    const newChecklistItem = {
      id: Date.now(),
      text: newItem,
      status: "pending"
    };
    
    setChecklistItems([...checklistItems, newChecklistItem]);
    setNewItem("");
  };

  const handleStatusChange = (itemId, newStatus) => {
    setChecklistItems(
      checklistItems.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleSaveChecklist = () => {
    // In a real application, this would save to an API
    console.log("Saving checklist for control:", selectedControl);
    console.log("Checklist items:", checklistItems);
    alert("Checklist sauvegardée avec succès!");
  };

  return (
    <section className="relative block py-24 lg:pt-0 bg-blueGray-800 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 mt-50">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold text-blueGray-800">
                  Checklist d'audit ISO 27001
                </h4>
                <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                  Sélectionnez un contrôle de l'Annexe A et créez une checklist personnalisée pour votre audit.
                </p>

                <div className="relative w-full mb-6">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="control-select"
                  >
                    Contrôle ISO 27001
                  </label>
                  <select
                    id="control-select"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={selectedControl}
                    onChange={(e) => setSelectedControl(e.target.value)}
                  >
                    <option value="">Sélectionnez un contrôle</option>
                    {isoControls.map((control) => (
                      <option key={control.id} value={control.id}>
                        {control.id} - {control.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedControl && (
                  <>
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-blueGray-700 mb-3">
                        Questions de vérification
                      </h5>
                      
                      <div className="bg-white rounded shadow-md p-4 mb-4">
                        <form onSubmit={handleAddItem} className="flex mb-4">
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mr-2"
                            placeholder="Ajouter une nouvelle question..."
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                          />
                          <button
                            type="submit"
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                          >
                            Ajouter
                          </button>
                        </form>

                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white">
                            <thead>
                              <tr>
                                <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                                  Question
                                </th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                                  Statut
                                </th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {checklistItems.map((item) => (
                                <tr key={item.id} className="border-t border-blueGray-200">
                                  <td className="py-3 px-4 text-sm text-blueGray-700">
                                    {item.text}
                                  </td>
                                  <td className="py-3 px-4 text-sm">
                                    <select
                                      className="border-0 px-2 py-1 text-sm rounded focus:outline-none focus:ring"
                                      value={item.status}
                                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                    >
                                      <option value="pending">En attente</option>
                                      <option value="compliant">Conforme</option>
                                      <option value="non-compliant">Non conforme</option>
                                      <option value="not-applicable">Non applicable</option>
                                    </select>
                                  </td>
                                  <td className="py-3 px-4 text-sm">
                                    <button
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() => setChecklistItems(checklistItems.filter(i => i.id !== item.id))}
                                    >
                                      Supprimer
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          onClick={handleSaveChecklist}
                        >
                          Sauvegarder la checklist
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
