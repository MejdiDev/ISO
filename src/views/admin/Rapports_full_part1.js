import React, { useState, useRef } from "react";
import { FaFilePdf, FaFileCsv, FaEdit } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import GrapheAudit from "components/Cards/GrapheAudit";
import { useReactToPrint } from 'react-to-print'; // For advanced print

/**
 * Function to generate automatic conclusion based on checklist and non-conformities.
 * This function can be adapted to use backend data or business rules.
 * @param {Object} param0
 * @param {Array} param0.checklistItems - List of checklist items with status.
 * @param {Array} param0.nonConformities - List of non-conformities.
 * @returns {string} - Conclusion message.
 */
const generateConclusion = ({ checklistItems, nonConformities }) => {
  const conformes = checklistItems.filter(i => i.status === 'compliant').length;
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

// Mapping status codes to French labels for display
const statusLabels = {
  compliant: "Conforme",
  "non-compliant": "Non conforme",
  pending: "En attente",
};
