import React, { useState } from "react";

export default function FormAddAudit() {
  const [auditData, setAuditData] = useState({
    auditName: "",
    auditType: "internal", // internal, external, certification
    auditDate: "",
    auditor: "",
    department: "",
    scope: "",
    description: "",
    checklist: [],
    status: "planned", // planned, in-progress, completed, cancelled
    priority: "medium", // low, medium, high
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuditData({
      ...auditData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Audit data submitted:", auditData);
    // Reset form or redirect to audit details page
  };

  return (
    <>
      <section className="relative block py-24 lg:pt-0 bg-white mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-8/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-50">
                <div className="flex-auto p-5 lg:p-10">
                  <h4 className="text-2xl font-semibold text-blueGray-800 text-center">
                    Créer un nouvel audit ISO 27001
                  </h4>
                  <p className="leading-relaxed mt-1 mb-4 text-blueGray-500 text-center">
                    Remplissez ce formulaire pour planifier un nouvel audit de conformité ISO 27001.
                  </p>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="auditName"
                        >
                          Nom de l'audit
                        </label>
                        <input
                          type="text"
                          id="auditName"
                          name="auditName"
                          value={auditData.auditName}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Ex: Audit de conformité Q1 2023"
                          required
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="auditType"
                        >
                          Type d'audit
                        </label>
                        <select
                          id="auditType"
                          name="auditType"
                          value={auditData.auditType}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          required
                        >
                          <option value="internal">Interne</option>
                          <option value="external">Externe</option>
                          <option value="certification">Certification</option>
                        </select>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="auditDate"
                        >
                          Date de l'audit
                        </label>
                        <input
                          type="date"
                          id="auditDate"
                          name="auditDate"
                          value={auditData.auditDate}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          required
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="auditor"
                        >
                          Auditeur
                        </label>
                        <input
                          type="text"
                          id="auditor"
                          name="auditor"
                          value={auditData.auditor}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Nom de l'auditeur"
                          required
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="department"
                        >
                          Département
                        </label>
                        <input
                          type="text"
                          id="department"
                          name="department"
                          value={auditData.department}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Département audité"
                          required
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="priority"
                        >
                          Priorité
                        </label>
                        <select
                          id="priority"
                          name="priority"
                          value={auditData.priority}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          required
                        >
                          <option value="low">Basse</option>
                          <option value="medium">Moyenne</option>
                          <option value="high">Haute</option>
                        </select>
                      </div>
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="scope"
                      >
                        Périmètre de l'audit
                      </label>
                      <input
                        type="text"
                        id="scope"
                        name="scope"
                        value={auditData.scope}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Ex: Systèmes d'information, Processus RH, etc."
                        required
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="description"
                      >
                        Description détaillée
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={auditData.description}
                        onChange={handleChange}
                        rows="4"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Décrivez l'objectif et le contexte de cet audit..."
                        required
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-emerald-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Créer l'audit
                      </button>
                      <button
                        className="bg-blueGray-200 text-blueGray-800 active:bg-blueGray-100 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setAuditData({
                          auditName: "",
                          auditType: "internal",
                          auditDate: "",
                          auditor: "",
                          department: "",
                          scope: "",
                          description: "",
                          checklist: [],
                          status: "planned",
                          priority: "medium",
                        })}
                      >
                        Réinitialiser
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

      
    
  





