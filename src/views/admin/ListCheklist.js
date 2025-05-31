import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

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
  maxWidth: "40rem",
  width: "100%",
  padding: "2rem",
  overflow: "auto",
  maxHeight: "80vh",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};
// useEffect(() => {
//   axios.get("http://localhost:8080/api/checklists")
//     .then(response => {
//       setSavedChecklists(response.data);

//       const controls = response.data.flatMap(cl =>
//         cl.items.map(item => ({
//           ...item,
//           checklistName: cl.name,
//           checklistId: cl.id,
//         }))
//       );

//       setAllControls(controls);
//     })
//     .catch(error => {
//       console.error("Erreur lors du chargement des checklists :", error);
//     });
// }, []);

const exampleSavedChecklists = [
  {
    id: 123456789,
    name: "Exemple Checklist",
    items: [
      {
        id: 1,
        text: "La politique est-elle documentée et approuvée par la direction?",
        status: "pending",
        constat: "Non documentée",
        recommendation: "Documenter la politique rapidement",
        preuve: "Absence de document",
      },
      {
        id: 2,
        text: "La politique est-elle communiquée à tous les employés?",
        status: "compliant",
        constat: "Communiquée par email",
        recommendation: "Continuer la communication régulière",
        preuve: "Emails archivés",
      },
    ],
  },
];

export default function ListCheklist() {
  const [savedChecklists, setSavedChecklists] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [editControl, setEditControl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("savedChecklists");
    if (saved) {
      const checklists = JSON.parse(saved);
      setSavedChecklists(checklists);
    } else {
      localStorage.setItem(
        "savedChecklists",
        JSON.stringify(exampleSavedChecklists)
      );
      setSavedChecklists(exampleSavedChecklists);
    }
  }, []);

  const handleEditClick = (control) => {
    setEditControl({ ...control });
    setIsEditing(true);
  };

  const handleEditChange = (field, value) => {
    setEditControl({ ...editControl, [field]: value });
  };

  const handleSaveEdit = () => {
    if (!selectedChecklist) return;
    // Update control in selectedChecklist
    const updatedItems = selectedChecklist.items.map((item) =>
      item.id === editControl.id ? editControl : item
    );
    const updatedChecklist = { ...selectedChecklist, items: updatedItems };

    // Update savedChecklists
    const updatedChecklists = savedChecklists.map((cl) =>
      cl.id === updatedChecklist.id ? updatedChecklist : cl
    );
    setSavedChecklists(updatedChecklists);
    localStorage.setItem("savedChecklists", JSON.stringify(updatedChecklists));

    setIsEditing(false);
    setEditControl(null);
    setSelectedChecklist(updatedChecklist);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditControl(null);
  };

  const handleChecklistClick = (checklist) => {
    setSelectedChecklist(checklist);
    setCurrentCategoryIndex(0); // Reset pagination on checklist change
  };

  const handleDeleteItem = (itemId) => {
    if (!selectedChecklist) return;
    if (window.confirm("Voulez-vous vraiment supprimer ce contrôle ?")) {
      const updatedItems = selectedChecklist.items.filter(
        (item) => item.id !== itemId
      );
      const updatedChecklist = { ...selectedChecklist, items: updatedItems };
      const updatedChecklists = savedChecklists.map((cl) =>
        cl.id === updatedChecklist.id ? updatedChecklist : cl
      );
      setSavedChecklists(updatedChecklists);
      localStorage.setItem(
        "savedChecklists",
        JSON.stringify(updatedChecklists)
      );
      setSelectedChecklist(updatedChecklist);
    }
  };

  const handleBackToList = () => {
    setSelectedChecklist(null);
  };

  // Extract categories from selectedChecklist items
  const categories = selectedChecklist
    ? Array.from(
        new Set(
          selectedChecklist.items.map(
            (item) => item.category || "Sans catégorie"
          )
        )
      )
    : [];

  // Group items by category and control for the current page (category)
  const groupedForCurrentCategory = {};
  if (selectedChecklist && categories.length > 0) {
    selectedChecklist.items.forEach((item) => {
      const category = item.category || "Sans catégorie";
      if (category === categories[currentCategoryIndex]) {
        if (!groupedForCurrentCategory[category])
          groupedForCurrentCategory[category] = {};
        const control = item.control || "Sans contrôle";
        if (!groupedForCurrentCategory[category][control])
          groupedForCurrentCategory[category][control] = [];
        groupedForCurrentCategory[category][control].push(item);
      }
    });
  }

  const handlePrevPage = () => {
    setCurrentCategoryIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentCategoryIndex((prev) =>
      Math.min(prev + 1, categories.length - 1)
    );
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-4">
            <h3 className="text-xl font-semibold mb-4">Liste des Checklists</h3>
            {!selectedChecklist && (
              <ul className="list-disc pl-5 mb-4">
                {savedChecklists.map((checklist) => (
                  <li
                    key={checklist.id}
                    className="cursor-pointer text-blue-600 hover:underline"
                    onClick={() => handleChecklistClick(checklist)}
                  >
                    {checklist.name}
                  </li>
                ))}
              </ul>
            )}

            {selectedChecklist && (
              <>
                <button
                  className="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={handleBackToList}
                >
                  Retour à la liste
                </button>

                {/* Category name display */}
                <div className="mb-2 font-semibold">
                  Catégorie: {categories[currentCategoryIndex]}
                </div>

                <table className="min-w-full table-auto border-collapse border border-gray-300 mb-4">
                  <thead>
                    <tr className="bg-gray-100">
                      
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Contrôle
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Question
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Statut
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Constat
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Recommandation
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Preuve
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const rows = [];
                      Object.entries(groupedForCurrentCategory).forEach(
                        ([category, controls]) => {
                          Object.entries(controls).forEach(
                            ([control, items]) => {
                              items.forEach((item, idx) => {
                                rows.push(
                                  <tr
                                    key={item.id}
                                    className="border border-gray-300"
                                  >
                                    
                                    
                                    {idx === 0 && (
                                      <td
                                        className="border border-gray-300 px-4 py-2"
                                        rowSpan={items.length}
                                      >
                                        {control}
                                      </td>
                                    )}
                                    <td className="border border-gray-300 px-4 py-2">
                                      {item.text}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                      {item.status}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                      {item.constat || ""}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                      {item.recommendation || ""}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                      {item.preuve || ""}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                      <button
                                        className="text-emerald-600 hover:text-emerald-800 mr-4"
                                        onClick={() => handleEditClick(item)}
                                        title="Modifier"
                                      >
                                        <FaEdit />
                                      </button>
                                      <button
                                        className="text-red-600 hover:text-red-800 ml-2"
                                        onClick={() =>
                                          handleDeleteItem(item.id)
                                        }
                                        title="Supprimer"
                                      >
                                        <RiDeleteBin5Fill />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              });
                            }
                          );
                        }
                      );
                      return rows;
                    })()}
                  </tbody>
                </table>

                {/* Numeric pagination below the table */}
                <div className="flex justify-center space-x-3 mt-4">
                  {categories.map((category, index) => (
                    <button
                      key={category}
                      onClick={() => setCurrentCategoryIndex(index)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-shadow duration-300 ${
                        index === currentCategoryIndex
                          ? "bg-gray-300 text-gray-700 shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                      }`}
                      aria-current={
                        index === currentCategoryIndex ? "page" : undefined
                      }
                      aria-label={`Page ${index + 1}: ${category}`}
                      title={`Page ${index + 1}: ${category}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}

            {isEditing && editControl && (
              <div style={modalOverlayStyle}>
                <div style={modalContentStyle}>
                  <h4 className="text-xl font-semibold mb-4">
                    Modifier le contrôle: {editControl.text}
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Statut
                      </label>
                      <select
                        className="border-0 px-2 py-1 text-sm rounded focus:outline-none focus:ring"
                        value={editControl.status}
                        onChange={(e) =>
                          handleEditChange("status", e.target.value)
                        }
                      >
                        <option value="pending">En attente</option>
                        <option value="compliant">Conforme</option>
                        <option value="non-compliant">Non conforme</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Constat
                      </label>
                      <textarea
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        value={editControl.constat || ""}
                        onChange={(e) =>
                          handleEditChange("constat", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Recommandation
                      </label>
                      <textarea
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        value={editControl.recommendation || ""}
                        onChange={(e) =>
                          handleEditChange("recommendation", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Preuve
                      </label>
                      <textarea
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        value={editControl.preuve || ""}
                        onChange={(e) =>
                          handleEditChange("preuve", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 space-x-4">
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={handleCancelEdit}
                    >
                      Annuler
                    </button>
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      onClick={handleSaveEdit}
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
