// src/views/admin/CréerAudit.js
import React, { useState } from "react";
import { isNamespaceExportDeclaration } from "../../../node_modules/typescript/lib/typescript";

export default function CréerAudit() {
  const [formData, setFormData] = useState({
    isNamespaceExportDeclaration: "",
    type: "",
    startDate: "",
    endDate: "",
    auditor: "",
    department: "",
    priority: "",
    scope: "",
    description: "",
    status: "En cours",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Données soumises :", formData);

    try {
      const response = await fetch("http://localhost:5000/api/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Audit créé avec succès !");
        handleReset();
      } else {
        const error = await response.json();
        alert("❌ Erreur : " + error.message);
      }
    } catch (err) {
      console.error("❌ Erreur de requête :", err);
      alert("❌ Erreur de connexion au serveur.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      type: "",
      startDate: "",
      endDate: "",
      auditor: "",
      department: "",
      priority: "",
      scope: "",
      description: "",
      status: "En cours",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded shadow max-w-3xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Créer un nouvel audit ISO 27001
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom de l'audit"
          required
          className="border px-3 py-2 rounded"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Type d’audit --</option>
          <option value="Audit interne">Audit interne</option>
          <option value="Audit de certification">Audit de certification</option>
          <option value="Audit de surveillance">Audit de surveillance</option>
          <option value="Audit de tierce partie">Audit de tierce partie</option>
        </select>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />

        <input
          name="auditor"
          value={formData.auditor}
          onChange={handleChange}
          placeholder="Auditeur"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Département"
          required
          className="border px-3 py-2 rounded"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Priorité --</option>
          <option value="Faible">Faible</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Élevée">Élevée</option>
          <option value="Critique">Critique</option>
        </select>

        <input
          name="scope"
          value={formData.scope}
          onChange={handleChange}
          placeholder="Périmètre de l'audit"
          required
          className="border px-3 py-2 rounded"
        />
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description détaillée"
        required
        className="mt-4 w-full border px-3 py-2 rounded"
        rows={4}
      />

      <div className="flex mt-6 justify-end gap-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          CRÉER L'AUDIT
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
        >
          RÉINITIALISER
        </button>
      </div>
    </form>
  );
}
