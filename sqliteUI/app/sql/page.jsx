'use client'

import { useState, useEffect } from 'react';
import CreateTableModal from '../_components/sql-editor/CreateTableModal'
import fetchDatabases from '../actions/fetchDatabases';
import fetchTables from '../actions/fetchTables';
import createDatabase from '../actions/createDatabase';
import createTable from '../actions/createTable';
import fetchTableData from '../actions/fetchTableData';
import Link from 'next/link';
import DatabaseCard from '../_components/DatabaseCard';
import TableCard from '../_components/TableCard'
import { FileEdit } from 'lucide-react';
import deleteTable from '../actions/deleteTable';
import deleteDatabase from '../actions/deleteDatabase';
import FilePickerModal from '../_components/FilePickerModal';
import ConnectDatabaseCard from '../_components/ConnectDatabaseCard';


const DatabaseManager = () => {
    const [databases, setDatabases] = useState([]);
    const [selectedDb, setSelectedDb] = useState(null);
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [newDbName, setNewDbName] = useState('');
    const [showCreateTable, setShowCreateTable] = useState(false);
    const [newTableCreated, setNewTableCreated] = useState(false);
    const [error, setError] = useState(null);
    const [tableLength, setTableLength] = useState('');
    const [selectedFolder, setSelectedFolder] = useState('');
    const [newTableData, setNewTableData] = useState({
        name: '',
        columns: [{ name: '', type: 'TEXT', primaryKey: false, notNull: false }]
    }); 

    // In your Sidebar.js
    const [isCreateTableModalOpen, setIsCreateTableModalOpen] = useState(false);
    const [isSelectedFolderModalOpen, setIsSelectedFolderModalOpen] = useState(false);

    useEffect(() => {
        async function getDatabase() {
            console.log("inside the database useEffect")
            // const result = await fetchDatabases();
            // setDatabases(result); 
        }
        getDatabase();
    }, [selectedFolder]);

    useEffect(() => {
        async function getTables() {
            if (selectedDb) {
                const result = await fetchTables(selectedDb);
                console.log(result);
                setTables(result);
                setTableLength(result.length)
            }
        }
        getTables(); 
    }, [selectedDb, newTableCreated]);

    useEffect(() => {
        console.log("selectedDb, selectedTable")
        async function getTableMetaData() {
            if (selectedDb && selectedTable) {
                console.log("selectedDb, selectedTable", selectedDb, selectedTable)
                const result = await fetchTableData(selectedDb, selectedTable);
                setTableData(result);
            }
        }
        getTableMetaData();
    }, [selectedDb, selectedTable]); 

    const handleCreateDatabase = async () => {
        try {
            const result = await createDatabase(newDbName); // Call the server action

            if (result.success) {
                setNewDbName(''); // Clear the input field
                setError(null);
                // Refresh the database list
                const updatedDatabases = await fetchDatabases();
                setDatabases(updatedDatabases);
            } else {
                setError(result.error || 'Failed to create database');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        }
    };

    const handleDeleteTable = async (dbName, tableName) => {
        const result = await deleteTable(dbName, tableName); 
        console.log(result);
        console.log("databases", databases)
        if (result.status) {
            const newTables = tables.filter((table) => table !== tableName);
            setTables(newTables);
        } else {
          console.log("Unable to delete");
        }
    };

    const handleDeleteDatabase = async (dbName) => {
        console.log("inside page ", dbName)
        const result = await deleteDatabase(dbName); 
        console.log(result);
        console.log("databases", databases)
        if (result.status) {
            console.log("Deleted sucessfully...");
            // Refresh the database list
            const updatedDatabases = await fetchDatabases();
            setDatabases(updatedDatabases);
        } else {
          console.log("Unable to delete");
        }
    };

    const handleSelectedFolder = async (folderName, result=[]) =>{
        console.log("folderName ", folderName)
        setSelectedFolder(folderName);
        setDatabases(result);
        setTables([]);
        setTableData([]);
        setSelectedDb(null);
        setIsSelectedFolderModalOpen(false);
    }

    // if(databases.length === 0){
    //     return(
    //         <div>Loading Databases...</div>
    //     )
    // }

    const handleOpenModal = (value) =>{
        console.log("clickedddd")
        setIsSelectedFolderModalOpen(value)
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Create Database Section */}
            {(databases && databases.length > 0)? <div className="mb-8 p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Create Database</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newDbName}
                        onChange={(e) => setNewDbName(e.target.value)}
                        placeholder="Database name"
                        className="flex-1 p-2 border rounded"
                    />
                    <button
                        onClick={handleCreateDatabase}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-blue-600"
                    >
                        Create
                    </button>
                </div>
            </div> : <></>}

            {(databases && databases.length <= 0) ? 
                <ConnectDatabaseCard handleOpenModal={handleOpenModal} />
            : <></>}

            <FilePickerModal 
                isOpen={isSelectedFolderModalOpen}
                onClose={
                    () => {
                        setIsSelectedFolderModalOpen(false);
                        setError(null);
                    }
                }
                handleSelectedFolder={handleSelectedFolder} 
            />

            {/* Database */}
            {databases && databases.length > 0 ? <div className="bg-white">
                {/* Database List */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Databases</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {databases.map((db, index) => (
                            <li key={index}> 
                                <DatabaseCard
                                    onClick={() => setSelectedDb(db.database.split('.')[0])}
                                    name={db.database.split('.')[0]}
                                    tableCount={db.tables.length}
                                    lastUpdated="24-12-2024"
                                    selectedDb={(db.database.split('.')[0])}
                                    handleDeleteDatabase={handleDeleteDatabase}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div> : <></>}
            
            <div>
                {/* Tables Section */}
                {selectedDb && (
                    <div className="mt-10">
                        <div className="bg-white p-4 rounded-lg shadow mb-6">
                            <div className="flex justify-between items-center border p-4 bg-white">
                                <div>
                                    <h2 className="text-xl font-semibold">Tables in {selectedDb}</h2>
                                    <p>Tables: {selectedDb.length}</p>
                                </div>
                                <div className="w-64 p-4">
                                    {/* ... existing sidebar content ... */}
                                    <button
                                        onClick={() => setIsCreateTableModalOpen(true)}
                                        className="flex gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                                    >
                                        <span className='py-1'><FileEdit size={14} /></span>
                                        <span>Create Table</span>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-5">
                                {tables.map((table, index) => (
                                    
                                    <TableCard
                                        key={index} 
                                        tableName={table}
                                        totalData="12"
                                        lastUpdated="2024-12-24 15:30"
                                        setSelectedTable={setSelectedTable}
                                        selectedDb={selectedDb}
                                        handleDeleteTable={handleDeleteTable}
                                    />
                                    
                                ))}
                            </div>
                        </div>

                        {/* Table Data */}
                        {selectedTable && tableData?.length > 0 && (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-4">Data in {selectedTable}</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                {Object.keys(tableData[0]).map(column => (
                                                    <th key={column} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        {column}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((row, i) => (
                                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    {Object.values(row).map((value, j) => (
                                                        <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {value?.toString() || ''}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <CreateTableModal
                isOpen={isCreateTableModalOpen}
                onClose={
                    () => {
                        setIsCreateTableModalOpen(false);
                        setError(null);
                        fetchTables(selectedDb); // Refresh tables
                        setNewTableCreated(!newTableCreated)
                    }
                }
                selectedDb={selectedDb}
            /> 


        </div>
    );
};

export default DatabaseManager;