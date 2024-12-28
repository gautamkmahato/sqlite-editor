'use client'

import { Table, FileEdit, MoreVertical, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TableCard({ tableName, totalData, lastUpdated, setSelectedTable, selectedDb, handleDeleteTable }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDelete = (selectedDb, tableName) =>{
    handleDeleteTable(selectedDb, tableName)
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-sm relative">
      {/* Table Info */}
      <div className="flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-full">
          <Table className="text-green-500" size={28} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{tableName}</h2>
          <p className="text-sm text-gray-500">Entries: {totalData}</p>
        </div>
      </div>

      {/* Last Updated & Buttons */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Last Updated: {lastUpdated}</p>
        <Link href="/sample">
            <button
            className="flex text-sm items-center gap-2 bg-black text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
            >
            <span>Editor</span>
            <ArrowRight size={14} />
            </button>
        </Link>
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
                onClick={() => {
                    console.log("Check Schema");
                    setSelectedTable(tableName)
                }}
              >
                Check Schema
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                    console.log("Delete Table");
                    handleDelete(selectedDb, tableName);
                }}
              >
                Delete Table
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => console.log("Update Table")}
              >
                Update Table
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => console.log("Settings")}
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
