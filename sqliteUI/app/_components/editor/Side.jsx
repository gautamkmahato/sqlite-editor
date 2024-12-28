'use client';

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, MoreVertical, Database, Table } from "lucide-react";
import deleteTable from "../../actions/deleteTable";
import Link from "next/link";

export default function Side({ data, getOpendDatabaseName, onAction }) {
  const [openDatabases, setOpenDatabases] = useState({}); // Track open databases
  const [databaseList, setDatabaseList] = useState(data); // State to hold databases and tables
  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is open

  const toggleDatabase = (dbName) => {
    getOpendDatabaseName(dbName); 
    setOpenDatabases((prev) => ({
      ...prev,
      [dbName]: !prev[dbName],
    }));
  };

  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key)); // Toggle specific dropdown
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleDeleteTable = async (dbName, tableName) => {
    const result = await deleteTable(dbName, tableName);
    console.log(result);
    if (result.status) {
      setDatabaseList((prev) =>
        prev.map((db) =>
          db.database.split(".")[0] === dbName
            ? {
                ...db,
                tables: db.tables.filter((table) => table.name !== tableName),
              }
            : db
        )
      );
    } else {
      console.log("Unable to delete");
    }
  };

  useEffect(() => {
    if (data) {
      setDatabaseList(data);
    }
  }, [data]);

  return (
    <div className="w-64 h-screen bg-gray-100 border-r p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Databases</h2>
      <div className="space-y-4">
        {databaseList.map((db) => (
          <div key={db.database}>
            {/* Database Header */}
            <div
              className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-200"
              onClick={() => toggleDatabase(db.database)}
            >
              <div className="flex items-center space-x-2">
                <Database className="text-gray-700" size={18} />
                <span className="font-medium text-gray-700">{db.database.split(".")[0]}</span>
              </div>
              {openDatabases[db.database] ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </div>

            {/* Tables */}
            {openDatabases[db.database] && (
              <div className="ml-4 mt-2 space-y-2">
                {db.tables.length > 0 ? (
                  db.tables.map((table) => {
                    const dropdownKey = `${db.database}-${table.name}`;
                    return (
                      <div
                        key={table.name}
                        className="flex items-center justify-between text-sm text-gray-600 px-3 py-1 hover:bg-gray-100 rounded-lg"
                      >
                        <Link href="https:www.google.com">
                          <div className="flex items-center space-x-2">
                            <Table className="text-gray-500" size={16} />
                            <span>{table.name}</span>
                          </div>
                        </Link>

                        <div className="relative">
                          {/* Three-dot Button */}
                          <MoreVertical
                            size={18}
                            className="cursor-pointer text-gray-500 hover:text-gray-700"
                            onClick={() => toggleDropdown(dropdownKey)}
                          />

                          {/* Dropdown Menu */}
                          {activeDropdown === dropdownKey && (
                            <div
                              className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border z-50"
                            >
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  console.log(`Design for ${table.name}`);
                                  onAction("Design", db.database.split(".")[0], table.name);
                                  closeDropdown();
                                }}
                              >
                                Design
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  console.log(`Editor window for ${table.name}`);
                                  onAction("Editor", db.database.split(".")[0], table.name);
                                  closeDropdown();
                                }}
                              >
                                Editor
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                                onClick={() => {
                                  console.log(`All Data for ${table.name}`);
                                  onAction("AllData", db.database.split(".")[0], table.name);
                                  closeDropdown();
                                }}
                              >
                                All Data
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                                onClick={() => {
                                  handleDeleteTable(db.database.split(".")[0], table.name);
                                  closeDropdown();
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No tables available</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
