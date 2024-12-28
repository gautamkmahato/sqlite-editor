'use client'

import React, { useEffect, useState } from 'react'
import fetchTableData from '../actions/fetchTableData';

export default function TableMetaData({ opendDatabaseName, selectedTable }) {

    const [tableData, setTableData] = useState([]);

    useEffect(() => { 
        console.log("opendDatabaseName: ", opendDatabaseName)
        console.log("selectedTable: ", selectedTable)
        async function getTableMetaData() {
            if (selectedTable.dbName && selectedTable.tableName) {
                console.log("selectedDb, selectedTable", selectedTable.dbName, selectedTable.tableName)
                const result = await fetchTableData(selectedTable.dbName, selectedTable.tableName);
                setTableData(result);
                console.log(result)
            }
        }
        getTableMetaData();
    }, [selectedTable.dbName, selectedTable.tableName]);

    return (
        <>
            {/* Table Data */}
            {selectedTable.tableName && tableData?.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Data in {selectedTable.tableName}</h3>
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
        </>
    )
}
