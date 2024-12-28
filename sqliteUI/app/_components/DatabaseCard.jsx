'use client';

import { Database, Table, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function DatabaseCard({
  name,
  tableCount,
  lastUpdated,
  selectedDb,
  handleDeleteDatabase,
  ...props
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = (event) => {
    event.stopPropagation(); // Prevent parent click handler
    setDropdownOpen(!dropdownOpen);
  };

  const handleDelete = (selectedDb) => {
    handleDeleteDatabase(selectedDb);
  };

  return (
    <div
      {...props}
      className="p-4 bg-white shadow-md rounded-lg max-w-sm cursor-pointer relative"
      onClick={props.onClick} // Ensure card click only triggers when not interacting with dropdown
    >
      {/* Database Info */}
      <div className="flex items-center gap-3">
        <div className="bg-red-100 p-2 rounded-full">
          <Database className="text-red-500" size={28} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">Size: {tableCount} MB</p>
        </div>
      </div>

      {/* Last Updated & Buttons */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Tables Count: {tableCount}</p>
          <p className="text-sm text-gray-500">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Dropdown Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleDropdownToggle}
          className="p-1 rounded-full hover:bg-gray-100 transition"
        >
          <MoreVertical size={18} />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-10">
            <ul className="text-sm text-gray-700">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent parent click handler
                  console.log("Delete database");
                  handleDelete(selectedDb);
                }}
              >
                Delete Table
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent parent click handler
                  console.log("Update Table");
                }}
              >
                Update Table
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent parent click handler
                  console.log("Settings");
                }}
              >
                Settings
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
