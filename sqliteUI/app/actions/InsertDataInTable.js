'use server';

const insertDataInTable = async (dbName, tableName, data) => {
    console.log("inset data action ", data);
    const keys = Object.keys(data);
    const inputValues = Object.values(data);
    try {
        const response = await fetch(`http://localhost:8000/api/database/${dbName}/tables/${tableName}/add/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({keys: keys, inputValues: inputValues})
        });
 
        if (!response.ok) {
        throw new Error(`Error inserting in table: ${response.statusText}`);
        }
        const result = await response.json();

        return { id: result.id, success: result.success };
    } catch (error) {
        console.error('Error inserting in table:', error);
        return { success: false, error: error.message };
    }
};


export default insertDataInTable;