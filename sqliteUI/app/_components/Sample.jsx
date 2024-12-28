// 'use client'

// // components/sql-editor/Sidebar.js
// import React, { useState } from 'react';
// import { Database, ChevronDown, ChevronRight, Table2, MoreVertical } from 'lucide-react';
// import deleteTable from '../../actions/deleteTable';

// const DropdownMenu = React.memo(({ items, isOpen, onClose, dbName, tableName }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
//       <div className="py-1">
//         {items.map((item, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               item.onClick(dbName, tableName);
//               onClose();
//             }}
//             className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             {item.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// })

// const Sidebar = React.memo(({ databases }) => { 
//   const [expandedDbs, setExpandedDbs] = useState(
//     Object.keys(databases).reduce((acc, key) => ({ ...acc, [key]: true }), {})
//   );
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const [tables, setTables] = useState([]);

//   const toggleDatabase = (dbName) => {
//     setExpandedDbs(prev => ({
//       ...prev,
//       [dbName]: !prev[dbName]
//     }));
//   };

//   const handleDropdownClick = (e, id) => {
//     e.stopPropagation();
//     setActiveDropdown(activeDropdown === id ? null : id);
//   };

//   const dbActions = [
//     { label: 'Create New Table', onClick: () => console.log('Create table') },
//     { label: 'Settings', onClick: () => console.log('Settings') },
//     { label: 'Delete', onClick: () => console.log('Delete') }
//   ];

//   const createTableActions = () => [
//     { 
//       label: 'Schema Design', 
//       onClick: (db, table) => console.log('Schema Design', db, table) 
//     },
//     { 
//       label: 'Settings', 
//       onClick: (db, table) => console.log('Settings', db, table) 
//     },
//     { 
//       label: 'Delete', 
//       onClick: async (db, table) => {
//         console.log('Delete', db, table);
//         const result = await deleteTable(db, table);
//         console.log(result)
//       } 
//     }
//   ];

//   console.log(databases) 

//   return (
//     <div className="w-64 border-r bg-white p-4">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search databases..."
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {Object.entries(databases).map(([dbName, tables]) => (
//         <div key={dbName} className="mb-4">
//           <div 
//             className="flex items-center space-x-2 mb-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer relative"
//             onClick={() => toggleDatabase(dbName)}
//           >
//             <div className="flex items-center space-x-2 flex-1">
//               <Database className="w-4 h-4" />      {/* This is an database icon */}
//               <span className="font-medium">
//                 {/* Display the database name */}
//                 {dbName}
//               </span>
//               {/* If database is opened down arrow, else rigth arrow */}
//               {expandedDbs[dbName] ? (
//                 <ChevronDown className="w-4 h-4" />
//               ) : (
//                 <ChevronRight className="w-4 h-4" />
//               )}
//             </div>
//             <div className="relative">
//               <button
//                 onClick={(e) => handleDropdownClick(e, `db-${dbName}`)}
//                 className="p-1 hover:bg-gray-200 rounded-full"
//               >
//                 <MoreVertical className="w-4 h-4" />
//               </button>
//               <DropdownMenu
//                 items={dbActions}
//                 isOpen={activeDropdown === `db-${dbName}`}
//                 onClose={() => setActiveDropdown(null)}
//               />
//             </div>
//           </div>

//           {expandedDbs[dbName] && (
//             <div className="ml-6 space-y-1">
//               {tables.map((table, index) => (
//                 <div 
//                   key={index}
//                   className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-md cursor-pointer relative"
//                 >
//                   <div className="flex items-center space-x-2 flex-1">
//                     <Table2 className="w-4 h-4" />
//                     <span>{table.name}</span>
//                   </div>
//                   <div className="relative">
//                     <button
//                       onClick={(e) => handleDropdownClick(e, `table-${dbName}-${table.name}`)}
//                       className="p-1 hover:bg-gray-200 rounded-full"
//                     >
//                       <MoreVertical className="w-4 h-4" />
//                     </button>
//                     <DropdownMenu
//                       items={createTableActions()}
//                       isOpen={activeDropdown === `table-${dbName}-${table.name}`}
//                       onClose={() => setActiveDropdown(null)}
//                       dbName={dbName}
//                       tableName={table.name}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}

//       {/* {databases.map((database, index) =>(
//         <div key={index}>
//           {database}
//         </div>
//       ))} */}

//     </div>
//   );
// })

// export default Sidebar;