// src/views/admin/CréerAudit.js
import React, { useState } from "react";
console.log("🟡 Données reçues dans createAudit:", req.body);

export default function CréerAudit() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    auditor: "",
    department: "",
    priority: "",
    scope: "",
    description: "",
    status: "En cours" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Tentative de création d'audit :", formData);

    try {
      const response = await fetch("http://localhost:5000/api/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("📥 Réponse brute :", response);

      if (response.ok) {
        alert("✅ Audit créé avec succès !");
        handleReset();
      } else {
        const error = await response.json();
        alert("❌ Erreur : " + error.message);
      }
    } catch (err) {
      console.error("❌ Erreur de soumission :", err);
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
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Créer un nouvel audit ISO 27001</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nom de l'audit" required className="border px-3 py-2 rounded" />
        <input name="type" value={formData.type} onChange={handleChange} placeholder="Type d'audit" required className="border px-3 py-2 rounded" />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="border px-3 py-2 rounded" />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required className="border px-3 py-2 rounded" />
        <input name="auditor" value={formData.auditor} onChange={handleChange} placeholder="Auditeur" required className="border px-3 py-2 rounded" />
        <input name="department" value={formData.department} onChange={handleChange} placeholder="Département" required className="border px-3 py-2 rounded" />
        <input name="priority" value={formData.priority} onChange={handleChange} placeholder="Priorité (Faible, Moyenne, Élevée, Critique)" required className="border px-3 py-2 rounded" />
        <input name="scope" value={formData.scope} onChange={handleChange} placeholder="Périmètre de l'audit" required className="border px-3 py-2 rounded" />
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
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          CRÉER L'AUDIT
        </button>
        <button type="button" onClick={handleReset} className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500">
          RÉINITIALISER
        </button>
      </div>
    </form>
  );
}
