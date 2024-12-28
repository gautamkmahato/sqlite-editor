'use client'

import { act, useEffect, useState } from 'react';
import Side from '../_components/editor/Side'
import fetchDatabaseWithTables from '../actions/fetchDatabaseWithTables';
import Editor from '../_components/Editor';
import TableMetaData from '../_components/TableMetaData';
import AllData from '../_components/AllData';

// Example Usage
export default function Home() {

  const [databaseData, setDatabaseData] = useState([]);
  const [activeComponent, setActiveComponent] = useState('');
  const [selectedTable, setSelectedTable] = useState({dbName: '', tableName: ''});
  const [opendDatabaseName, setOpendDatabaseName] = useState('');

  useEffect(() => {
    async function getDatabase() { 
        const result = await fetchDatabaseWithTables();
        console.log(result);
        // Map the result to match Sidebar's expected data structure
        const formattedData = result.map((db) => ({
            database: db.database,
            tables: db.tables.map((table) => ({
              name: table.name,
            })),
        }));
        console.log(formattedData); // Log to verify transformation
        setDatabaseData(formattedData);
    }
    getDatabase();
  }, []);

  const handleAction = (action, dbName, tableName) =>{
    console.log(action, dbName, tableName)
    setSelectedTable({ 
      dbName: dbName,
      tableName: tableName
    });
    if(action === 'Design'){
      setActiveComponent('TableMetaData')
    } if(action === 'Editor'){ 
      setActiveComponent('Editor')
    } if(action === 'AllData'){
      setActiveComponent('AllData')
    }
  }

  const getOpendDatabaseName = (dbName) =>{
    console.log(dbName);
    setOpendDatabaseName(dbName.split('.')[0]);
  }

  if (!databaseData.length) {
    return <p className="text-gray-500 p-4">Loading databases...</p>;
  }

  return(
    <>
      <div className="flex h-screen bg-gray-50">
      {/* Sidebar Section */}
      <div className="w-64 bg-gray-100 border-r"> 
        <Side data={databaseData} getOpendDatabaseName={getOpendDatabaseName} onAction={handleAction} />
      </div>

      {/* Main Section */}
      
      {activeComponent === 'TableMetaData' && (<TableMetaData opendDatabaseName={opendDatabaseName} selectedTable={selectedTable} />)}
      {activeComponent === 'Editor' && (<Editor dbName={selectedTable.dbName} tableName={selectedTable.tableName} />)}
      {activeComponent === 'AllData' && (<AllData dbName={selectedTable.dbName} tableName={selectedTable.tableName} />)}
      {!activeComponent && <p>No section selected</p>}
    </div>
    </>
  )
}
