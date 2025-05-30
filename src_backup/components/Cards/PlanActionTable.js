import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const getStatusColor = (status) => {
  switch (status) {
    case "TerminÃ©": return "bg-emerald-200 text-emerald-700";
    case "En cours": return "bg-orange-200 text-orange-700";
    case "Ã€ faire": return "bg-red-200 text-red-700";
    default: return "bg-gray-200 text-gray-700";
  }
};

export default function PlanActionTable() {
  const [actions, setActions] = useState([]);
  const [form, setForm] = useState({
    action: "",
    responsible: "",
    plannedDate: "",
    status: "Ã€ faire",
  });

  // Charger depuis lâ€™API
  useEffect(() => {
    fetch("http://localhost:5000/api/actions")
      .then(res => res.json())
      .then(data => setActions(data))
      .catch(err => console.error("Erreur de chargement :", err));
  }, []);

  // Ajouter une action
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then((data) => {
        setActions([...actions, data]);
        setForm({ action: "", responsible: "", plannedDate: "", status: "Ã€ faire" });
      })
      .catch(err => console.error("Erreur d'ajout :", err));
  };

  // Supprimer
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette action ?")) {
      fetch(`http://localhost:5000/api/actions/${id}`, {
        method: "DELETE"
      })
        .then(() => setActions(actions.filter(a => a._id !== id)))
        .catch(err => console.error("Erreur suppression :", err));
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="rounded-t px-4 py-3 border-0 bg-white">
        <h3 className="font-semibold text-lg text-blueGray-700">âœ… Plan d'action</h3>
      </div>

      {/* FORMULAIRE */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-b bg-gray-50 grid grid-cols-1 md:grid-cols-5 gap-4">
        <input type="text" placeholder="Action Ã  faire" required
          className="px-3 py-2 border rounded"
          value={form.action}
          onChange={(e) => setForm({ ...form, action: e.target.value })}
        />
        <input type="text" placeholder="Responsable" required
          className="px-3 py-2 border rounded"
          value={form.responsible}
          onChange={(e) => setForm({ ...form, responsible: e.target.value })}
        />
        <input type="date" required
          className="px-3 py-2 border rounded"
          value={form.plannedDate}
          onChange={(e) => setForm({ ...form, plannedDate: e.target.value })}
        />
        <select
          className="px-3 py-2 border rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Ã€ faire">Ã€ faire</option>
          <option value="En cours">En cours</option>
          <option value="TerminÃ©">TerminÃ©</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          âž• Ajouter
        </button>
      </form>

      {/* TABLEAU */}
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 uppercase">ACTION</th>
              <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 uppercase">RESPONSABLE</th>
              <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 uppercase">DATE</th>
              <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 uppercase">STATUT</th>
              <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 uppercase">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((action) => (
              <tr key={action._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{action.action}</td>
                <td className="px-6 py-4 text-sm">{action.responsible}</td>
                <td className="px-6 py-4 text-sm">{action.plannedDate?.substring(0, 10)}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(action.status)}`}>
                    {action.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button className="text-indigo-500 hover:text-indigo-700"><FaEdit /></button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(action._id)}><RiDeleteBin5Fill /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
