import React, { useState, useEffect } from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import Notification from "components/NotificationAction/Notification"; // importer le panneau
import { IoNotificationsSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import "../../assets/styles/animation.css";

export default function Navbar() {
  const [selectedAuditType, setSelectedAuditType] = useState("reglementaire");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // État pour afficher le panneau
  const [showPanel, setShowPanel] = useState(false);

  // État local simulé avec des logs d’actions (plus tard depuis le backend)
  const [logActions, setLogActions] = useState([]);
  useEffect(() => {
    setLogActions([
      {
        user: "Yosr",
        type: "Ajout d’audit",
        description: "Audit ISO 27001 planifié",
        timestamp: new Date(),
      },
      {
        user: "Admin",
        type: "Connexion",
        description: "Nouvelle connexion système",
        timestamp: new Date(),
      },
    ]);
  }, []);
  console.log("Nombre de notifications :", logActions.length);

  // Simulation de chargement dynamique depuis un backend (à activer si tu connectes au backend)
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/logs") // Backend à adapter
  //     .then(res => res.json())
  //     .then(data => setLogActions(data))
  //     .catch(err => console.error("Erreur chargement logs:", err));
  // }, []);

  return (
    <>
      {/* Navbar */}
      <nav className=" flex items-center space-x-4 absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="flex items-center justify-end w-full space-x-4">
          {/* Search Input */}
          {/* <div className="relative">
    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blueGray-300">
      <i className="fas fa-search"></i>
    </span>
    <input
      type="text"
      placeholder="Search here..."
      className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow pl-10 w-64"
    />
  </div> */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isMounted ? 1 : 0, x: isMounted ? 0 : -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative"
          >
            <select
              value={selectedAuditType}
              onChange={(e) => setSelectedAuditType(e.target.value)}
              className="border-0 px-3 py-2 rounded-lg text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blueGray-800 text-white transition-all duration-300 hover:bg-blueGray-700"
            >
              <option value="reglementaire">Audit Réglementaire</option>
              <option value="interne">Audit Interne</option>
            </select>
          </motion.div>

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => setShowPanel(!showPanel)}
              className="relative  p-2 rounded-full hover:bg-blueGray-100 ml-6 focus:outline-none items-center"
            >
              <IoNotificationsSharp className="text-3xl text-black hover:text-black ml-6 items-center" />
              {logActions.length > 0 && (
                <span
                  className="absolute -top-0 -right-0 -mt-1 -mr-1 bg-red-600 text-
      white  flex items-center 
      justify-center rounded-full border-2 border-white shadow
      absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3
                 bg-red-600 text-white text-[8px] font-bold w-5 h-5 
                 flex items-center justify-center 
                 rounded-full border-2 border-white shadow"
                >
                  {logActions.length > 9 ? "9+" : logActions.length}
                </span>
              )}
            </button>
            <Notification
              count={logActions.length}
              visible={showPanel}
              onClose={() => setShowPanel(false)}
              actions={logActions}
            />
          </div>

          {/* User Dropdown */}
          <div className="hidden md:block">
            <UserDropdown />
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
