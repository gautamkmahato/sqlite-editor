import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import createTable from '@/app/actions/createTable';

const CreateTableModal = ({ isOpen, onClose, selectedDb, keysArray }) => {
  console.log(keysArray)
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState(keysArray || [
    { name: '', type: 'TEXT', isPrimaryKey: false, isNotNull: false }
  ]);

  const sqliteTypes = [
    'TEXT',
    'INTEGER',
    'REAL',
    'NUMERIC',
    'BLOB',
    'VARCHAR',
    'BOOLEAN',
    'DATE',
    'DATETIME'
  ];

  const addColumn = () => {
    setColumns([
      ...columns,
      { name: '', type: 'TEXT', isPrimaryKey: false, isNotNull: false }
    ]);
  };

  const removeColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const updateColumn = (index, field, value) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    setColumns(newColumns);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    const result = await createTable(selectedDb, tableName, columns);
    console.log({ tableName, columns });
    setTableName('');
    setColumns([
      { name: '', type: 'TEXT', isPrimaryKey: false, isNotNull: false }
    ]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create New Table</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Table Name
            </label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter table name"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium">Columns</label>
              <button
                type="button"
                onClick={addColumn}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Column</span>
              </button>
            </div>

            <div className="space-y-4">
              {columns.map((column, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={column.name}
                      onChange={(e) => updateColumn(index, 'name', e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Column name"
                      required
                    />
                  </div>

                  <div className="w-40">
                    <select
                      value={column.type}
                      onChange={(e) => updateColumn(index, 'type', e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {sqliteTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-32">
                    <select
                      value={column.isPrimaryKey.toString()}
                      onChange={(e) => updateColumn(index, 'isPrimaryKey', e.target.value === 'true')}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="false">Not PK</option>
                      <option value="true">Primary Key</option>
                    </select>
                  </div>

                  <div className="w-32">
                    <select
                      value={column.isNotNull.toString()}
                      onChange={(e) => updateColumn(index, 'isNotNull', e.target.value === 'true')}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="false">Nullable</option>
                      <option value="true">Not Null</option>
                    </select>
                  </div>

                  {columns.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeColumn(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Create Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTableModal;