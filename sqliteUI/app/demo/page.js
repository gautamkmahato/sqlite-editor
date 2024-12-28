'use client'

import { memo, useState } from "react"
import MainSection from '../_components/editor/MainSection'


export function Parent(){
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [keysArray, setKeysArray] = useState([]); 
    

    const handleClick = (name) =>{
        console.log(name)
    }

    const handleExecuteQuery = async (query) => {
        // In a real app, this would send the query to a backend
        console.log("queryyyyyyyyyyyyyy");
        console.log(query);
        const data = {
          query: query
        }
        const response = await fetch(`http://localhost:8000/api/database/gkm/tables/demo/execute`, {
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
        //setMessage(result.message);
        console.log(result.message)
        
    };

    return(
        <>
            <h1>Parent</h1>
            <Child query={query} setQuery={setQuery} handleExecuteQuery={handleExecuteQuery} />
            <p>===================</p>
            <Tables results={results} keysArray={keysArray} />
        </>
    )
}

export function Child({query, setQuery, handleExecuteQuery}){
    //const [query, setQuery] = useState('');
    const handle = () =>{
        console.log("queryyyyyyyyyyyyyy");
        console.log(query)
        handleExecuteQuery(query)
    }
    return(
        <>
            <h1>Child</h1>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handle}>click</button>
        </>
    )
}

export const Tables = memo(function Tables({ results, keysArray }) {
    if (!results.length) return null;
    console.log("Tables rendered");
    
    return (
      <div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {keysArray.map((value, index) => (
                  <th key={index} className="px-4 py-2 text-left">{value}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.username}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">{row.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  });


export default function page() {
  return (
    <>
        <MainSection />
    </>
  )
}
