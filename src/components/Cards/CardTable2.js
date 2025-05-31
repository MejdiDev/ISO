import React from "react";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const CardTable2 = ({
  color = "light",
  title = "Table Title",
  columns = [],
  data = [],
  onRowClick,
  onEdit,
  onDelete,
  onDetails,
  loading = false,
  emptyMessage = "Aucune donnée disponible",
  loadingComponent = (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lightBlue-500"></div>
    </div>
  ),
  extraHeaderContent = null,
}) => {
  if (loading) {
    return loadingComponent;
  }

  if (!data || data.length === 0) {
    return (
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center justify-between px-4">
  <h3 className={
    "font-semibold text-lg " +
    (color === "light" ? "text-lightBlue-700" : "text-white")
  }>
    {title}
  </h3>
  </div>
  
</div>

        </div>
        <div className="block w-full overflow-x-auto">
          <div className="text-center p-4 text-lightBlue-500">{emptyMessage}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
        <div className="flex flex-wrap items-center justify-between px-4">
  <h3
    className={
      "font-semibold text-lg " +
      (color === "light" ? "text-lightBlue-700" : "text-white")
    }
  >
    {title}
  </h3>
  {extraHeaderContent && (
    <div className="text-right">
      {extraHeaderContent}
    </div>
  )}
</div>

        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-lightBlue-50 text-lightBlue-500 border-lightBlue-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={
                  "hover:bg-lightBlue-50 cursor-pointer " +
                  (color === "light" ? "text-lightBlue-600" : "text-white")
                }
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    {column.render ? column.render(row) : row[column.field]}
                  </td>
                ))}
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li>
                      <button
                        onClick={() => onDetails && onDetails(row)}
                        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xl uppercase font-bold"
                      >
                        <span className="lg:hidden inline-block ml-2">Détails</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onEdit && onEdit(row)}
                        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xl uppercase font-bold"
                      >
                        <FaEdit className="text-red text-lg leading-2xl" />
                        <span className="lg:hidden inline-block ml-2">Modifier</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onDelete && onDelete(row)}
                        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xl uppercase font-bold"
                      >
                        <RiDeleteBin5Fill className="text-lg leading-lg" style={{ color: 'black' }} />
                        <span className="lg:hidden inline-block ml-2">Supprimer</span>
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

CardTable2.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      field: PropTypes.string,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onDetails: PropTypes.func,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  loadingComponent: PropTypes.node,
  extraHeaderContent: PropTypes.node,

};

export default CardTable2;
