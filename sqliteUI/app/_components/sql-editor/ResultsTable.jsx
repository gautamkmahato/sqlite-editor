// components/sql-editor/ResultsTable.js

import React from "react";

const ResultsTable = React.memo(({ results, keysArray }) => {
  if (!results.length) return null;
  console.log(results)
  
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {keysArray.map((value, index) =>(
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
})

export default ResultsTable;