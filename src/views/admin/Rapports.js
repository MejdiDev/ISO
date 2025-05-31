import React, { useState } from "react";
import { FaFilePdf, FaFileCsv, FaEdit } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import GrapheAudit from "components/Cards/GrapheAudit";

/**
 * Function to generate automatic conclusion based on checklist and non-conformities.
 * This function can be adapted to use backend data or business rules.
 * @param {Object} param0
 * @param {Array} param0.checklistItems - List of checklist items with status.
 * @param {Array} param0.nonConformities - List of non-conformities.
 * @returns {string} - Conclusion message.
 */
const generateConclusion = ({ checklistItems, nonConformities }) => {
  const conformes = checklistItems.filter(
    (i) => i.status === "compliant"
  ).length;
  const total = checklistItems.length;
  const tauxConformite = total > 0 ? conformes / total : 0;

  if (tauxConformite > 0.85 && nonConformities.length === 0) {
    return "✅ Très bon niveau de conformité. Aucun écart majeur détecté.";
  } else if (tauxConformite > 0.6) {
    return "🟡 Conformité partielle. Des améliorations sont nécessaires.";
  } else {
    return "🔴 Niveau de conformité insuffisant. Audit à reprogrammer après corrections.";
  }
};

/**
 * Function to generate conclusion based on action plan items.
 * @param {Array} actionPlanItems - List of action plan items.
 * @returns {string} - Conclusion message.
 */
const generateActionPlanConclusion = (actionPlanItems) => {
  const total = actionPlanItems.length;
  const completed = actionPlanItems.filter(
    (a) => a.status.toLowerCase() === "terminé"
  ).length;
  const inProgress = actionPlanItems.filter(
    (a) => a.status.toLowerCase() === "en cours"
  ).length;
  const pending = actionPlanItems.filter(
    (a) => a.status.toLowerCase() === "à faire"
  ).length;

  const today = new Date();
  const overdue = actionPlanItems.filter((a) => {
    const date = new Date(a.plannedDate);
    return date < today && a.status.toLowerCase() !== "terminé";
  }).length;

  if (completed === total && total > 0) {
    return "✅ Toutes les actions correctives ont été menées à bien. Le plan d'action est clôturé.";
  } else if (overdue > 0) {
    return `🔴 ${overdue} action(s) corrective(s) en retard. Des mesures urgentes sont nécessaires.`;
  } else if (inProgress > 0 || pending > 0) {
    return "🟡 Le plan d'action est en cours d'exécution. Un suivi régulier est recommandé.";
  } else {
    return "ℹ️ Aucun plan d'action défini ou en cours.";
  }
};

// Rapports component with full logical structure and comments for backend integration
const Rapports = ({
  checklistItems = [
    { text: "Contrôle A.5.1", status: "compliant" },
    { text: "Contrôle A.6.1", status: "non-compliant" },
    { text: "Contrôle A.7.1", status: "pending" },
  ],
  nonConformities = [
    {
      title: "Politique non documentée",
      severity: "major",
      correctiveAction: "Rédiger la politique et la faire approuver",
    },
    {
      title: "Contrôles d'accès manquants",
      severity: "minor",
      correctiveAction: "Mettre en place une authentification à 2 facteurs",
    },
  ],
  actionPlanItems = [
    {
      action: "Mettre à jour la documentation",
      responsible: "Alice Dupont",
      plannedDate: "2024-05-10",
      status: "En cours",
    },
    {
      action: "Former l'équipe sur la nouvelle procédure",
      responsible: "Bob Martin",
      plannedDate: "2024-05-15",
      status: "À faire",
    },
  ],
  auditDuration = 10,
  auditType = "Interne",
  auditor = "Jean Dupont",
  department = "Informatique",
  auditStartDate = "2024-04-01",
  auditEndDate = "2024-04-10",
  auditProgress = "En cours",
  notes = "",
}) => {
  const reportRef = useRef();
  // Local state for report metadata and editing mode
  const [reportData, setReportData] = useState({
    title: "Rapport d'Audit ISO 27001",
    date: new Date().toLocaleDateString("fr-FR"),
    auditType: auditType,
    auditor: auditor,
    department: department,
    notes: notes,
    showDetails: true,
    auditProgress: auditProgress,
  });
  const [isEditing, setIsEditing] = useState(false);

  // New state to store saved reports as PDF URLs
  const [savedReports, setSavedReports] = useState([]);

  // Function to handle saving the current report as PDF
  const handleSaveReport = () => {
    if (!reportRef.current) {
      alert("Erreur: le rapport n'est pas prêt pour la sauvegarde.");
      return;
    }
    // Use react-to-print to generate PDF blob
    const printContent = reportRef.current;
    import("html2canvas").then((html2canvas) => {
      import("jspdf").then((jsPDF) => {
        html2canvas.default(printContent).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF.jsPDF("p", "mm", "a4");
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          const pdfBlob = pdf.output("blob");
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const newSavedReport = {
            id: Date.now(),
            url: pdfUrl,
            title: reportData.title,
            date: reportData.date,
          };
          setSavedReports((prev) => [...prev, newSavedReport]);
          alert("Rapport sauvegardé en PDF avec succès !");
        });
      });
    });
  };

  // Calculate checklist statistics for pie chart
  const totalItems = checklistItems.length;
  const compliantItems = checklistItems.filter(
    (item) => item.status === "compliant"
  ).length;
  const nonCompliantItems = checklistItems.filter(
    (item) => item.status === "non-compliant"
  ).length;
  const pendingItems = checklistItems.filter(
    (item) => item.status === "pending"
  ).length;

  // Data for pie chart visualization
  const pieData = [
    { name: "Conformes", value: compliantItems },
    { name: "Non-Conformes", value: nonCompliantItems },
    { name: "En Attente", value: pendingItems },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#FFBB28"];

  /**
   * Export non-conformities data as CSV.
   * This can be replaced or extended to export other report data.
   */
  const handleExportCSV = () => {
    const csvContent = [
      "Titre,Contrôle,Gravité,Action Corrective,Statut",
      ...nonConformities.map(
        (item) =>
          `"${item.title || ""}","${item.control || ""}","${
            item.severity || ""
          }","${item.correctiveAction || ""}","${item.status || ""}"`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `rapport_audit_${new Date().toISOString().split("T")[0]}.csv`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print the report page
  const handlePrint = useReactToPrint({
    content: () => {
      console.log("Élément référencé:", reportRef.current);
    return reportRef.current;
    },
    pageStyle: `
      @page { size: A4; margin: 1cm; }
      @media print {
        body { color: #000; background: #fff; }
        .no-print { display: none !important; }
        .print-section { break-inside: avoid; }
        h1, h2, h3 { break-after: avoid; }
        table { break-inside: avoid; }
      }
    `,
    documentTitle: `Rapport_Audit_${new Date().toISOString().split("T")[0]}`,
  });

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData((prev) => ({ ...prev, [name]: value }));
  };

  // Automatic general conclusion based on compliance level and non-conformities
  const generalConclusion = () => {
    const tauxConformite = totalItems > 0 ? compliantItems / totalItems : 0;
    if (tauxConformite > 0.85 && nonConformities.length === 0) {
      return "Audit réussi - Feu vert";
    } else if (tauxConformite > 0.6) {
      return "Audit acceptable - Feu orange";
    } else {
      return "Audit non conforme - Feu rouge";
    }
  };

  return (
    <section className="relative block py-24 lg:pt-0 bg-blueGray-800 mt-10 mb-8 bg-white rounded shadow-md p-6 print-section ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center mt-10">
          <div className="w-full lg:w-10/12 px-4">
            <div
              
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200"
            >
              <div className="flex-auto p-5 lg:p-10">
                {/* Action bar with edit, print, and export buttons */}
                <div className="no-print flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
                  <h4 className="text-2xl font-semibold text-blueGray-800">
                    Rapport d'Audit
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="..."
                    >
                      <FaEdit className="mr-2" />
                      {isEditing ? "Prévisualiser" : "Modifier"}
                    </button>
                    <button onClick={handleSaveReport} className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                      Sauvegarder
                    </button>
                    <button onClick={handlePrint} className="...">
                      <FaFilePdf className="mr-2" /> PDF
                    </button>
                    <button onClick={handleExportCSV} className="...">
                      <FaFileCsv className="mr-2" /> CSV
                    </button>
                  </div>
                </div>

                {/* Report content: edit mode or preview mode */}
                {isEditing ? (
                  <div className="bg-white rounded shadow-md p-6 mb-6">
                    {/* Edit mode form */}
                    <h5 className="text-lg font-semibold text-blueGray-700 mb-4">
                      Édition du Rapport
                    </h5>

                    <div ref={reportRef}  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Report title */}
                      <div>
                        <label className="block text-sm font-bold mb-2">
                          Titre du Rapport
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={reportData.title}
                          onChange={handleInputChange}
                          className="border p-2 w-full"
                        />
                      </div>
                      {/* Audit type */}
                      <div>
                        <label className="block text-sm font-bold mb-2">
                          Type d’audit
                        </label>
                        <input
                          type="text"
                          name="auditType"
                          value={reportData.auditType}
                          onChange={handleInputChange}
                          className="border p-2 w-full"
                        />
                      </div>
                      {/* Auditor */}
                      <div>
                        <label className="block text-sm font-bold mb-2">
                          Auditeur
                        </label>
                        <input
                          type="text"
                          name="auditor"
                          value={reportData.auditor}
                          onChange={handleInputChange}
                          className="border p-2 w-full"
                        />
                      </div>
                      {/* Department */}
                      <div>
                        <label className="block text-sm font-bold mb-2">
                          Département concerné
                        </label>
                        <input
                          type="text"
                          name="department"
                          value={reportData.department}
                          onChange={handleInputChange}
                          className="border p-2 w-full"
                        />
                      </div>
                    </div>

                    {/* Audit dates */}
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Dates de l’audit (début - fin)
                      </label>
                      <input
                        type="text"
                        name="auditDates"
                        value={`${auditStartDate} - ${auditEndDate}`}
                        readOnly
                        className="border p-2 w-full bg-gray-100"
                      />
                    </div>

                    {/* Audit progress */}
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        État d’avancement
                      </label>
                      <input
                        type="text"
                        name="auditProgress"
                        value={reportData.auditProgress || auditProgress}
                        readOnly
                        className="border p-2 w-full bg-gray-100"
                      />
                    </div>

                    {/* Additional notes */}
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Notes supplémentaires
                      </label>
                      <textarea
                        name="notes"
                        value={reportData.notes}
                        onChange={handleInputChange}
                        rows="3"
                        className="border p-2 w-full"
                      ></textarea>
                    </div>

                    {/* Toggle to show/hide non-conformity details */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showDetails"
                        checked={reportData.showDetails}
                        onChange={() =>
                          setReportData((prev) => ({
                            ...prev,
                            showDetails: !prev.showDetails,
                          }))
                        }
                        className="mr-2"
                      />
                      <label htmlFor="showDetails" className="text-sm">
                        Afficher les détails des non-conformités
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded shadow-md p-6 mb-6">
                    {/* Preview mode display */}
                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-bold">{reportData.title}</h1>
                      <p className="text-gray-600">
                        Date du rapport: {reportData.date}
                      </p>
                      <p className="text-gray-600">
                        Type d’audit: {reportData.auditType}
                      </p>
                      <p className="text-gray-600">
                        Auditeur: {reportData.auditor}
                      </p>
                      <p className="text-gray-600">
                        Département concerné: {reportData.department}
                      </p>
                    </div>

                    {/* Global graph section */}
                    <div className="mb-8">
                      <div className="flex justify-center mt-6">
                       
                        <GrapheAudit />
                      </div>
                    </div>

                    {/* Audit calendar/planning summary */}
                    <div className="mb-8 bg-white rounded shadow-md p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Calendrier / Planning de l’audit
                      </h2>
                      <p>
                        <strong>Dates :</strong> {auditStartDate} -{" "}
                        {auditEndDate}
                      </p>
                      <p>
                        <strong>Durée :</strong> {auditDuration} jours
                      </p>
                      <p>
                        <strong>État d’avancement :</strong> {auditProgress}
                      </p>
                      
                    </div>

                    {/* Compliance checklist summary table */}
                    <div className="mb-8 bg-white rounded shadow-md p-6 overflow-x-auto">
                      <h2 className="text-xl font-semibold mb-4">
                        Checklist de conformité
                      </h2>
                      <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Contrôle
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Statut
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {checklistItems.map((item, index) => (
                            <tr key={index} className="border border-gray-300">
                              <td className="border border-gray-300 px-4 py-2">
                                {item.text || item.control || "N/A"}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {item.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* Automatic compliance conclusion */}
                      <p className="mt-4 font-semibold">
                        Conclusion :{" "}
                        {generateConclusion({
                          checklistItems,
                          nonConformities,
                        })}
                      </p>
                    </div>

                    {/* Non-conformities summary table */}
                    <div className="mb-8 bg-white rounded shadow-md p-6 overflow-x-auto">
                      <h2 className="text-xl font-semibold mb-4">
                        Non-conformités
                      </h2>
                      <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Titre
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Sévérité
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Action corrective
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {nonConformities.map((item, index) => (
                            <tr key={index} className="border border-gray-300">
                              <td className="border border-gray-300 px-4 py-2">
                                {item.title}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {item.severity}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {item.correctiveAction}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Action plan summary table */}
                    <div className="mb-8 bg-white rounded shadow-md p-6 overflow-x-auto">
                      <h2 className="text-xl font-semibold mb-4">
                        Plan d’action
                      </h2>
                      <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Action
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Responsable
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Date prévue
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Statut
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {actionPlanItems.map((item, index) => (
                            <tr key={index} className="border border-gray-300">
                              <td className="border border-gray-300 px-4 py-2">
                                {item.action || item.titre}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {item.responsible}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {item.plannedDate || item.dueDate}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {item.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="mt-4 font-semibold">
                        Conclusion du plan d’action :{" "}
                        {generateActionPlanConclusion(actionPlanItems)}
                      </p>
                    </div>

                    {/* Notes and auditor recommendations */}
                    <div className="mb-8 bg-white rounded shadow-md p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Notes et recommandations de l’auditeur
                      </h2>
                      {reportData.notes ? (
                        <p>{reportData.notes}</p>
                      ) : (
                        <p className="italic text-gray-500">
                          Aucune remarque particulière.
                        </p>
                      )}
                    </div>

                    {/* General conclusion */}
                    <div className="mb-8 bg-white rounded shadow-md p-6 text-center">
                      <h2 className="text-xl font-semibold mb-4">
                        Conclusion générale
                      </h2>
                      <p className="text-2xl font-bold">
                        {generalConclusion()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {savedReports.length > 0 && (
              <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                <h5 className="text-xl font-semibold text-blueGray-800 mb-4">
                  Rapports sauvegardés (PDF)
                </h5>
                {savedReports.map((report) => (
                  <div key={report.id} className="mb-4 border border-blueGray-300 rounded p-3">
                    <h6 className="font-bold mb-2">{report.title}</h6>
                    <p>Date: {report.date}</p>
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Ouvrir le PDF
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rapports;
