import { useState } from 'react';
import QueryEditor from './QueryEditor';
import ResultTable from './ResultsTable';

export default function MainSection({ dbName, tableName }) {
    const [query, setQuery] = useState(''); 
    const [results, setResults] = useState([]);
    const [keysArray, setKeysArray] = useState([]);
    const [message, setMessage] = useState('');

    const handleExecuteQuery = async (query) => {
        // In a real app, this would send the query to a backend
        console.log(query);
        const data = {
          query: query
        }
        const response = await fetch(`http://localhost:8000/api/database/${dbName}/tables/${tableName}/execute`, {
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
 
    return(
        <>
            <QueryEditor query={query} setQuery={setQuery} handleExecuteQuery={handleExecuteQuery} />
            {message ? <>{message}</> : <></>}
            <ResultTable results={results} keysArray={keysArray} />
        </>
    )
}
