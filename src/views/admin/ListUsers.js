import React from "react";

// components

import TableUsers from '../../components/Users/TableUsers';

export default function ListUsers () {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <TableUsers />
        </div>
        
      </div>
    </>
  );
}
