'use client'

// components/sql-editor/SQLEditor.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar';
import QueryArea from './QueryArea';
import ResultsTable from './ResultsTable';
import fetchDatabaseWithTables from '@/app/actions/fetchDatabaseWithTables';

const SQLEditor = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [keysArray, setKeysArray] = useState([]);
  const [message, setMessage] = useState('');
  const [databaseData, setDatabaseData] = useState([]);

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

  if (!databaseData.length) {
    return <p className="text-gray-500 p-4">Loading databases...</p>;
  }

  

  const handleExecuteQuery = async () => {
    // In a real app, this would send the query to a backend
    console.log(query);
    const data = {
      query: query.trim()
    }
    const response = await fetch('http://localhost:8000/api/database/gkm/tables/users/execute', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    // if (!response.ok) {
    //   setMessage(`HTTP error! Status: ${response.status}`);
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    const result = await response.json();

    if (result.data && result.data.length > 0) {
      const tableKeys = Object.keys(result.data[0]); // Extract table keys
      setKeysArray(tableKeys);
    } else {
      setKeysArray([]);
    }

    setResults(result.data || []);
    setMessage(result.message);
      console.log(result.message)
    
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar data={databaseData} />
        <div className="flex-1 p-6"> 
          <QueryArea  
            query={query} 
            setQuery={setQuery} 
            onExecute={handleExecuteQuery} 
          />
          {message ? <>{message}</> : <></>}
          <ResultsTable results={results} keysArray={keysArray} />
        </div>
      </div>
    </div>
  );
};

export default SQLEditor;