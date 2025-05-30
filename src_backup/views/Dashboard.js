import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [complianceData, setComplianceData] = useState({
    overallCompliance: 75,
    controlsCompliance: [
      { id: "A.5.1", name: "Politiques de sécurité de l'information", compliance: 90 },
      { id: "A.5.2", name: "Rôles et responsabilités", compliance: 85 },
      { id: "A.6.1", name: "Organisation interne", compliance: 80 },
      { id: "A.6.2", name: "Télébureau et télétravail", compliance: 70 },
      { id: "A.7.1", name: "Sélection", compliance: 75 },
      { id: "A.7.2", name: "Formation et sensibilisation", compliance: 65 },
      { id: "A.7.3", name: "Processus disciplinaire", compliance: 60 },
      { id: "A.8.1", name: "Responsabilité des actifs", compliance: 85 },
      { id: "A.8.2", name: "Classification de l'information", compliance: 80 },
      { id: "A.8.3", name: "Médias sur support amovible", compliance: 75 },
    ],
    recentAudits: [
      { id: 1, name: "Audit interne Q1 2023", date: "2023-03-15", status: "completed", findings: 12 },
      { id: 2, name: "Audit externe 2022", date: "2022-12-10", status: "completed", findings: 8 },
      { id: 3, name: "Audit de certification", date: "2022-09-05", status: "completed", findings: 15 },
    ],
    openNonConformities: [
      { id: 1, title: "Politique de mots de passe non conforme", severity: "major", dueDate: "2023-05-15" },
      { id: 2, title: "Formation de sécurité non complétée", severity: "minor", dueDate: "2023-04-30" },
      { id: 3, title: "Procédure de sauvegarde non documentée", severity: "minor", dueDate: "2023-05-10" },
    ],
    upcomingAudits: [
      { id: 4, name: "Audit interne Q2 2023", date: "2023-06-20", status: "planned" },
      { id: 5, name: "Audit de surveillance", date: "2023-09-15", status: "planned" },
    ],
  });

  // Mock data for charts
  const [chartData, setChartData] = useState({
    complianceTrend: [
      { month: "Jan", value: 65 },
      { month: "Fév", value: 68 },
      { month: "Mar", value: 72 },
      { month: "Avr", value: 70 },
      { month: "Mai", value: 75 },
      { month: "Juin", value: 75 },
    ],
    nonConformitiesByType: [
      { type: "Majeures", count: 5 },
      { type: "Mineures", count: 12 },
      { type: "Observations", count: 8 },
    ],
  });

  // In a real application, this would fetch data from an API
  useEffect(() => {
    // Simulate API call
    console.log("Fetching dashboard data...");
  }, []);

  // Function to render a simple bar chart
  const renderBarChart = (data, title, color = "bg-blueGray-500") => {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="bg-white rounded shadow-md p-4 mb-4">
        <h5 className="text-lg font-semibold text-blueGray-700 mb-4">{title}</h5>
        <div className="h-64 flex items-end justify-between">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-1/6">
              <div 
                className={`${color} w-full rounded-t`} 
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              ></div>
              <div className="text-xs text-blueGray-600 mt-2">{item.month}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to render a simple pie chart
  const renderPieChart = (data, title) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500"];
    
    return (
      <div className="bg-white rounded shadow-md p-4 mb-4">
        <h5 className="text-lg font-semibold text-blueGray-700 mb-4">{title}</h5>
        <div className="flex flex-col">
          {data.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className={`${colors[index]} w-4 h-4 rounded-full mr-2`}></div>
              <div className="text-sm text-blueGray-700">{item.type}</div>
              <div className="ml-auto text-sm font-semibold text-blueGray-800">
                {Math.round((item.count / total) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="relative block py-24 lg:pt-0 bg-blueGray-800 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 mt-50">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold text-blueGray-800 mb-6">
                  Tableau de bord ISO 27001
                </h4>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded shadow-md p-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-500 bg-opacity-20">
                        <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-blueGray-600">Conformité globale</p>
                        <p className="text-2xl font-semibold text-blueGray-800">{complianceData.overallCompliance}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded shadow-md p-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-500 bg-opacity-20">
                        <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-blueGray-600">Audits récents</p>
                        <p className="text-2xl font-semibold text-blueGray-800">{complianceData.recentAudits.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded shadow-md p-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-red-500 bg-opacity-20">
                        <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-blueGray-600">Non-conformités ouvertes</p>
                        <p className="text-2xl font-semibold text-blueGray-800">{complianceData.openNonConformities.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded shadow-md p-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-yellow-500 bg-opacity-20">
                        <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-blueGray-600">Audits à venir</p>
                        <p className="text-2xl font-semibold text-blueGray-800">{complianceData.upcomingAudits.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  {renderBarChart(chartData.complianceTrend, "Évolution de la conformité", "bg-blue-500")}
                  {renderPieChart(chartData.nonConformitiesByType, "Répartition des non-conformités")}
                </div>

                {/* Controls Compliance */}
                <div className="bg-white rounded shadow-md p-4 mb-6">
                  <h5 className="text-lg font-semibold text-blueGray-700 mb-4">
                    Conformité par contrôle
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                            Contrôle
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                            Niveau de conformité
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {complianceData.controlsCompliance.map((control) => (
                          <tr key={control.id} className="border-t border-blueGray-200">
                            <td className="py-3 px-4 text-sm text-blueGray-700">
                              {control.id} - {control.name}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <div className="w-full bg-blueGray-200 rounded-full h-2.5">
                                <div 
                                  className={`h-2.5 rounded-full ${
                                    control.compliance >= 80 ? 'bg-green-500' : 
                                    control.compliance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${control.compliance}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-blueGray-600 ml-2">{control.compliance}%</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Audits and Non-Conformities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white rounded shadow-md p-4">
                    <h5 className="text-lg font-semibold text-blueGray-700 mb-4">
                      Audits récents
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                              Nom
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                              Résultats
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {complianceData.recentAudits.map((audit) => (
                            <tr key={audit.id} className="border-t border-blueGray-200">
                              <td className="py-3 px-4 text-sm text-blueGray-700">
                                {audit.name}
                              </td>
                              <td className="py-3 px-4 text-sm text-blueGray-700">
                                {audit.date}
                              </td>
                              <td className="py-3 px-4 text-sm">
                                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                  {audit.findings} constatations
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white rounded shadow-md p-4">
                    <h5 className="text-lg font-semibold text-blueGray-700 mb-4">
                      Non-conformités ouvertes
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                              Titre
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                              Sévérité
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">
                              Date limite
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {complianceData.openNonConformities.map((nc) => (
                            <tr key={nc.id} className="border-t border-blueGray-200">
                              <td className="py-3 px-4 text-sm text-blueGray-700">
                                {nc.title}
                              </td>
                              <td className="py-3 px-4 text-sm">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  nc.severity === 'major' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {nc.severity === 'major' ? 'Majeure' : 'Mineure'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm text-blueGray-700">
                                {nc.dueDate}
                              </td>
                            </tr>
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
      </div>
    </section>
  );
} 
