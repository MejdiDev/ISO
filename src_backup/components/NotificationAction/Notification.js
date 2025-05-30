import React from "react";

export default function Notification({ visible, onClose, actions }) {
  return (
    // 👇 Ce div contrôle l'ouverture/fermeture avec translate-x
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
        visible ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ transform: visible ? "translateX(0)" : "translateX(100%)" }} // Sécurité : double contrôle
    >
      {/* Barre du haut */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-blueGray-700">Notifications</h2>
        <button
          onClick={() => {
            console.log("Fermer le panneau");
            onClose();
          }}
          className="text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Liste des notifications */}
      <div className="p-4 overflow-y-auto h-[90%] space-y-4">
        {actions.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucune action pour le moment.</p>
        ) : (
          actions.map((action, index) => (
            <div
              key={index}
              className="bg-blueGray-50 p-3 rounded shadow hover:bg-blueGray-100 transition"
            >
              <p className="text-sm font-semibold">
                {action.user} a effectué une action :{" "}
                <span className="text-blue-600">{action.type}</span>
              </p>
              <p className="text-xs text-gray-600">{action.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(action.timestamp).toLocaleString("fr-FR")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
