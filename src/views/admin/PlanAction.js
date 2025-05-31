import React from "react";

// components

import PlanActionTable from "components/Cards/PlanActionTable.js";

export default function PlanAction() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <PlanActionTable />
        </div>
      </div>
    </>
  );
}
