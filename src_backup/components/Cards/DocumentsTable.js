import React, { useEffect, useState } from "react";
import { FaFilePdf, FaDownload, FaTrash } from "react-icons/fa";

export default function DocumentsTable() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/documents")
      .then((res) => res.json())
      .then(setDocuments)
      .catch(console.error);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer ce document ?")) return;

    fetch(`http://localhost:5000/api/documents/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setDocuments((prev) => prev.filter((doc) => doc._id !== id));
        }
      })
      .catch(console.error);
  };

  const formatSize = (bytes) => {
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleString("fr-FR");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blueGray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">Fichier</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">Taille</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blueGray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.map((doc) => (
            <tr key={doc._id}>
              <td className="px-6 py-4 flex items-center gap-2 text-blueGray-700">
                <FaFilePdf className="text-red-500" />
                {doc.originalname}
              </td>
              <td className="px-6 py-4">{formatSize(doc.size)}</td>
              <td className="px-6 py-4">{formatDate(doc.uploadDate)}</td>
              <td className="px-6 py-4 flex space-x-4">
                <a
                  href={`http://localhost:5000/api/documents/${doc._id}/download`}
                  className="text-blue-600 hover:text-blue-800"
                  download
                >
                  <FaDownload />
                </a>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
