import React, { useState, useRef } from "react";
import { FaFilePdf, FaFileCsv, FaEdit } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import GrapheAudit from "components/Cards/GrapheAudit";
import { useReactToPrint } from 'react-to-print'; // For advanced print

const Rapports = ({
  checklistItems = [],
  nonConformities = [],
  actionPlanItems = [],
  auditDuration = 0,
  auditType = "",
  auditor = "",
  department = "",
  auditStartDate = "",
  auditEndDate = "",
  auditProgress = "",
  notes = "",
}) => {
  const [reportData, setReportData] = useState({
    title: "Rapport d'Audit ISO 27001",
    date: new Date().toLocaleDateString("fr-FR"),
    auditType: auditType,
    auditor: auditor,
    department: department,
    notes: notes,
    showDetails: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  const componentRef = useRef();

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

  const pieData = [
    { name: "Conformes", value: compliantItems },
    { name: "Non-Conformes", value: nonCompliantItems },
    { name: "En Attente", value: pendingItems },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#FFBB28"];

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: reportData.title,
    onAfterPrint: () => alert("Impression terminée"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData((prev) => ({ ...prev, [name]: value }));
  };

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
    <>
      <style>
        {`
          @media print {
            .overflow-x-auto {
              overflow: visible !important;
            }
          }
        `}
      </style>

      <section className="relative block py-24 lg:pt-0 bg-blueGray-800 mt-10" ref={componentRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center mt-10">
            <div className="w-full lg:w-10/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <div className="flex-auto p-5 lg:p-10">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-2xl font-semibold text-blueGray-800">
                      Rapport d'Audit
                    </h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        <FaEdit className="mr-2 inline" />
                        {isEditing ? "Prévisualiser" : "Modifier"}
                      </button>
                      <button
                        onClick={handlePrint}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        <FaFilePdf className="mr-2 inline" /> PDF
                      </button>
                      <button
                        onClick={handleExportCSV}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        <FaFileCsv className="mr-2 inline" /> CSV
                      </button>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="bg-white rounded shadow-md p-6 mb-6">
                      <h5 className="text-lg font-semibold text-blueGray-700 mb-4">
                        Édition du Rapport
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                      <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                          État d’avancement
                        </label>
                        <input
                          type="text"
                          name="auditProgress"
                          value={auditProgress}
                          readOnly
                          className="border p-2 w-full bg-gray-100"
                        />
                      </div>

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
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center bg-gray-100 p-4 rounded mb-6">
                        <div><strong>{compliantItems}</strong><br/>Conformes</div>
                        <div><strong>{nonCompliantItems}</strong><br/>Non-Conformes</div>
                        <div><strong>{pendingItems}</strong><br/>En attente</div>
                      </div>

                      <div className="bg-white rounded shadow-md p-6 mb-6">
                        <div className="text-center mb-8">
                          <h1 className="text-3xl font-bold">{reportData.title}</h1>
                          <p className="text-gray-600">
                            Date du rapport: {reportData.date}
                          </p>
                          <p className="text-gray-600">Type d’audit: {reportData.auditType}</p>
                          <p className="text-gray-600">Auditeur: {reportData.auditor}</p>
                          <p className="text-gray-600">Département concerné: {reportData.department}</p>
                        </div>

                        <div className="mb-8">
                          <GrapheAudit />
                          <div className="flex justify-center mt-6">
                            <PieChart width={300} height={300}>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                dataKey="value"
                              >
                                {pieData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </div>
                        </div>

                        <div className="mb-8 bg-white rounded shadow-md p-6">
                          <h2 className="text-xl font-semibold mb-4">Calendrier / Planning de l’audit</h2>
                          <p><strong>Dates :</strong> {auditStartDate} - {auditEndDate}</p>
                          <p><strong>Durée :</strong> {auditDuration} jours</p>
                          <p><strong>État d’avancement :</strong> {auditProgress}</p>
                          <div className="mt-4">
                            <img
                              src="/assets/img/audit_timeline.png"
                              alt="Frise chronologique de l'audit"
                              className="mx-auto"
                              style={{ maxWidth: "400px" }}
                            />
                          </div>
                        </div>

                        <div className="mb-8 bg-white rounded shadow-md p-6 overflow-x-auto">
                          <h2 className="text-xl font-semibold mb-4">Checklist de conformité</h2>
                          <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Contrôle</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Statut</th>
                              </tr>
                            </thead>
                            <tbody>
                              {checklistItems.map((item, index) => (
                                <tr key={index} className="border border-gray-300">
                                  <td className="border border-gray-300 px-4 py-2">{item.text || item.control || "N/A"}</td>
                                  <td className="border border-gray-300 px-4 py-2">{statusLabels[item.status]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <p className="mt-4 font-semibold">
                            Conclusion : {generateConclusion({ checklistItems, nonConformities })}
                          </p>
                        </div>

                        <div className="mb-8 bg-white rounded shadow-md p-6 overflow-x-auto">
                          <h2 className="text-xl font-semibold mb-4">Non-conformités</h2>
                          <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Titre</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Sévérité</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Action corrective</th>
                              </tr>
                            </thead>
                            <tbody>
                              {nonConformities.map((item, index) => (
                                <tr key={index} className="border border-gray-300">
                                  <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                                  <td className="border border-gray-300 px-4 py-2">{item.severity}</td>
                                  <td className="border border-gray-300 px-4 py-2">{item.correctiveAction}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="mb-8 bg-white rounded shadow-md p-6 overflow-x-auto">
                          <h2 className="text-xl font-semibold mb-4">Plan d’action</h2>
                          <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Responsable</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Date prévue</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Statut</th>
                              </tr>
                            </thead>
                            <tbody>
                              {actionPlanItems.map((item, index) => (
                                <tr key={index} className="border border-gray-300">
                                  <td className="border border-gray-300 px-4 py-2">{item.action || item.titre}</td>
                                  <td className="border border-gray-300 px-4 py-2">{item.responsible}</td>
                                  <td className="border border-gray-300 px-4 py-2">{item.plannedDate || item.dueDate}</td>
                                  <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="mb-8 bg-white rounded shadow-md p-6">
                          <h2 className="text-xl font-semibold mb-4">Notes et recommandations de l’auditeur</h2>
                          {reportData.notes ? (
                            <p>{reportData.notes}</p>
                          ) : (
                            <p className="italic text-gray-500">Aucune remarque particulière.</p>
                          )}
                        </div>

                        <div className="mb-8 bg-white rounded shadow-md p-6 text-center">
                          <h2 className="text-xl font-semibold mb-4">Conclusion générale</h2>
                          <p className="text-2xl font-bold">{generalConclusion()}</p>
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
    </>
  );
};

export default Rapports;
