import React, { useState, useEffect, useRef } from "react";
import { CiImport } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function AuditChecklist() {
  const [selectedControl, setSelectedControl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [checklistItems, setChecklistItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [auditId, setAuditId] = useState(""); // This would come from props or URL params in a real app
  const [globalChecklist, setGlobalChecklist] = useState(() => {
    // Structure: { category: { controlId: [items] } }
    const saved = localStorage.getItem("globalChecklist");
    return saved ? JSON.parse(saved) : {};
  });
  const [savedChecklists, setSavedChecklists] = useState(() => {
    // Load saved checklists from localStorage on initial render
    const saved = localStorage.getItem("savedChecklists");
    return saved ? JSON.parse(saved) : [];
  }); // List of saved checklists
  const fileInputRef = useRef(null);

  const isoCategories = {
    Operationnelle: [
      { id: "A.5.1", name: "Politiques de sécurité de l'information" },
      { id: "A.5.2", name: "Rôles et responsabilités" },
    ],
    "A.Humen": [
      { id: "A.6.1", name: "Organisation interne" },
      { id: "A.6.2", name: "Télébureau et télétravail" },
    ],
    physique: [
      { id: "A.7.1", name: "Sélection" },
      { id: "A.7.2", name: "Formation et sensibilisation" },
      { id: "A.7.3", name: "Processus disciplinaire" },
    ],
  };

  useEffect(() => {
    if (selectedControl && selectedCategory) {
      // Save current checklist items to globalChecklist before loading new control
      setGlobalChecklist((prev) => {
        const updatedCategory = {
          ...(prev[selectedCategory] || {}),
          [selectedControl]: checklistItems,
        };
        const updated = {
          ...prev,
          [selectedCategory]: updatedCategory,
        };
        localStorage.setItem("globalChecklist", JSON.stringify(updated));
        return updated;
      });

      // Load checklist items for selected control from globalChecklist or default
      if (
        !globalChecklist[selectedCategory] ||
        !globalChecklist[selectedCategory][selectedControl]
      ) {
        setChecklistItems([
          {
            id: 1,
            text: "La politique est-elle documentée et approuvée par la direction?",
            status: "pending",
          },
          {
            id: 2,
            text: "La politique est-elle communiquée à tous les employés?",
            status: "pending",
          },
          {
            id: 3,
            text: "La politique est-elle revue à intervalles planifiés?",
            status: "pending",
          },
        ]);
      } else {
        setChecklistItems(globalChecklist[selectedCategory][selectedControl]);
      }
    } else {
      setChecklistItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedControl, selectedCategory]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim() === "") return;

    const newChecklistItem = {
      id: Date.now(),
      text: newItem,
      status: "pending",
    };

    setChecklistItems([...checklistItems, newChecklistItem]);
    setNewItem("");
  };

  const handleStatusChange = (itemId, newStatus) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  // const handleSaveChecklist = () => {
  //   // Save current checklist items for the selected control
  //   setGlobalChecklist((prev) => ({
  //     ...prev,
  //     [selectedControl]: checklistItems,
  //   }));

  //   // Combine all checklist items from all controls
  //   const combinedChecklistItems = Object.values(globalChecklist).flat();

  //   // Add current checklist items if not already included
  //   if (selectedControl && !globalChecklist[selectedControl]) {
  //     combinedChecklistItems.push(...checklistItems);
  //   }

  //   // Create checklist object with name and items
  //   const checklistName = selectedControl || "Checklist sans nom";
  //   const savedChecklist = {
  //     id: Date.now(),
  //     name: checklistName,
  //     items: combinedChecklistItems,
  //   };

  //   // Add to savedChecklists list and persist to localStorage
  //   setSavedChecklists((prev) => {
  //     const updated = [...prev, savedChecklist];
  //     localStorage.setItem("savedChecklists", JSON.stringify(updated));
  //     return updated;
  //   });

  //   // Reset states if needed
  //   setSelectedCategory("");
  //   setSelectedControl("");
  //   setChecklistItems([]);
  //   setGlobalChecklist({});

  //   alert("Checklist multi-mesures sauvegardée avec succès!");
  // };
  //   import axios from "axios"; // si tu utilises axios

  // const handleSaveChecklist = async () => {
  //   const checklistToSave = {
  //     name: selectedControl,
  //     auditId: auditId || 1, // à adapter
  //     items: checklistItems,
  //   };

  //   try {
  //     const response = await axios.post("http://localhost:8080/api/checklists", checklistToSave);
  //     alert("Checklist sauvegardée sur le serveur !");
  //   } catch (error) {
  //     console.error("Erreur lors de la sauvegarde :", error);
  //     alert("Échec de la sauvegarde.");
  //   }
  // };
   // ✅ ENREGISTRER checklist dans MongoDB
 // ✅ ENREGISTRER checklist dans MongoDB
const handleSaveChecklist = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/checklists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        control: selectedControl,
        items: checklistItems,
      }),
    });

    // Vérifier si la requête a réussi
    if (!response.ok) {
      throw new Error("Erreur lors de la sauvegarde");
    }

    // Mettre à jour le state globalChecklist
    setGlobalChecklist((prev) => {
      // Update checklistItems to set category and control for each item
      const updatedItemsWithCategoryAndControl = checklistItems.map(
        (item) => ({
          ...item,
          category: selectedCategory || item.category || "Sans catégorie",
          control: selectedControl || item.control || "Sans contrôle",
        })
      );

      // Merge updatedItemsWithCategoryAndControl with existing items for the selected control
      const existingControls = prev[selectedCategory] || {};
      const mergedControls = {
        ...existingControls,
        [selectedControl]: updatedItemsWithCategoryAndControl,
      };

      const updatedGlobalChecklist = {
        ...prev,
        [selectedCategory]: mergedControls,
      };

      // Defensive check: ensure controls is an object and items is an array
      const allItems = Object.entries(updatedGlobalChecklist).flatMap(
        ([category, controls]) =>
          controls && typeof controls === "object"
            ? Object.entries(controls).flatMap(([control, items]) =>
                Array.isArray(items)
                  ? items.map((item) => ({
                      ...item,
                      category: category,
                      control: control,
                    }))
                  : []
              )
            : []
      );

      const newChecklist = {
        id: Date.now(),
        name: "Checklist complète",
        items: allItems,
      };

      localStorage.setItem("savedChecklists", JSON.stringify([newChecklist]));

      toast.success("Checklist complète sauvegardée avec succès !");

      return updatedGlobalChecklist;
    });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
    alert("Une erreur est survenue lors de la sauvegarde.");
  }
};

  const handleConstatChange = (itemId, value) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.id === itemId ? { ...item, constat: value } : item
      )
    );
  };

  const handleRecommendationChange = (itemId, value) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.id === itemId ? { ...item, recommendation: value } : item
      )
    );
  };
  const handlePreuveChange = (itemId, value) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.id === itemId ? { ...item, preuve: value } : item
      )
    );
  };
  // Fonction pour importer les données d'audit
  const handleImport = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      // TODO: Implémenter l'appel API pour l'import
      // const formData = new FormData();
      // formData.append('file', file);
      // await axios.post(`${API_BASE_URL}/audits/import`, formData);
      console.log("Import du fichier:", file.name);
    } catch (error) {
      console.error("Erreur lors de l'import:", error);
    }
  };

  return (
    <section className="relative block py-24 lg:pt-0 bg-blueGray-800 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center mt-10">
          <div className="w-full lg:w-10/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 mt-50">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold text-blueGray-800">
                  Checklist d'audit ISO 27001
                </h4>
                <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                  Sélectionnez une mesure de l'Annexe A et créez une checklist
                  personnalisée pour votre audit.
                </p>

                <div className="relative w-full mb-6">
                  {/* Choix de la catégorie */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Catégorie ISO 27001
                    </label>
                    <select
                      className="w-full p-2 rounded border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={selectedCategory}
                      onChange={(e) => {
                        if (selectedControl && selectedCategory) {
                          setGlobalChecklist((prev) => {
                            const updatedCategory = {
                              ...(prev[selectedCategory] || {}),
                              [selectedControl]: checklistItems,
                            };
                            return {
                              ...prev,
                              [selectedCategory]: updatedCategory,
                            };
                          });
                        }
                        setSelectedCategory(e.target.value);
                        setSelectedControl("");
                      }}
                    >
                      <option value="">Sélectionnez une catégorie</option>
                      {Object.keys(isoCategories).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Choix du contrôle */}
                  {selectedCategory && (
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Mesure ISO 27001
                      </label>
                      <select
                        className="w-full p-2 rounded border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectedControl}
                        onChange={(e) => {
                          if (selectedControl && selectedCategory) {
                            setGlobalChecklist((prev) => {
                              const updatedCategory = {
                                ...(prev[selectedCategory] || {}),
                                [selectedControl]: checklistItems,
                              };
                              return {
                                ...prev,
                                [selectedCategory]: updatedCategory,
                              };
                            });
                          }
                          setSelectedControl(e.target.value);
                        }}
                      >
                        <option value="">Sélectionnez une mesure</option>
                        {isoCategories[selectedCategory].map((ctrl) => (
                          <option key={ctrl.id} value={ctrl.id}>
                            {ctrl.id} - {ctrl.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {selectedControl && (
                  <React.Fragment>
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
                          <table className="min-w-full bg-white  ">
                            <thead>
                              <tr>
                                <th className="py-4 px-6 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                                  Question
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                                  Statut
                                </th>

                                <th className="py-4 px-6 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                                  Constat
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                                  Recommendation
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                                  Preuve
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {checklistItems.map((item) => (
                                <tr
                                  key={item.id}
                                  className="border-t border-blueGray-200"
                                >
                                  <td className="py-3 px-4 text-sm text-blueGray-700">
                                    {item.text}
                                  </td>
                                  <td className="py-3 px-4 text-sm">
                                    <select
                                      className="border-0 px-2 py-1 text-sm rounded focus:outline-none focus:ring"
                                      value={item.status}
                                      onChange={(e) =>
                                        handleStatusChange(
                                          item.id,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="pending">
                                        En attente
                                      </option>
                                      <option value="compliant">
                                        Conforme
                                      </option>
                                      <option value="non-compliant">
                                        Non conforme
                                      </option>
                                    </select>
                                  </td>
                                  <td className="py-3 px-4 text-sm">
                                    <textarea
                                      type="text"
                                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mr-2"
                                      placeholder="Ajouter un constat..."
                                      value={item.constat || ""}
                                      onChange={(e) =>
                                        handleConstatChange(
                                          item.id,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="py-3 px-4 text-sm">
                                    <textarea
                                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mr-2"
                                      placeholder="Recommandation auditeur"
                                      value={item.recommendation || ""}
                                      onChange={(e) =>
                                        handleRecommendationChange(
                                          item.id,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="py-3 px-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                      <textarea
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mr-2"
                                        placeholder="Preuve"
                                        value={item.preuve || ""}
                                        onChange={(e) =>
                                          handlePreuveChange(
                                            item.id,
                                            e.target.value
                                          )
                                        }
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          fileInputRef.current?.click()
                                        }
                                        className="text-blueGray-600 hover:text-blueGray-800 flex items-center space-x-1"
                                      >
                                        <CiImport className="font-medium text-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
                                      </button>
                                      <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.jpg,.png"
                                        onChange={handleImport}
                                      />
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-sm">
                                    <button
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() =>
                                        setChecklistItems(
                                          checklistItems.filter(
                                            (i) => i.id !== item.id
                                          )
                                        )
                                      }
                                      title="Supprimer"
                                    >
                                      <RiDeleteBin5Fill className="text-lg text-red-500 hover:text-red-700" />
                                    </button>
                                    <button className="p-2" title="Modifier">
                                      <FaEdit className="text-lg text-emerald-500 hover:text-emerald-700" />
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
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// </create_file>





