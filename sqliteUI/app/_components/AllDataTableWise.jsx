'use client'

import React, { useEffect, useState } from 'react'
import fetchDataTableWise from '../actions/fetchDataTableWise'

export default function AllDataTableWise({ dbName, tableName }) {
    console.log("inside")
    const [data, setData] = useState([]);
    const [keysArray, setKeysArray] = useState([]);

    useEffect(() => { 
        async function getData() {
            const result = fetchDataTableWise(dbName, tableName);
            setData(result.data);
            console.log(result)
            if (result && result.length > 0) {
                const tableKeys = Object.keys(result[0]); // Extract table keys
                setKeysArray(tableKeys);
            } else {
                setKeysArray([]);
            }
        }
        getData();
        
    }, [dbName, tableName])
    
    return (
        <>
            <h1>All Data</h1>
            <Tables results={data} keysArray={keysArray} />
        </>
    )
}
