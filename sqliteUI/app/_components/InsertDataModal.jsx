'use client';

import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import insertDataInTable from '../actions/InsertDataInTable';

export default function InsertDataModal({ isOpen, onClose, selectedDb, tableName, length, handleLength, keys, setState }) {
    const [formState, setFormState] = useState({});

    // Reinitialize formState whenever keys change
    useEffect(() => {
        if (keys.length > 0) {
            setFormState(
                keys.reduce((acc, key) => {
                    acc[key] = '';
                    return acc;
                }, {})
            );
        }
    }, [keys]);

    const handleChange = (key, value) => {
        setFormState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        const result = await insertDataInTable(selectedDb, tableName, formState);
        console.log('Insert Result:', result);

        if (result.success) {
            setFormState(
                keys.reduce((acc, key) => {
                    acc[key] = '';
                    return acc;
                }, {})
            );
            handleLength(length+1);
            onClose();
            setState(false, result.id)
        } else {
            console.error(result.error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Insert Data</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {keys.map(key => (
                    <div key={key} className="mb-4">
                        <label className="block font-bold">{key}</label>
                        {key === 'content' ? (
                            <textarea
                                value={formState[key]}
                                onChange={e => handleChange(key, e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder={`Enter ${key}`}
                            />
                        ) : key === 'date' ? (
                            <input
                                type="date"
                                value={formState[key]}
                                onChange={e => handleChange(key, e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        ) : (
                            <input
                                type="text"
                                value={formState[key]}
                                onChange={e => handleChange(key, e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder={`Enter ${key}`}
                            />
                        )}
                    </div>
                ))}
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
