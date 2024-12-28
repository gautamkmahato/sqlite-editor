'use client';

import React, { useEffect, useState } from 'react';
import fetchDataTableWise from '../actions/fetchDataTableWise';
import Tables from './editor/ResultsTable';
import { Trash2, Plus, Grid2x2Plus } from 'lucide-react';
import InsertDataModal from '../_components/InsertDataModal';
import fetchTableData from '../actions/fetchTableData';
import deleteDataFromTable from '../actions/deleteDataFromTable';
import UpdateDataModal from '../_components/UpdateDataModal';
import fetchDataFromTableById from '../actions/fetchDataFromTableById';

export default function AllData({ dbName, tableName }) {
    const [data, setData] = useState([]);
    const [keysArray, setKeysArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreateTableModalOpen, setIsCreateTableModalOpen] = useState(false);
    const [isUpdateTableModalOpen, setIsUpdateTableModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [keys, setKeys] = useState([]);
    const [length, setLength] = useState(0);
    const [deleteButton, setDeleteButton] = useState(false);
    const [updateButton, setUpdateButton] = useState(false);
    const [rowId, setRowId] = useState(null);
    const [rowData, setRowData] = useState('');

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const result = await fetchDataTableWise(dbName, tableName);
            setData(result.data);
            if (result && result.data.length > 0) {
                const tableKeys = Object.keys(result.data[0]); // Extract table keys
                setKeysArray(tableKeys);
            } else {
                setKeysArray([]);
            }
            setLoading(false);
        }

        async function getMetaData() {
            const result = await fetchTableData(dbName, tableName);
            const newKeys = result.map(row => row.name); // Map to column names
            setKeys(newKeys);
            console.log('MetaData: ', newKeys);
        }

        getData();
        getMetaData();
    }, [dbName, tableName, length]);

    const handleAddData = () => {
        if (keys.length === 0) {
            console.error('Keys array is empty. Ensure metadata is loaded.');
            return;
        }
        setIsCreateTableModalOpen(true);
        setError(null);
    };

    const handleLength = (length) =>{
        setLength(length);
    }

    const handleDeleteData = async () => {
        console.log('delete Data functionality implemented.');
        if(deleteButton){
            const result = await deleteDataFromTable(dbName, tableName, rowId);
            if(result.success){
                console.log("inside successsss")
                setLength(length+1);
                setDeleteButton(false);
                setUpdateButton(false);
            }
            console.log("handle Delete Data: ", result)
        }
    };

    const setState = (val, id) =>{
        console.log("id ",id)
        setDeleteButton(val);
        setUpdateButton(val);
        setRowId(id);
    }

    const handleUpdateData = async () =>{
        console.log("handle update function");
        if (keys.length === 0) {
            console.error('Keys array is empty. Ensure metadata is loaded.');
            return;
        }
        const result = await fetchDataFromTableById(dbName, tableName, rowId);
        console.log(result);
        setRowData(result);
        setIsUpdateTableModalOpen(true);
        setError(null);
    }

    const setUpdateState = (val, id) =>{
        console.log("id ",id)
        setUpdateButton(val);
        setRowId(id);
    }

    return (
        <div className="p-8">
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xl font-bold text-gray-800">Table: {tableName}</p>
                            <p className="mt-2">Rows: {data.length}</p>
                        </div>
                        <div className="flex space-x-4 px-8">
                            {deleteButton ? <button
                                className="flex gap-2 items-center px-2 py-2 bg-black text-white rounded hover:bg-blue-600 focus:outline-none"
                                onClick={handleDeleteData}
                            >
                                <Trash2 size={18} /> Delete Data
                            </button> : <></>}

                            {updateButton ? <button
                                className="flex gap-2 items-center px-4 py-2 bg-black text-white rounded hover:bg-blue-600 focus:outline-none"
                                onClick={handleUpdateData}
                            >
                                <Grid2x2Plus size={18} /> Update Data
                            </button> : <></>}

                            <button
                                className="flex gap-2 items-center px-4 py-2 bg-black text-white rounded hover:bg-green-600 focus:outline-none"
                                onClick={handleAddData}
                            >
                                <Plus size={20} /> Add Data
                            </button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Tables results={data} keysArray={keysArray} setState={setState} />
                    </div>

                    <InsertDataModal
                        isOpen={isCreateTableModalOpen}
                        onClose={() => {
                            setIsCreateTableModalOpen(false);
                            setError(null);
                        }}
                        selectedDb={dbName}
                        tableName={tableName} 
                        length={length}
                        handleLength={handleLength}
                        keys={keys}
                        setState={setState}
                    />
                    <UpdateDataModal
                        isOpen={isUpdateTableModalOpen}
                        onClose={() => setIsUpdateTableModalOpen(false)}
                        selectedDb={dbName}
                        tableName={tableName}
                        length={length}
                        handleLength={handleLength}
                        keys={keys}
                        rowId={rowId}
                        rowData={rowData}
                        setState={setState}
                    />

                </div>
            )}
        </div>
    );
}
