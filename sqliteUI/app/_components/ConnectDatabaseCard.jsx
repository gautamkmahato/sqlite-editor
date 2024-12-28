'use client';

import { Database, FileEdit } from 'lucide-react';

const ConnectDatabaseCard = ({ handleOpenModal }) => {
    const handleButtonClick = () =>{
        handleOpenModal(true)
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
                <Database className="h-12 w-12 text-red-500" />
                <h1 className="text-2xl font-semibold text-gray-800">Database Manager</h1>
                <p className="text-sm text-gray-600">No selected database</p>
                <button
                    className="flex gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                    onClick={() => handleButtonClick()}
                >
                    <span className='py-1'><FileEdit size={14} /></span>
                    <span>Connect Databases</span>
                </button>
            </div>
        </div>
        </div>
    );
};

export default ConnectDatabaseCard;
